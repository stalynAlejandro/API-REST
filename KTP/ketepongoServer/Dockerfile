FROM mcr.microsoft.com/dotnet/core/aspnet:3.1


WORKDIR /app
COPY build/release .

#RUN find ./App_Data -delete
#EXPOSE 1443/tcp 1080/tcp
EXPOSE 443/tcp 
#ENV ASPNETCORE_URLS https://*:1443; https://*:1080
ENV ASPNETCORE_URLS http://*:443
ENTRYPOINT ["dotnet","KeTePongoServer.dll", "run", "--server.urls", "http://*:443"]
