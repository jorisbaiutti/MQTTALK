cd MQTTalk.App
dotnet publish -o publish
cd ..
docker build --rm -f "Dockerfile" -t mqttalk/dev:latest .