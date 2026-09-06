# BLΛCKMΛTRIX — Next-Gen Gaming Software & Automation Website

A modern, future-proof 2026 web presence for **BLΛCKMΛTRIX** (Cheats & Bots), built with tactile haptic feedback, a real-time status hub, and transparent pricing matrix.

---

## 🚀 Local Testing on Your PC

You can run the website locally in two simple ways:

### Method 1: 1-Click Launcher (Recommended)
Simply double-click:
```
start_local_preview.bat
```
This automatically opens your default web browser at `http://localhost:8080` and starts the local server.

### Method 2: Via Terminal / PowerShell
Open PowerShell or CMD in `C:\Users\lukas\.gemini\antigravity\scratch\Website` and run:
```powershell
python -m http.server 8080
```
Then navigate to [http://localhost:8080](http://localhost:8080) in your browser.

---

## 🌐 Deploying to GitHub Pages (Step-by-Step)

The website is **100% static** and uses relative asset paths (`./logos/`, `./css/`, `./js/`). It works out of the box with zero build steps on GitHub Pages!

1. **Create a GitHub Repository**:
   Create a new public or private repository on GitHub (e.g. `blackmatrix-site`).

2. **Commit and Push Files**:
   Inside `C:\Users\lukas\.gemini\antigravity\scratch\Website`, execute:
   ```bash
   git init
   git add .
   git commit -m "Deploy BLΛCKMΛTRIX 2026 website"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/blackmatrix-site.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - In your GitHub repository, navigate to **Settings**.
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment > Source**, select `Deploy from a branch`.
   - Set Branch to `main` and folder to `/ (root)`.
   - Click **Save**.
   - Within 1 minute, your site will be live worldwide at `https://<YOUR_USERNAME>.github.io/blackmatrix-site/`!

---

## ✨ Features & Highlights

- **Design Matching Reference Proposal**:
  - Official AX logo & glowing typography
  - Large glowing category buttons: `[🎯 CHEATS]` (Cyan/Blue) & `[🤖 BOTS]` (Magenta/Purple)
  - 9 Glassmorphism product cards with official game logos, status pills, and detail modals
- **Modern 2026 Redesigned Sections**:
  - **Live Telemetry & Status Hub**: Real-time network latency graph, anti-cheat status matrix (VAC, EAC, BattlEye, Supercell Safe), last update date (`31.08.2026`).
  - **Transparent Pricing Matrix**: Direct access to **0€ Free Trials** and monthly passes (10€ / 15€).
  - **Tactile Micro-Interactions**: Smooth ripple animations, 3D tilt, and active button scaling.
