FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
COPY MQTTalk.App/publish/ /app
WORKDIR /app
EXPOSE 80
ENTRYPOINT ["dotnet", "MQTTalk.App.dll"]