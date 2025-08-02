@echo off
cd /d C:\Developments\spring_boot_react_crud-master

echo.
echo === Checking current branch ===
git branch

echo.
echo === Switching to 'main' branch ===
git checkout main

echo.
echo === Pulling latest from GitHub ===
git pull origin main

echo.
echo === Checking status ===
git status

echo.
echo === Staging all changes ===
git add .

echo.
echo === Committing changes ===
set /p commitMsg="Enter commit message: "
git commit -m "%commitMsg%"

echo.
echo === Pushing to GitHub ===
git push origin main

echo.
echo === Done syncing with remote ===
pause
