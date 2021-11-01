# Hi! This is a learning project with full-auth process.
### You can: 
* Create an account
* Verify it with your email
* Login to your account
* Logout from account
* Also you can have some actions, that only authorized users can do
* Access token dies in 15 seconds and refresh token dies in 30 seconds for you to check it out!


### Used stack:
#### Client
* React
* Typescript
* Axios
* Redux(+react-redux and redux-toolkit)

#### Server
* MongoDB
* ExpressJS
* Nodemailer
* JWT
* bcrypt
* express-validator


## To run this app:
– [x] cd client && npm install
– [x] cd server && npm install
– [x] create .env file and copy everything from .env.example file (finish this later)
– [x] cd client && npm start
– [x] cd server && npm run dev

## .env file
PORT=5000
DB_URL= Create your mongo db and write here the link-connection
JWT_ACCESS_SECRET= *any string that noone knows*
JWT_REFRESH_SECRET= *any string that noone knows*
EMAIL_ADRESS=Email which you want to use to send your verify-messages
EMAIL_PASSWORD= Password for your email, better to use "Google app password", if you use Gmail
SMTP_PORT=Port for your mailer. Gmail uses 587
SMTP_HOST=Host for your mailer. Gmail uses smtp.gmail.com
API_URL=http://localhost:5000
CLIENT_URL=http://localhost:3000
