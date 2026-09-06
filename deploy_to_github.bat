@echo off
title BL?CKM?TRIX - Auto GitHub Deploy
color 0b
echo ========================================================
echo   BLCKMTRIX 2026 - Instant 1-Click Deploy to GitHub
echo ========================================================
echo.
cd /d "C:\Users\lukas\.gemini\antigravity\scratch\Website"

echo [1/3] Adding all files...
git add .

echo [2/3] Committing changes...
git commit -m "Update website: mobile responsive & design polish"

echo [3/3] Pushing to blackmatrix-cheats.com...
git push origin main --force

echo.
echo ========================================================
echo   FERTIG! Deine ?nderungen sind live auf deiner Domain!
echo ========================================================
pause
