# tinyUrl

    1. What is a URL shortening system?
      It is a service that allows you to use short URLs which redirect to the original URL.
    2. What's the main value? Who needs such a system and why?
      It makes the URL more manageable and easy to share or remember. It can bu used in any situation that requires to acces to sites with long urls.
    3. Describe The main mechanism of work and system components.
      It uses url redirection, HTTP 301 redirection to the original url. Ex. using AYI-tinyUrl yo get a short url from ther service that points to the original url
    4. What do you think are the main challenges in implementing and running the system.
      To run the system you need to have docker installed.
      You can change .env file for the api variables.
      In the front side, proxy.conf.json file points to api container
      Then you simply run docker-compe up -d and all the necesary will be dowloaded from the hub and 3 services will start. MongoDB + API REST + ANGULAR APP
    5. Try to suggest some ideas for advanced features.
      You need to trust the url you ar given, so make a validation for the url's to know where you are being redirected.
    
- Useful data:
- API running in port 9001
- Frontend running in port 4200. Access with browser to localhost:4200
