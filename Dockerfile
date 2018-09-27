FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 80

FROM microsoft/dotnet:2.1-sdk AS build
# Setup NodeJs
RUN apt-get update && \
    apt-get install -y wget && \
    apt-get install -y gnupg2 && \
    wget -qO- https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install -y build-essential nodejs
# End setup
WORKDIR /src
COPY ["MQTTalk.App/MQTTalk.App.csproj", "MQTTalk.App/"]
RUN dotnet restore "MQTTalk.App/MQTTalk.App.csproj"
COPY . .
WORKDIR "/src/MQTTalk.App"
RUN dotnet build "MQTTalk.App.csproj" -c Release -o /app

FROM build AS publish
RUN dotnet publish "MQTTalk.App.csproj" -c Release -o /app

FROM base AS final
WORKDIR /app
COPY --from=publish /app .
ENTRYPOINT ["dotnet", "MQTTalk.App.dll"]
