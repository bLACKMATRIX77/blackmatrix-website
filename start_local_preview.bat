@echo off
chcp 65001 >nul
title BLΛCKMΛTRIX 2026 - Local Preview Server
cd /d "%~dp0"
echo ========================================================
echo    BLΛCKMΛTRIX 2026 - Modern Website Preview
echo ========================================================
echo Starting local web server on http://localhost:8080 ...
echo Press Ctrl + C in this window to stop the server.
echo ========================================================
start "" "http://localhost:8080"
python -m http.server 8080
pause
