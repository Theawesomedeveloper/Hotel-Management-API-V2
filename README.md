# Hotel-Management-API-V2

## Introduction
Hotel Management API is an api for managing Rooms and RoomTypes in an Hotel

## Project Support Features
* Create any room and Room Type
* Fetch all rooms and Room Types
* Edit any room and Room Type
* Delete any room and Room Type
* authentication and authorization

## Live Endpoints
```html
https://lavilla.onrender.com/api/v2/room

https://lavilla.onrender.com/api/v2/roomtype

https://lavilla.onrender.com/api/v2/user/login

https://lavilla.onrender.com/api/v2/user/logout

```

## RUN LIVE VERSION

### find API Documentation [Here](https://documenter.getpostman.com/view/23888060/2s93CHuusL)



## RUN LOCALLY

## Installation Guide
* Clone this repository [here](https://github.com/Theawesomedeveloper/Hotel-Management-API-V2.git).
* Run npm install to install all dependencies
* Configure Mongodb URI for your Database
* Create an .env file in your project root folder and add variables for   `TOKEN_EXPIRES_IN`, `URI`, `SECRET_KEY`

### Usage
* Run npm start to start the application.
* Connect to the API using Postman on port 3000 or any port you specified in the `config.js`.

## Directory Structure

- `/controllers` contains the controllers for each endpoint
- `/middlewares` contains the middlewares
- `/models` contains the schema for each collection
- `/routes` contains the routes for each endpoint
- `/services` contains the database query for each collection


controllers 

middlewares 

models
 
routes
 
services

 


```bash
Hotel-Management-API-V2
├───app.js
├───config.js
├───controllers
|         ├───room.controller.js
|         ├───roomtype.controller.js
|         └───user.controller.js
├───middlewares
|         ├───authenticate.middleware.js
|         ├───authorise.middleware.js
|         └───validate.middleware.js
├───models
|         ├───room.model.js
|         ├───roomtype.model.js
|         └───user.model.js
├───routes
|         ├───health.route.js
|         ├───index.route.js
|         ├───roomtype.route.js
|         ├───roomtype.route.js
|         └───user.route.js
└───services
        ├───room.service.js
        ├───roomtype.service.js
        └───user.service.js
```

