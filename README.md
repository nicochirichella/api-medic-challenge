# api-medic-challenge

To run this api you need to run commands:
- docker-compose up 

<!-- Also you can run it manually by starting the server, first you need to open a pg connection in your localhost with credentials -->
- cd server
- nvm use
- yarn install
- yarn start

Comments/assumptions:
- There will be a logs directory that saves all the errors
- Regarding authentication, I saved the user with email and password hashing the pswd just for this challenge, probably I wolud use firebase to do the login
- There are endpoints that could be use by an admin of the platform to add diseases and symptoms. Also for testing you can add the ones you want. (Pottentaily could be a migration that loads that info in db)



