dotnet restore KeTePongoServer
dotnet publish -c Release -o build\release KeTePongoServer
docker build --rm --tag=ktpacr.azurecr.io/ktpappsrv:1.8.2.0 .
rem docker run -d -p 443:443 -e ORCHARD_APP_DATA="/home" -v c:\compDocker:/home ktpacr.azurecr.io/ktpappsrv:1.8.2.0

rem estos dos los hago una vez finalizados los de arriba si quiero publicar el contenedor generado.
rem docker login ktpacr.azurecr.io -u ktpACR -p ggop2OmMxntxCDiQU9A7q5PAEL+CpXrj
rem docker push ktpacr.azurecr.io/ktpappsrv:1.8.2.0


