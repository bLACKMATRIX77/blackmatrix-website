/**
 * BLΛCKMΛTRIX 2026 - High-Performance Interactive Engine
 * Fully optimized for 144 FPS smooth scrolling and instant tactile feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Dynamic Navigation & Scroll Spy
  initNavigation();

  // Initialize Canvas Background (High-Performance mode)
  initCyberCanvas();

  // Initialize Filter Tabs & Category Switchers
  initProductFilters();

  // Initialize Product Modals
  initProductModals();

  // Initialize FAQ Accordions
  initFaqAccordion();

  // Initialize Tactile Button Ripples
  initTactileFeedback();
});

/* ==========================================================================
   0. Navigation Active Link & Dynamic Scroll Spy
   ========================================================================== */
function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionIds = ['hero', 'products', 'status', 'pricing', 'faq'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
  const brandWrapper = document.querySelector('.brand-wrapper');

  let isManualClick = false;
  let clickTimeout = null;

  function setActiveLink(targetId) {
    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      if (href.endsWith(`#${targetId}`)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Smooth scroll helper with exact header offset
  function scrollToSection(targetId) {
    const sec = document.getElementById(targetId);
    if (!sec) return;

    setActiveLink(targetId);
    isManualClick = true;

    const headerOffset = 76;
    const elementPosition = sec.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    if (history.pushState) {
      history.pushState(null, null, `#${targetId}`);
    }

    clearTimeout(clickTimeout);
    clickTimeout = setTimeout(() => {
      isManualClick = false;
      setActiveLink(targetId);
    }, 800);
  }

  // Click handler on navigation links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        scrollToSection(targetId);
      }
    });
  });

  // Mobile Hamburger Navigation Toggle & Auto-Close
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');
  const mobileMenuBackdrop = document.getElementById('mobile-menu-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileNavMenu) {
    function toggleMobileMenu(open) {
      const shouldOpen = open !== undefined ? open : !mobileNavMenu.classList.contains('active');
      mobileNavMenu.classList.toggle('active', shouldOpen);
      mobileMenuBtn.classList.toggle('active', shouldOpen);
      if (mobileMenuBackdrop) {
        mobileMenuBackdrop.classList.toggle('active', shouldOpen);
      }
    }

    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMobileMenu();
    });

    if (mobileMenuBackdrop) {
      mobileMenuBackdrop.addEventListener('click', () => {
        toggleMobileMenu(false);
      });
    }

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const targetId = href.substring(1);
          toggleMobileMenu(false);
          scrollToSection(targetId);
        } else {
          toggleMobileMenu(false);
        }
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (mobileNavMenu.classList.contains('active') && !mobileNavMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        toggleMobileMenu(false);
      }
    });
  }

  // Dynamic Scroll Spy using getBoundingClientRect
  function onScroll() {
    if (isManualClick) return;

    // Bottom of page check: activate last link (FAQ)
    if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 50)) {
      setActiveLink('faq');
      return;
    }

    const headerThreshold = 140;
    let currentId = 'hero';

    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      const rect = sec.getBoundingClientRect();
      if (rect.top <= headerThreshold) {
        currentId = sec.id;
      }
    }

    setActiveLink(currentId);
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // Initial check on load
  if (window.location.hash) {
    const hashId = window.location.hash.substring(1);
    if (sectionIds.includes(hashId)) {
      setTimeout(() => {
        scrollToSection(hashId);
      }, 100);
    } else {
      onScroll();
    }
  } else {
    onScroll();
  }
}

/* ==========================================================================
   1. Tactile Button Ripples
   ========================================================================== */
function initTactileFeedback() {
  const clickableButtons = document.querySelectorAll('.tactile-btn, .category-hero-btn, .btn-view-product, .filter-pill, .nav-link, .faq-question, .status-purchase-btn');

  clickableButtons.forEach(el => {
    el.addEventListener('click', (e) => {
      // Create ripple effect on button click
      if (el.classList.contains('tactile-btn') || el.classList.contains('btn-view-product') || el.classList.contains('category-hero-btn') || el.classList.contains('status-purchase-btn')) {
        const rect = el.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-wave');
        
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size / 2}px`;
        ripple.style.top = `${e.clientY - rect.top - size / 2}px`;

        el.appendChild(ripple);
        setTimeout(() => {
          ripple.remove();
        }, 550);
      }
    });
  });
}

/* ==========================================================================
   2. Background Cyber Particles Canvas (Optimized: Batched Paths)
   ========================================================================== */
function initCyberCanvas() {
  const canvas = document.getElementById('cyber-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d', { alpha: true });

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, 150);
  });

  const particles = [];
  const count = width > 768 ? 24 : 14;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.8,
      color: Math.random() > 0.5 ? 'rgba(0, 242, 254, 0.6)' : 'rgba(168, 85, 247, 0.6)'
    });
  }

  let isPageVisible = true;
  document.addEventListener('visibilitychange', () => {
    isPageVisible = !document.hidden;
  });

  let lastFrameTime = 0;
  function draw(currentTime) {
    requestAnimationFrame(draw);

    if (!isPageVisible) return;
    if (currentTime - lastFrameTime < 28) return;
    lastFrameTime = currentTime;

    ctx.clearRect(0, 0, width, height);

    ctx.beginPath();
    ctx.strokeStyle = 'rgba(168, 85, 247, 0.12)';
    ctx.lineWidth = 0.7;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        if (Math.abs(dx) > 110 || Math.abs(dy) > 110) continue;
        const distSq = dx * dx + dy * dy;

        if (distSq < 12100) {
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
        }
      }
    }
    ctx.stroke();

    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    }
  }

  requestAnimationFrame(draw);
}

/* ==========================================================================
   3. Live Latency Graph (Event-Driven: Redraws ONLY when data updates)
   ========================================================================== */
function initLatencyGraph() {
  const canvas = document.getElementById('latency-graph-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const pingValElem = document.getElementById('live-ping-val');

  let width = canvas.width = canvas.parentElement.clientWidth || 600;
  let height = canvas.height = 80;

  window.addEventListener('resize', () => {
    width = canvas.width = canvas.parentElement.clientWidth || 600;
    renderGraph();
  });

  const points = [];
  const maxPoints = 25;
  for (let i = 0; i < maxPoints; i++) {
    points.push(22 + Math.random() * 5);
  }

  function renderGraph() {
    ctx.clearRect(0, 0, width, height);

    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, 'rgba(0, 242, 254, 0.25)');
    grad.addColorStop(1, 'rgba(0, 242, 254, 0.0)');

    ctx.beginPath();
    const step = width / (maxPoints - 1);
    
    ctx.moveTo(0, height - (points[0] / 50) * height);
    for (let i = 1; i < points.length; i++) {
      const x = i * step;
      const y = height - (points[i] / 50) * height;
      ctx.lineTo(x, y);
    }

    ctx.strokeStyle = '#00f2fe';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
  }

  function updatePoints() {
    points.shift();
    const last = points[points.length - 1];
    let next = last + (Math.random() - 0.5) * 3;
    if (next < 19) next = 20;
    if (next > 30) next = 28;
    points.push(next);

    if (pingValElem) {
      pingValElem.textContent = `${Math.round(next)} ms`;
    }

    renderGraph();
  }

  renderGraph();
  setInterval(updatePoints, 1500);
}

/* ==========================================================================
   4. Product Filters & Category Selection
   ========================================================================== */
function initProductFilters() {
  const heroCheatsBtn = document.getElementById('hero-btn-cheats');
  const heroBotsBtn = document.getElementById('hero-btn-bots');
  const heroToolsBtn = document.getElementById('hero-btn-tools');
  const filterPills = document.querySelectorAll('.filter-pill');
  const productCards = document.querySelectorAll('.product-card');

  function applyFilter(category) {
    filterPills.forEach(p => {
      if (p.dataset.filter === category) {
        p.classList.add('active');
      } else {
        p.classList.remove('active');
      }
    });

    if (category === 'cheat') {
      if (heroCheatsBtn) heroCheatsBtn.classList.add('active');
      if (heroBotsBtn) heroBotsBtn.classList.remove('active');
      if (heroToolsBtn) heroToolsBtn.classList.remove('active');
    } else if (category === 'bot') {
      if (heroBotsBtn) heroBotsBtn.classList.add('active');
      if (heroCheatsBtn) heroCheatsBtn.classList.remove('active');
      if (heroToolsBtn) heroToolsBtn.classList.remove('active');
    } else if (category === 'tool') {
      if (heroToolsBtn) heroToolsBtn.classList.add('active');
      if (heroCheatsBtn) heroCheatsBtn.classList.remove('active');
      if (heroBotsBtn) heroBotsBtn.classList.remove('active');
    } else {
      if (heroCheatsBtn) heroCheatsBtn.classList.remove('active');
      if (heroBotsBtn) heroBotsBtn.classList.remove('active');
      if (heroToolsBtn) heroToolsBtn.classList.remove('active');
    }

    productCards.forEach(card => {
      const cardType = card.dataset.type;
      const cardStatus = card.dataset.status;

      let show = false;
      if (category === 'all') {
        show = true;
      } else if (category === 'cheat' && cardType === 'cheat') {
        show = true;
      } else if (category === 'bot' && cardType === 'bot') {
        show = true;
      } else if (category === 'ready' && cardStatus === 'ready') {
        show = true;
      } else if (category === 'tool' && cardType === 'tool') {
        show = true;
      } else if (category === 'progress' && cardStatus === 'progress') {
        show = true;
      }

      if (show) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (heroCheatsBtn) {
    heroCheatsBtn.addEventListener('click', () => {
      applyFilter('cheat');
    });
  }

  if (heroBotsBtn) {
    heroBotsBtn.addEventListener('click', () => {
      applyFilter('bot');
    });
  }

  if (heroToolsBtn) {
    heroToolsBtn.addEventListener('click', () => {
      applyFilter('tool');
    });
  }

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      applyFilter(pill.dataset.filter);
    });
  });
}

/* ==========================================================================
   5. Product Detail Modal
   ========================================================================== */
const PRODUCTS_DATA = {
  'cs2': {
    title: 'Counter-Strike 2',
    category: 'Game Cheat',
    type: 'cheat',
    status: '🟢 Available',
    statusClass: 'status-ready',
    logo: './logos/cs2_logo.png',
    price: '10€ / Month',
    tags: ['VAC BYPASS', 'EXTERNAL', 'HWID SPOOFER'],
    desc: 'High-performance external software engineered specifically for Counter-Strike 2. Dominate Premier and Competitive matchmaking with humanized curve aimbotting, dynamic skeletal ESP, intelligent Recoil Control (RCS), and millisecond triggerbot — operating with complete external process isolation for total VAC Live evasion.',
    features: [
      '🎯 Humanized Aimbot with FOV, Smoothing & Aim Prediction',
      '⚡ Precision Triggerbot with Millisecond Delay & Cooldown',
      '🎯 Independent 2-Axis Recoil Control System (RCS X/Y)',
      '👁️ Full/Corner Box, Skeleton, Snaplines & Health ESP',
      '💣 Planted Bomb World ESP, Live Bomb & Defuse Timers',
      '📡 2D Radar, Auto Bunnyhop, Anti-Flashbang & Config Manager'
    ]
  },
  'the_isle': {
    title: 'The Isle Evrima',
    category: 'Game Cheat',
    type: 'cheat',
    status: '⚙️ Work in Progress',
    statusClass: 'status-progress',
    logo: './logos/the_isle_logo.png',
    price: '10€ / Month',
    tags: ['EAC BYPASS', 'EXTERNAL'],
    desc: 'Cutting-edge external software for The Isle Evrima with complete Easy Anti-Cheat bypass. Ideal for prolonged survival, growth rate tracking, and early predator detection.',
    features: [
      '🦖 Dinosaur ESP (Species, Growth Stage, HP & Stamina)',
      '🌿 Food & Water Source Radar with Distance Calc',
      '🏃 Speedhack & Infinite Stamina Safe Simulation',
      '🌙 Full Night Vision Enhancement (Clear Night)',
      '🛡️ EAC-Protected Memory Scanner',
      '🎯 Aimbot with Anatomical Hitbox Focusing'
    ]
  },
  'hayday_aio': {
    title: 'HayDay All-in-One Bot ⭐',
    category: 'Mobile Automation Bot',
    type: 'bot',
    status: '🟢 Available',
    statusClass: 'status-ready',
    logo: './logos/hayday_chicken_logo.png',
    price: '0€ Trial • 15€ / Month',
    tags: ['ADB', 'EMULATOR', 'FREE TRIAL'],
    desc: 'The flagship mobile automation bot! Runs 24/7 autonomously via an advanced ADB bridge interface. Harvests crops, operates manufacturing machines, sells items in the roadside shop, and tends to livestock.',
    features: [
      '🌾 Autonomous Wheat & Corn Cycle with Silo Overflow Guard',
      '🏭 Production Queue Management & Automated Restocking',
      '💰 Intelligent Roadside Shop Auto-Selling at Maximum Price',
      '🐔 Animal Feeding & Automatic Collection of Eggs, Milk & Bacon',
      '🛡️ Anti-Detection Heuristics (Humanized Touch Gestures)',
      '🖥️ Multi-Account & Multi-Emulator Support'
    ]
  },
  'hayday_harvest': {
    title: 'HayDay Only Harvest Bot',
    category: 'Mobile Automation Bot',
    type: 'bot',
    status: '🟢 Available',
    statusClass: 'status-ready',
    logo: './logos/hayday_chicken_logo.png',
    price: '0€ Trial • 10€ / Month',
    tags: ['ADB', 'EMULATOR', 'FREE TRIAL'],
    desc: 'The lean, ultra-fast solution engineered for maximum EXP yield and wheat profit. Optimized for minimal system resource usage and uninterrupted 24/7 continuous operation.',
    features: [
      '⚡ Ultra-Fast Harvesting & Direct Re-seeding (Wheat / Carrots)',
      '📦 Automatic Silo Emptying upon Full Storage Capacity',
      '📊 Live EXP & Tool Drop Counter (Nails, Screws, Planks)',
      '⏱️ Configurable Human Pause Intervals',
      '🔄 Auto-Reconnect on Network Drops',
      '💡 Ultra-Low CPU Footprint (under 1% Utilization)'
    ]
  },
  'coc_bot': {
    title: 'Clash of Clans Bot',
    category: 'Mobile Automation Bot',
    type: 'bot',
    status: '📅 Planned',
    statusClass: 'status-planned',
    logo: './logos/clash_of_clans_barbarian.jpg',
    price: '0€ Trial • 10€ / Month',
    tags: ['ADB', 'EMULATOR', 'FREE TRIAL'],
    desc: 'Autonomous farming bot for Clash of Clans. Scans for inactive dead bases with full collector pools, deploys troops strategically, and automatically upgrades walls and structures.',
    features: [
      '⚔️ Dead Base Finder (Filter by Minimum Gold & Elixir thresholds)',
      '🎯 Smart Troop Deployment Patterns (Barch, Goblins, Sneaky Goblins)',
      '🧱 Automatic Wall Upgrading upon Resource Cap',
      '🛡️ Trophy Management & Automated Drop Farming',
      '🛡️ Supercell Safe Protocol with Randomized Micro-Delays',
      '📱 Full Emulator Integration (BlueStacks, LDPlayer, MuMu)'
    ]
  },
  'fortnite': {
    title: 'Fartnite',
    category: 'Game Cheat',
    type: 'cheat',
    status: '📅 Planned',
    statusClass: 'status-planned',
    logo: './logos/fortnite_logo.png',
    price: '10€ / Month',
    tags: ['EAC BYPASS', 'EXTERNAL', 'HWID SPOOFER'],
    desc: 'High-security software for Fartnite featuring adaptive projectile trajectory calculations, weapon drop overlays, and a 360-degree threat radar.',
    features: [
      '🎯 Vector Aimbot with Bullet Drop & Velocity Compensation',
      '📦 Player Box, Skeleton, Shield & Weapon ESP',
      '💎 Loot Glow ESP with Tier Filtering (Legendary / Mythic)',
      '🛡️ Dual EAC / BattlEye Kernel-Driver Shield',
      '🎥 Dynamic Visual Rendering Engine',
      '⚙️ Profile Manager for Tournament & Casual Play'
    ]
  },
  'battlefield6': {
    title: 'Battlefield 6',
    category: 'Game Cheat',
    type: 'cheat',
    status: '📅 Planned',
    statusClass: 'status-planned',
    logo: './logos/battlefield6_logo.png',
    price: '10€ / Month',
    tags: ['EAC BYPASS', 'EXTERNAL', 'HWID SPOOFER'],
    desc: 'Specially engineered for next-gen Battlefield warfare. Dominate vast battlegrounds with vehicle radar, adaptive recoil suppression, and long-range ballistic sniper prediction.',
    features: [
      '✈️ Vehicle & Helicopter ESP with Critical Hitbox Highlighting',
      '🎯 Target Lock Aimbot with Distance Prioritization',
      '💥 Dynamic No-Recoil & Spread Suppression Algorithm',
      '🌐 360° Wide-Area Threat Radar for Squad Reconnaissance',
      '🛡️ Hardware ID Spoofer Integration',
      '⚡ 0% Frame-Drop Guarantee'
    ]
  },
  'crypto_bot': {
    title: 'Crypto Trading Bot',
    category: 'Algorithmic Financial Bot',
    type: 'bot',
    status: '⚙️ Work in Progress',
    statusClass: 'status-progress',
    logo: './logos/trading_bot_logo.svg',
    price: 'VIP / Custom',
    tags: ['HIGH-FREQUENCY', 'API KEY ENCRYPTED', 'GRID STRATEGY'],
    desc: 'Professional algorithmic trading bot for cryptocurrency exchanges (Binance, Bybit). Employs quantitative technical indicators, grid trading, and AI-driven stop-loss capital protection.',
    features: [
      '📈 Automated Grid & DCA Trading for Spot and Futures',
      '🔒 Client-Side Encrypted API Key Storage (Zero Server Risk)',
      '🛑 Dynamic Trailing Stop-Loss & Multi-Tier Take-Profit',
      '📱 Telegram Notifications on Executed Orders',
      '⚡ Ultra-Low Latency Webhook Bridge for TradingView',
      '📊 Integrated Profit & Loss Analytics Dashboard'
    ]
  },
  'pokemon_go': {
    title: 'Pokémon GO Utility',
    category: 'Mobile Location Tool',
    type: 'bot',
    status: '⚙️ In Evaluation',
    statusClass: 'status-progress',
    logo: './logos/pokemon_go_logo.png',
    price: 'Coming Soon',
    tags: ['GPS SPOOF', 'IOS', 'ANDROID'],
    desc: 'Intelligent spoofing and catching utility for Pokémon GO. Simulates realistic pedestrian walking speeds along GPX routes and automates PokéStop spins and fast-catching.',
    features: [
      '🚶 Realistic GPX Route Walking with Elevation Profiles',
      '⚡ Fast-Catch Mechanism & Auto-Spin for PokéStops',
      '⭐ 100% IV Sniper & Shiny Encounter Notifications',
      '⏱️ Automated Cooldown Timer Protection against Softbans',
      '🎒 Automatic Inventory & Pokémon Transfer Management',
      '📱 Rooted & Non-Rooted Android Compatibility'
    ]
  },
  'hwid_spoofer': {
    title: 'HWID Spoofer',
    category: 'Security Tool',
    type: 'tool',
    status: '⚙️ WIP',
    statusClass: 'status-progress',
    logo: './logos/hwid_spoofer_logo.svg',
    price: '10€ / Month',
    tags: ['KERNEL DRIVER', 'ALL ANTICHEATS', 'RESTART PERSIST'],
    desc: 'Ring-0 hardware identifier virtualizer for complete system security. Mask motherboards, network adapters, disk serials, GPU identifiers, and SMBIOS against all modern anti-cheat systems.',
    features: [
      '🛡️ Dynamic SMBIOS, Baseboard & CPU ID Spoofing',
      '💾 NVMe, SSD & HDD Physical Serial Number Virtualization',
      '🌐 MAC Address & Network Adapter Hardware Masking',
      '🔒 Compatibility with EAC, BattlEye, Vanguard & Ricochet',
      '🔄 Optional Restart-Persistence Driver Engine',
      '⚡ 1-Click Instant HWID Randomized Protection'
    ]
  }
};

function openProductModal(key) {
  const overlay = document.getElementById('product-modal');
  const modalLogo = document.getElementById('modal-logo-img');
  const modalTitle = document.getElementById('modal-product-title');
  const modalCategory = document.getElementById('modal-product-category');
  const modalStatus = document.getElementById('modal-product-status');
  const modalDesc = document.getElementById('modal-product-desc');
  const modalTags = document.getElementById('modal-product-tags');
  const modalFeatures = document.getElementById('modal-product-features');
  const modalPrice = document.getElementById('modal-product-price');
  const modalActionBtn = document.getElementById('modal-action-btn');

  const data = PRODUCTS_DATA[key];
  if (!data || !overlay) return;

  modalLogo.src = data.logo;
  modalTitle.textContent = data.title;
  modalCategory.textContent = data.category;
  modalStatus.textContent = data.status;
  modalStatus.className = `card-status-pill ${data.statusClass}`;
  modalDesc.textContent = data.desc;
  modalPrice.textContent = data.price;

  modalTags.innerHTML = '';
  data.tags.forEach(tag => {
    const span = document.createElement('span');
    span.className = 'spec-tag tag-cyan';
    span.textContent = tag;
    modalTags.appendChild(span);
  });

  modalFeatures.innerHTML = '';
  data.features.forEach(feat => {
    const item = document.createElement('div');
    item.className = 'modal-feature-item';
    item.textContent = feat;
    modalFeatures.appendChild(item);
  });

  if (data.price.includes('0€')) {
    modalActionBtn.textContent = '🚀 Start 0€ Free Trial';
  } else {
    modalActionBtn.textContent = '🛒 Unlock Access (10€)';
  }

  overlay.classList.add('active');
}
window.openProductModal = openProductModal;

function initProductModals() {
  const overlay = document.getElementById('product-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalActionBtn = document.getElementById('modal-action-btn');

  document.querySelectorAll('.btn-view-product').forEach(btn => {
    btn.addEventListener('click', (e) => {
      // If button is an anchor link to dedicated product page, allow direct navigation
      if (btn.tagName.toLowerCase() === 'a' && btn.getAttribute('href')) {
        return;
      }
      const card = e.target.closest('.product-card');
      if (!card) return;
      openProductModal(card.dataset.key);
    });
  });

  function closeModal() {
    if (overlay) {
      overlay.classList.remove('active');
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }

  if (modalActionBtn) {
    modalActionBtn.addEventListener('click', () => {
      window.open('https://discord.gg/WzhQ497uPe', '_blank');
      closeModal();
    });
  }
}

/* ==========================================================================
   6. FAQ Accordion
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });
}

/* ==========================================================================
   7. Toast Notifications
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}
