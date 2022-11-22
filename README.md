# api-medic-challenge

To run this api you need to run commands:
<!-- So far docker only contains db, but it could also dockerize server api -->
- docker-compose up 
- cd server
- nvm use
- yarn install
- yarn start

Comments/assumptions:
- There will be a logs directory that saves all the errors
- Regarding authentication, I saved the user with email and password hashing the pswd just for this challenge, probably I wolud use firebase to do the login
- There are endpoints that could be use by an admin of the platform to add diseases and symptoms. Also for testing you can add the ones you want. (Pottentaily could be a migration that loads that info in db)



