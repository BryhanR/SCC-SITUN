@echo off

FOR /F "tokens=4 delims= " %%i in ('route print ^| find " 0.0.0.0"') do set localIp=%%i


start chrome "http://%localIp%:3000"

pause