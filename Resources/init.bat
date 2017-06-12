@echo off

set Pathname="C:\SCC-SITUN"
cd "C:\SCC-SITUN"

netstat -o -n -a | findstr 3000 
if %ERRORLEVEL% equ 0 (
msg * "El Programa SCC-SITUN a se encuentra en ejecucion o el puerto se encuentra ocupado por otro programa"
goto END
)

npm start
:END