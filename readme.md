# Structure
* MQTTalk.App
    * Application which will contain the Rest API backend and the client side angular SPA.
* MQTTalk.Test
    * Unit tests for the backend written with xUnit. Frontend code (Angular) will be tested otherwise.

# Get started
1. Checkout repository
2. Run `dotnet restore` in root directory
3. To start the app, run `dotnet run --project .\MQTTalk.App\`
4. For unit tests, run `dotnet test .\MQTTalk.Test\`
