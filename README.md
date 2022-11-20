# api-medic-challenge

To run this api you need to run commands:
<!-- So far docker only contains db, but it could also dockerize server api -->
- docker-compose up 
- nvm use
- yarn install // Within server directory
- yarn start

Comments/assumptions:
- There will be a logs directory that saves all the errors
- Regarding authentication, I saved the user with email and password hashing the pswd just for this challenge, probably I wolud use firebase to do the login


Endpoints: 
- Auth:
    - Register: 
        Post
        body: {name, lastName, gender, email, pswd}
        returns: { statusCode, msg, data } // Will retrieve a jwt token as well

    - Login:
        post
        body: { email, pswd }
        returns: { statusCode, msg, data } // Will retrieve a jwt token as well
