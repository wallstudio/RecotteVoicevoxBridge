@echo off
node .\node_modules\typescript\lib\tsc.js --build
node .\node_modules\nexe\index.js -t x64-14.15.3 -i .\dist\index.js