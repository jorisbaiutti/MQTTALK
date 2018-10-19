cd MQTTalk.App
dotnet publish -o publish
cd ..
docker build --rm -f "Dockerfile.dev" -t mqttalk/dev:latest .