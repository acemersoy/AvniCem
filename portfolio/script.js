/* ============================================================
   Avni Cem Ersoy — Portfolio interactions
   ============================================================ */
(() => {
  'use strict';
  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;

  /* ---------- BOOT SEQUENCE ---------- */
  const bootLines = [
    "<span class='c'>$</span> ./init avnicem.dev",
    "booting kernel ........... <span class='ok'>ok</span>",
    "mounting /backend ........ <span class='ok'>ok</span>",
    "loading .NET runtime ..... <span class='ok'>ok</span>",
    "connecting postgres ...... <span class='ok'>ok</span>",
    "auth · clean-arch · api .. <span class='ok'>ok</span>",
    "<span class='hl'>welcome — avni cem ersoy</span>",
  ];
  function runBoot() {
    const boot = $('#boot'); const log = $('#bootLog');
    if (reduce) { boot.classList.add('done'); start(); return; }
    let i = 0;
    const tick = () => {
      if (i < bootLines.length) {
        log.innerHTML += bootLines[i] + "\n";
        i++;
        setTimeout(tick, 130 + Math.random() * 90);
      } else {
        setTimeout(() => { boot.classList.add('done'); start(); }, 420);
      }
    };
    tick();
  }

  /* ---------- CUSTOM CURSOR ---------- */
  function initCursor() {
    if (isTouch) return;
    const dot = $('.cursor-dot'), ring = $('.cursor-ring');
    let mx = innerWidth/2, my = innerHeight/2, rx = mx, ry = my;
    addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    });
    const loop = () => {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    addEventListener('mousedown', () => ring.classList.add('down'));
    addEventListener('mouseup',   () => ring.classList.remove('down'));
    const bind = () => $$('[data-cursor], a, button, input').forEach(el => {
      if (el.dataset.cbound) return; el.dataset.cbound = '1';
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });
    bind(); window.__rebindCursor = bind;
  }

  /* ---------- MAGNETIC BUTTONS ---------- */
  function initMagnetic() {
    if (isTouch || reduce) return;
    $$('[data-magnetic]').forEach(el => {
      const strength = 0.32;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2;
        const y = e.clientY - r.top - r.height/2;
        el.style.transform = `translate(${x*strength}px, ${y*strength}px)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- 3D TILT ---------- */
  function initTilt() {
    if (isTouch || reduce) return;
    $$('[data-tilt]').forEach(el => {
      const max = 6;
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - .5;
        const py = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(900px) rotateY(${px*max}deg) rotateX(${-py*max}deg) translateZ(0)`;
      });
      el.addEventListener('mouseleave', () => { el.style.transform = ''; });
    });
  }

  /* ---------- HERO TERMINAL TYPING ---------- */
  function initHeroTerm() {
    const el = $('#heroTerm'); if (!el) return;
    const html =
      "<span class='p'>$</span> whoami\n" +
      "<span class='v'>avni cem ersoy</span>\n\n" +
      "<span class='p'>$</span> cat profile.json\n" +
      "{\n" +
      "  <span class='k'>\"role\"</span>: <span class='v'>\"junior software dev\"</span>,\n" +
      "  <span class='k'>\"focus\"</span>: <span class='v'>\"backend · api · db\"</span>,\n" +
      "  <span class='k'>\"stack\"</span>: <span class='v'>[\"C#\",\".NET\",\"SQL\"]</span>,\n" +
      "  <span class='k'>\"status\"</span>: <span class='v'>\"open to work\"</span>\n" +
      "}\n" +
      "<span class='c'>// ↓ scroll to explore</span>";
    if (reduce) { el.innerHTML = html; return; }
    // type by visible chars while preserving tags
    typeHTML(el, html, 11);
  }

  function typeHTML(el, html, speed) {
    let i = 0;
    const step = () => {
      if (i > html.length) return;
      // avoid cutting inside a tag
      let slice = html.slice(0, i);
      const open = slice.lastIndexOf('<'), close = slice.lastIndexOf('>');
      if (open > close) slice = html.slice(0, open);
      el.innerHTML = slice + "<span class='p'>▋</span>";
      i++;
      setTimeout(step, speed);
    };
    step();
  }

  /* ---------- SKILLS ---------- */
  const SKILLS = [
    { n: 'C#',          c: 'lang',    cat: 'dil',      lvl: 88, t: 'İleri' },
    { n: 'JavaScript',  c: 'lang',    cat: 'dil',      lvl: 78, t: 'İyi' },
    { n: 'Kotlin',      c: 'lang',    cat: 'dil',      lvl: 70, t: 'İyi' },
    { n: 'Python',      c: 'lang',    cat: 'dil',      lvl: 72, t: 'İyi' },
    { n: 'TypeScript',  c: 'lang',    cat: 'dil',      lvl: 68, t: 'İyi' },
    { n: 'SQL',         c: 'lang',    cat: 'dil',      lvl: 82, t: 'İleri' },
    { n: '.NET / Core', c: 'backend', cat: 'backend',  lvl: 85, t: 'İleri' },
    { n: 'ASP.NET Web API', c: 'backend', cat: 'backend', lvl: 80, t: 'İleri' },
    { n: 'RESTful API', c: 'backend', cat: 'backend',  lvl: 82, t: 'İleri' },
    { n: 'Clean Architecture', c: 'backend', cat: 'backend', lvl: 72, t: 'İyi' },
    { n: 'HTML5 / CSS3', c: 'frontend', cat: 'frontend', lvl: 80, t: 'İleri' },
    { n: 'Next.js',     c: 'frontend', cat: 'frontend', lvl: 70, t: 'İyi' },
    { n: 'Bootstrap / jQuery', c: 'frontend', cat: 'frontend', lvl: 74, t: 'İyi' },
    { n: 'SQL Server',  c: 'db',      cat: 'veritabanı', lvl: 84, t: 'İleri' },
    { n: 'PostgreSQL',  c: 'db',      cat: 'veritabanı', lvl: 78, t: 'İyi' },
    { n: 'MongoDB',     c: 'db',      cat: 'veritabanı', lvl: 62, t: 'Orta' },
    { n: 'Git / GitHub', c: 'tools',  cat: 'araç',     lvl: 85, t: 'İleri' },
    { n: 'Docker',      c: 'tools',   cat: 'araç',     lvl: 60, t: 'Orta' },
    { n: 'Jira',        c: 'tools',   cat: 'araç',     lvl: 75, t: 'İyi' },
    { n: 'Postman',     c: 'tools',   cat: 'araç',     lvl: 82, t: 'İleri' },
  ];
  function buildSkills() {
    const grid = $('#skillGrid'); if (!grid) return;
    grid.innerHTML = SKILLS.map(s => `
      <div class="skill-card" data-c="${s.c}">
        <div class="skill-head">
          <span class="skill-name">${s.n}</span>
          <span class="skill-cat">${s.cat}</span>
        </div>
        <div class="skill-bar"><i data-w="${s.lvl}"></i></div>
        <span class="skill-lvl">${s.t} · ${s.lvl}%</span>
      </div>`).join('');

    $('#skillFilters').addEventListener('click', e => {
      const btn = e.target.closest('.chip'); if (!btn) return;
      $$('.chip').forEach(c => c.classList.remove('is-active'));
      btn.classList.add('is-active');
      const f = btn.dataset.filter;
      $$('.skill-card', grid).forEach(card => {
        const show = f === 'all' || card.dataset.c === f;
        card.classList.toggle('hidden', !show);
        if (show) { const bar = $('i', card); bar.style.width = bar.dataset.w + '%'; }
      });
    });
  }

  /* ---------- REVEAL + bars + counters ---------- */
  function initObservers() {
    const io = new IntersectionObserver((ents) => {
      ents.forEach(en => {
        if (!en.isIntersecting) return;
        en.target.classList.add('in');
        // animate skill bars within
        $$('.skill-bar i', en.target).forEach(b => b.style.width = b.dataset.w + '%');
        if (en.target.classList.contains('skills')) {
          $$('.skill-bar i').forEach(b => b.style.width = b.dataset.w + '%');
        }
        io.unobserve(en.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(el => io.observe(el));
    // also trigger skill bars when section visible
    const sk = $('.skills');
    if (sk) new IntersectionObserver((e, o) => {
      if (e[0].isIntersecting) { $$('.skill-bar i').forEach(b => b.style.width = b.dataset.w + '%'); o.disconnect(); }
    }, { threshold: 0.2 }).observe(sk);

    // counters
    $$('.stat').forEach(stat => {
      new IntersectionObserver((e, o) => {
        if (!e[0].isIntersecting) return; o.disconnect();
        const target = +stat.dataset.count, raw = stat.dataset.raw === 'true';
        const suffix = stat.dataset.suffix || '';
        const numEl = $('.stat-num', stat);
        if (reduce) { numEl.textContent = target + suffix; return; }
        const dur = 1300; const t0 = performance.now();
        const run = (t) => {
          const p = Math.min((t - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          const val = Math.round(eased * target);
          numEl.textContent = (raw ? val : val) + (p === 1 ? suffix : '');
          if (p < 1) requestAnimationFrame(run);
        };
        requestAnimationFrame(run);
      }, { threshold: 0.5 }).observe(stat);
    });
  }

  /* ---------- NAV / scroll progress / active ---------- */
  function initScroll() {
    const nav = $('#nav'), prog = $('#scrollProgress');
    const links = $$('.nav-links a');
    const secs = links.map(a => $(a.getAttribute('href'))).filter(Boolean);
    const onScroll = () => {
      const y = scrollY;
      nav.classList.toggle('scrolled', y > 40);
      const h = document.documentElement.scrollHeight - innerHeight;
      prog.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
      let active = secs[0];
      secs.forEach(s => { if (s.offsetTop - 140 <= y) active = s; });
      links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + (active && active.id)));
    };
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    $('#toTop')?.addEventListener('click', () => scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' }));
  }

  /* ---------- MARQUEE hover accent ---------- */
  function initMarquee() {
    $$('.marquee-track span').forEach(s => {
      s.addEventListener('mouseenter', () => s.style.color = 'var(--acid)');
      s.addEventListener('mouseleave', () => s.style.color = '');
    });
  }

  /* ---------- CV download (generate text fallback) ---------- */
  function initCv() {
    const btn = $('#downloadCv'); if (!btn) return;
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const txt =
`AVNİ CEM ERSOY — Junior Software Developer
Tel: +90 545 694 05 00 · E-posta: a.cem.ersoy@hotmail.com

ÖZET
Backend geliştirme, web/mobil uygulamalar ve veritabanı odaklı sistemlerde
deneyimli Junior Software Developer. C#, .NET, SQL Server, PostgreSQL,
JavaScript, Kotlin. PTT Bilişim Teknolojileri'nde .NET staj deneyimi.

YETENEKLER
Diller: C#, JavaScript, Kotlin, SQL, Python, HTML5, CSS3
Backend: .NET, ASP.NET (Core) Web API, RESTful API
Frontend: HTML5, CSS3, JS, Bootstrap, jQuery, Next.js
Veritabanı: SQL Server, PostgreSQL, MongoDB
Araçlar: Git, GitHub, GitLab, Jira, Docker, Postman, Visual Studio

DENEYIM
PTT Bilişim Teknolojileri A.Ş. — Software Developer Intern (2025), Ankara
- Kurumsal .NET projeleri, backend servisleri, API uç noktaları
- SQL Server ile sorgulama, veri modelleme, veri doğrulama
- Hata düzeltme, özellik geliştirme, Jira & Git iş akışları

PROJELER
- Orient Wedding Platform (.NET Core, Next.js, PostgreSQL, TypeScript)
- Radio Atlas (Kotlin, Android SDK, MapLibre) — Google Play'de yayında
- Rhymos (C#, Unity)
- Film Öneri Sistemi (Python, Streamlit, scikit-learn, pandas)

EĞITIM
Ankara Yıldırım Beyazıt Üniversitesi — Bilgisayar Programcılığı (Ön Lisans), 2024–2026`;
      const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'AvniCemErsoy-CV.txt'; a.click();
      URL.revokeObjectURL(url);
    });
  }

  /* ============================================================
     LIVE TERMINAL
     ============================================================ */
  function initLiveTerm() {
    const term = $('#liveTerm'), out = $('#liveOut'), input = $('#liveInput'), body = $('#liveBody');
    if (!term) return;
    const history = []; let hIdx = -1;

    const print = (html, cls = '') => {
      const d = document.createElement('div');
      d.className = 'ln ' + cls; d.innerHTML = html; out.appendChild(d);
      body.scrollTop = body.scrollHeight;
    };
    const block = (html) => print(`<div class="block">${html}</div>`);

    const commands = {
      help() {
        block(
          `<span class="o-text">Kullanılabilir komutlar:</span>\n` +
          `  <span class="o-acid">whoami</span>     kim olduğumu göster\n` +
          `  <span class="o-acid">about</span>      kısa özgeçmiş\n` +
          `  <span class="o-acid">skills</span>     teknik yetenekler\n` +
          `  <span class="o-acid">projects</span>   projeleri listele\n` +
          `  <span class="o-acid">experience</span> iş deneyimi\n` +
          `  <span class="o-acid">contact</span>    iletişim bilgileri\n` +
          `  <span class="o-acid">social</span>     github / linkedin\n` +
          `  <span class="o-acid">cv</span>          özgeçmişi indir\n` +
          `  <span class="o-acid">sudo</span>        denemeden edemezsin :)\n` +
          `  <span class="o-acid">clear</span>      ekranı temizle`
        );
      },
      whoami() {
        block(`<span class="o-acid">avni cem ersoy</span> — junior software developer @ ankara, türkiye\n<span class="o-mut">backend · api tasarımı · temiz mimari · veritabanı · siber güvenlik</span>`);
      },
      about() {
        block(`<span class="o-text">Backend, web ve mobil uygulamalar ile veritabanı odaklı sistemlerde\nuygulamalı deneyime sahibim. PTT Bilişim'de .NET tabanlı kurumsal\nprojelerde staj yaptım. Sağlam altyapı kurmayı, karmaşayı sadeleştirmeyi\nve güvenliği baştan düşünmeyi severim.</span>`);
      },
      skills() {
        block(
          `<span class="o-cyan">diller</span>      C# · JavaScript · Kotlin · Python · SQL · TS\n` +
          `<span class="o-cyan">backend</span>     .NET · ASP.NET Core Web API · REST · Clean Arch\n` +
          `<span class="o-cyan">frontend</span>    HTML5 · CSS3 · Next.js · Bootstrap · jQuery\n` +
          `<span class="o-cyan">veritabanı</span>  SQL Server · PostgreSQL · MongoDB\n` +
          `<span class="o-cyan">araçlar</span>     Git · Docker · Jira · Postman · VS / VS Code`
        );
      },
      projects() {
        block(
          `<span class="o-acid">/01 Orient Wedding Platform</span>  <span class="o-mut">.NET Core · Next.js · PostgreSQL</span>\n` +
          `    Full-stack düğün mekânı yönetimi; rezervasyon & finans modülleri.\n\n` +
          `<span class="o-acid">/02 Radio Atlas</span>             <span class="o-mut">Kotlin · MapLibre</span>\n` +
          `    Harita tabanlı radyo keşfi. <span class="o-cyan">Google Play'de yayında.</span>\n\n` +
          `<span class="o-acid">/03 Rhymos</span>                  <span class="o-mut">C# · Unity</span>\n` +
          `    Zamanlama odaklı ritim oyunu prototipi.\n\n` +
          `<span class="o-acid">/04 Film Öneri Sistemi</span>      <span class="o-mut">Python · scikit-learn</span>\n` +
          `    ML tabanlı öneri + Streamlit arayüzü.`
        );
      },
      experience() {
        block(`<span class="o-acid">PTT Bilişim Teknolojileri A.Ş.</span> — Software Developer Intern <span class="o-mut">(2025)</span>\n  → kurumsal .NET projeleri, backend servisleri & API uç noktaları\n  → SQL Server ile veri modelleme ve doğrulama\n  → hata düzeltme, Jira & Git tabanlı iş akışları`);
      },
      contact() {
        block(`<span class="o-cyan">e-posta</span>  a.cem.ersoy@hotmail.com\n<span class="o-cyan">telefon</span>  +90 545 694 05 00\n<span class="o-mut">veya yukarıdaki "İletişime geç" düğmesini kullan.</span>`);
      },
      social() {
        block(`<span class="o-cyan">github</span>    github.com/avnicem\n<span class="o-cyan">linkedin</span>  linkedin.com/in/avnicem`);
      },
      cv() {
        $('#downloadCv')?.click();
        block(`<span class="o-acid">↓</span> özgeçmiş indiriliyor... <span class="o-mut">(AvniCemErsoy-CV.txt)</span>`);
      },
      sudo() {
        block(`<span class="o-err">guest is not in the sudoers file. Bu olay raporlanacak.</span> <span class="o-mut">😏</span>`);
      },
      ls() { block(`<span class="o-cyan">about.md  skills.json  projects/  experience.log  contact.vcf</span>`); },
      echo(args) { block(`<span class="o-text">${args.join(' ') || ''}</span>`); },
      date() { block(`<span class="o-mut">${new Date().toString()}</span>`); },
      clear() { out.innerHTML = ''; },
    };
    const aliases = { '?': 'help', 'man': 'help', 'cls': 'clear', 'info': 'about', 'me': 'whoami', 'proje': 'projects', 'projeler': 'projects', 'iletisim': 'contact', 'yetenekler': 'skills' };

    function exec(raw) {
      const line = raw.trim();
      print(`<span class="cmd-echo"><span class="p">guest@avnicem:~$</span> ${escapeHtml(raw)}</span>`);
      if (!line) return;
      history.unshift(raw); hIdx = -1;
      const [cmdRaw, ...args] = line.split(/\s+/);
      const cmd = aliases[cmdRaw.toLowerCase()] || cmdRaw.toLowerCase();
      if (commands[cmd]) commands[cmd](args);
      else block(`<span class="o-err">komut bulunamadı: ${escapeHtml(cmdRaw)}</span>\n<span class="o-mut">'help' yazarak kullanılabilir komutları gör.</span>`);
    }

    // welcome
    block(`<span class="o-mut">avnicem.dev terminaline hoş geldin. Yardım için </span><span class="o-acid">help</span><span class="o-mut"> yaz.</span>`);

    input.addEventListener('keydown', e => {
      if (e.key === 'Enter') { exec(input.value); input.value = ''; }
      else if (e.key === 'ArrowUp') { e.preventDefault(); if (hIdx < history.length - 1) { hIdx++; input.value = history[hIdx]; } }
      else if (e.key === 'ArrowDown') { e.preventDefault(); if (hIdx > 0) { hIdx--; input.value = history[hIdx]; } else { hIdx = -1; input.value = ''; } }
      else if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); commands.clear(); }
      else if (e.key === 'Tab') {
        e.preventDefault();
        const v = input.value.toLowerCase();
        const match = Object.keys(commands).find(c => c.startsWith(v) && v);
        if (match) input.value = match;
      }
    });
    term.addEventListener('click', () => input.focus());
    // focus when scrolled into view
    new IntersectionObserver((en) => { if (en[0].isIntersecting && !isTouch) input.focus({ preventScroll: true }); }, { threshold: 0.6 }).observe(term);
  }

  function escapeHtml(s) { return s.replace(/[&<>"]/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m])); }

  /* ---------- START ---------- */
  function start() {
    initHeroTerm();
    initLiveTerm();
  }
  function initStatic() {
    initCursor();
    initMagnetic();
    initTilt();
    buildSkills();
    initObservers();
    initScroll();
    initMarquee();
    initCv();
    window.__rebindCursor && window.__rebindCursor();
  }

  if (document.readyState === 'loading')
    document.addEventListener('DOMContentLoaded', () => { initStatic(); runBoot(); });
  else { initStatic(); runBoot(); }
})();
