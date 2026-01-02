if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("service-worker.js")
      .then((registration) => {
        console.log("Service Worker 注册成功: ", registration);
      })
      .catch((error) => {
        console.log("Service Worker 注册失败: ", error);
      });
  });
}

(function () {
  const CONFIG = {
    owner: "XiangwanGuan",
    repo: "Shadowrocket",
    path: "Release",
    cacheKey: "module_cache",
    cacheExpire: 60 * 60 * 1000,
  };

  const FUSION_MODULE_NAME = "融合模块";
  const SPECIAL_MODULE_PATH = `${CONFIG.path}/Module.sgmodule`;

  const state = {
    apps: new Map(),
    pendingInstall: null,
    renderedCards: new Map(),
  };

  const $ = (s) => document.querySelector(s);
  const bar = $("#bar");
  const statusEl = $("#status");
  const resultsEl = $("#results");
  const qEl = $("#q");
  const topBtn = $("#backToTop");

  const toast = (msg, ms = 5000) => {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(() => el.classList.remove("show"), ms);
  };

  const setStatus = (text, percent = 0) => {
    if (statusEl) statusEl.textContent = text;
    if (bar) bar.style.width = percent + "%";
  };

  const fetchGitHubJson = async (url) => {
    const r = await fetch(url, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!r.ok) throw new Error(r.status + ": " + (await r.text()));
    return r.json();
  };

  const parseHostnames = (txt, transform = (d) => d) => {
    const set = new Set();
    txt.split(/\r?\n/).forEach((line) => {
      if (!/^hostname\s*=/.test(line.trim())) return;
      const rhs = (line.split("=")[1] || "")
        .replace(/#.*/, "")
        .replace(/%APPEND%/g, "")
        .trim();
      rhs
        .split(/[,\s]+/)
        .filter(Boolean)
        .forEach((d) => set.add(transform(d)));
    });
    return set;
  };

  const extractHostnames = (txt) => parseHostnames(txt);
  const buildAntiKill = (txt) => {
    const set = parseHostnames(txt, (d) => d.replace(/^-/, ""));
    if (!set.size) return "";
    return `[MITM]\nhostname = %APPEND% ${[...set]
      .map((d) => `-${d}`)
      .join(",")}`;
  };

  const fuzzyMatch = (target, keyword) => {
    if (!keyword) return true;
    target = target.toLowerCase();
    keyword = keyword.toLowerCase();
    if (target.includes(keyword)) return true;
    let i = 0;
    for (const c of target) {
      if (c === keyword[i]) i++;
      if (i === keyword.length) return true;
    }
    return false;
  };

  const render = (query = "") => {
    const frag = document.createDocumentFragment();
    const newRendered = new Map();

    const entries = [...state.apps.entries()]
      .filter(([k]) => fuzzyMatch(k, query))
      .sort(([nameA], [nameB]) => {
        const isFusionA = nameA === FUSION_MODULE_NAME;
        const isFusionB = nameB === FUSION_MODULE_NAME;

        if (isFusionA && !isFusionB) {
          return -1;
        }
        if (!isFusionA && isFusionB) {
          return 1;
        }
        return nameA.localeCompare(nameB);
      });

    entries.forEach(([name, data]) => {
      let el = state.renderedCards.get(name);
      if (!el) {
        el = document.createElement("div");
        el.className = "card";
        el.dataset.app = name;

        const header = document.createElement("div");
        header.className = "header-row";
        header.innerHTML = `<h3>${name}</h3><span class="badge">解密域名：${data.domains.size}</span>`;

        const meta = document.createElement("div");
        meta.className = "meta";
        ["anti", "raw", "install"].forEach((act) => {
          if (act === "anti" && data.allowAnti === false) return;
          const btn = document.createElement("button");
          btn.className = "btn";
          btn.dataset.act = act;
          btn.textContent =
            act === "anti"
              ? "排除模块"
              : act === "raw"
              ? "原始模块"
              : act === "install"
              ? "安装模块"
              : "";
          meta.appendChild(btn);
        });

        const pre = document.createElement("pre");
        pre.className = "code";
        pre.textContent = [...data.domains].join("\n");

        el.appendChild(header);
        el.appendChild(meta);
        el.appendChild(pre);
      } else {
        el.querySelector(
          ".badge"
        ).textContent = `解密域名：${data.domains.size}`;
        el.querySelector(".code").textContent = [...data.domains].join("\n");
      }
      newRendered.set(name, el);
      frag.appendChild(el);
    });

    resultsEl.innerHTML = "";
    resultsEl.appendChild(frag);
    state.renderedCards = newRendered;
  };

  const saveCache = () => {
    localStorage.setItem(
      CONFIG.cacheKey,
      JSON.stringify({ ts: Date.now(), apps: [...state.apps.entries()] })
    );
  };

  const loadCache = () => {
    try {
      const data = JSON.parse(localStorage.getItem(CONFIG.cacheKey));
      if (!data || Date.now() - data.ts > CONFIG.cacheExpire) return false;
      state.apps = new Map(data.apps);
      render(qEl.value.trim());
      setStatus(`已从缓存加载：${state.apps.size}个应用`, 100);
      return true;
    } catch {
      return false;
    }
  };

  const loadModules = async () => {
    setStatus("正在准备数据", 0);
    const Modules = [];

    const specialModuleUrl = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${SPECIAL_MODULE_PATH}`;
    const subDirectoryUrl = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/contents/${CONFIG.path}/Modules`;

    try {
      const [specialModuleInfo, subDirList] = await Promise.all([
        fetchGitHubJson(specialModuleUrl).catch((e) => {
          console.warn("跳过融合模块:", e.message);
          return null;
        }),
        fetchGitHubJson(subDirectoryUrl).catch((e) => {
          console.warn("跳过模块目录:", e.message);
          return [];
        }),
      ]);

      if (specialModuleInfo && specialModuleInfo.type === "file") {
        Modules.push(specialModuleInfo);
      }

      subDirList.forEach((item) => {
        if (item.type === "file" && /\.sgmodule$/i.test(item.name)) {
          Modules.push(item);
        }
      });
    } catch (e) {
      throw new Error("加载模块列表失败: " + e.message);
    }

    let done = 0;
    const pathRegex = new RegExp(`^${CONFIG.path}/`);

    await Promise.all(
      Modules.map(async (f) => {
        const txt = await fetch(f.download_url).then((r) => r.text());

        const isFusionModule = f.path === SPECIAL_MODULE_PATH;

        const appName = isFusionModule
          ? FUSION_MODULE_NAME
          : f.name.replace(/\.sgmodule$/i, "");

        state.apps.set(appName, {
          raw: txt,
          fileName: f.name,
          relativePath: f.path.replace(pathRegex, ""),
          domains: extractHostnames(txt),
          rule: buildAntiKill(txt),
          allowAnti: !isFusionModule,
        });
        setStatus(
          `正在加载 ${++done}/${Modules.length}`,
          Math.round((done / Modules.length) * 100)
        );
      })
    );
    setStatus(`成功加载：${state.apps.size}个应用`, 100);
    render(qEl.value.trim());
    saveCache();
  };

  const debounce = (fn, t) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), t);
    };
  };

  const openModal = (selector) => {
    const m = $(selector);
    m.style.display = "flex";
    requestAnimationFrame(() => m.classList.add("show"));
  };

  const closeModal = (selector) => {
    const m = $(selector);
    m.classList.remove("show");
    setTimeout(() => (m.style.display = "none"), 200);
  };

  const initEvents = () => {
    qEl.addEventListener(
      "input",
      debounce((e) => render(e.target.value.trim()), 120)
    );

    resultsEl.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-act]");
      if (!btn) return;
      const card = e.target.closest(".card");
      const app = card.dataset.app;
      const data = state.apps.get(app);
      const act = btn.dataset.act;
      switch (act) {
        case "anti":
          if (!data.rule) return toast("无可复制内容");
          navigator.clipboard
            .writeText(
              `#!name=排除模块-${app}\n#!desc=请放置于模块列表下方\n` +
                data.rule
            )
            .catch(() => toast("复制失败"));
          toast("已复制内容，请自行新建模块！");
          break;
        case "raw":
          $("#modalBody").textContent = data.raw;
          openModal("#modal");
          break;
        case "install":
          state.pendingInstall = data;
          if (app === FUSION_MODULE_NAME) {
              toast("此模块包含所有功能，请勿重复安装！", 10000);
          }
          openModal("#confirmModal");
          break;
      }
    });

    $("#confirmOk").onclick = () => {
      if (state.pendingInstall) {
        const parts = state.pendingInstall.relativePath.split("/");
        const encodedPath = parts.map(encodeURIComponent).join("/");
        const url = `Redirect.html?url=${encodeURIComponent(`shadowrocket://install?module=https://xiangwanguan.github.io/Shadowrocket/Release/${encodedPath}`)}`;
        window.open(url, "_blank");
      }
      closeModal("#confirmModal");
    };
    $("#confirmClose").onclick = () => closeModal("#confirmModal");
    $("#confirmCancel").onclick = () => closeModal("#confirmModal");
    $("#modalClose").onclick = () => closeModal("#modal");
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeModal("#modal");
        closeModal("#confirmModal");
      }
    });

    let ticking = false;
    window.addEventListener("scroll", () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          topBtn.classList.toggle("visible", window.scrollY > 200);
          ticking = false;
        });
        ticking = true;
      }
    });
    topBtn.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });

    $("#reload").onclick = () => {
      state.apps.clear();
      loadModules().catch((e) => {
        setStatus("失败", 100);
        toast("模块加载失败: " + e.message, 5000);
      });
    };
  };

  const main = () => {
    initEvents();
    qEl.focus({ preventScroll: true });
    if (!loadCache()) {
      loadModules().catch((e) => {
        setStatus("失败", 100);
        toast("模块加载失败: " + e.message, 5000);
      });
    }
  };

  main();
})();
