#Nightlife Coordination

A web application describing the nightlife in your city. Search for and decide where to go tonight. Uses the Foursquare API. Passport JS GitHub strategy is used for user authentication.

##Getting Started

###Prerequisites

1. [node](https://nodejs.org/en/)
2. [npm](https://www.npmjs.com)
3. [mongodb](https://www.mongodb.com/)

###Installation
Clone the project

```git
git clone https://github.com/khansubhan95/nightlife-coordination.git
```

run

```
npm install
```

to install the dependencies

###For development
Rename .env.template to .env

Make an OAuth application on GitHub (settings - OAuth Applications) with project URL as http://127.0.0.1:3000 and callback URL as http://127.0.0.1:3000/auth/github/callback, note down generated ID and secret and fill it in .env

Sign up on Foursquare to access their API. Place ID and secret in .env

The project uses MongoDB to store data so make sure you have it installed. Use the MONGO_URI to access a DB from the app.

##Deployment
Sign up on heroku and install heroku CLI tools. In the project's root run heroku create. Now you need to set config vars for the heroku application. 

**GitHub ID and Secret**
Repeat the procedure given in development for GitHub, with the project URL to be the URL of the heroku app and the callback URL to be the /auth/github/callback appended to project URL.

**APP_URL**
The URL generated by the heroku app

**MONGO_URI**
Use a third party service like mLab to make a MongoDB database and note down the access point.

No change in remaining variables.

Goto settings - configvars

and for each variable (except PORT) in .env enter key and corresponding value generated above as given above.

##Builtwith
1. [express](https://expressjs.com/)      
2. [mongoose](http://mongoosejs.com/)
4. [passport](http://passportjs.org/)
5. [ejs](www.embeddedjs.com/)
6. [jQuery](https://jquery.com)
7. [font-awesome](http://fontawesome.io/icons/)

View other dependencies in package.json

##Contributing
1. Fork it
2. Create your branch
3. Commit your changes
4. Push to branch
5. Submit a pull request

##Licensing
MIT