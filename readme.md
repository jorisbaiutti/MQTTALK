# Get started

## Prerequisites
* Dotnet Core 2.1
* Git
* Docker, if you want to use containers

## Run the app
1. Checkout repository
2. Run `dotnet restore` in root directory
3. To start the app, run `dotnet run --project .\MQTTalk.App\`
4. For unit tests, run `dotnet test .\MQTTalk.Test\`


## Docker
This project will support containers realised with docker.
To build the image run `docker build --rm -f "Dockerfile" -t mqttalk:latest .`
Run the image with `docker run --rm -d -p 5000:80/tcp mqttalk:latest` (WebApp will now be available @ http://localhost:5000)


# Development
## Structure
* MQTTalk.App
    * Application which will contain the Rest API backend and the client side angular SPA.
* MQTTalk.Test
    * Unit tests for the backend written with xUnit. Frontend code (Angular) will be tested otherwise.