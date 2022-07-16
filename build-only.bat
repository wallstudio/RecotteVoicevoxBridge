@echo off

@REM Clan
del %ZIP_FILENAME%
rd /S /Q %ZIP_WOKING_DIR%

@REM Build
node .\node_modules\typescript\lib\tsc.js --build
node .\node_modules\nexe\index.js -t x64-14.15.3 -i .\dist\index.js

@REM Collection
mkdir %ZIP_WOKING_DIR%
copy README.md %ZIP_WOKING_DIR%\README.md
copy LICENSE.md %ZIP_WOKING_DIR%\LICENSE.md
copy RecotteVoicevoxBridge.exe %ZIP_WOKING_DIR%\RecotteVoicevoxBridge.exe