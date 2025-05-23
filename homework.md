- Create a free cluster on MongoDB official website (Mongo Atlas)
- Install mongoose library
- Conect your application ti the DAtabse "Connection-url"/devTinder
- Call the connectDB function and connect to databse before starting application on port(4444)
- Create a userSchema & user Model
- Create POST /signup API to add data to database
- Push some documents using API calls from postman
- Error Handling using try, catch
- Add the express.json middleware to app
- Make your signup API dynamic to receive data from end user
- API - Get user by email
- API - Feed API - GET /feed - get all the users from the database
- API -Get User by ID
- Create a delete user API
- Difference between patch and put
- API - Update the user with email ID

- Explore schematype options from documentaion
- add required, unique, lowercase, min, minLength, trim
- Add default
- Create a custom validte function for gender
- Improve the DB Schema - PUT all appropriate validations on each field in schema
- Add timestamps to the userSchema
- Add API level validations on patch request & signup post api
- Data Sanitizing - Add API validation for each field
- Install validator
- Exlore validator library function and Use valdator funcs for password, email, photoUrl
- NEVER TRUST req.body

- Validate data in SignUp API
- Install bcrypt package
- Create PasswordHash using bcrypt.hash & save the user with encrypted password

- Create login API
- Compare passwords and thrown error if email or password is invalid

- install cooker-parser
- just send a dummy cookie to user
- create GET /profile API and check if you get the cookie back
- install jsonwebtoken
- In Login API, after email and password validation, create a JWT token and send it to user in cookie
- read the cookie inside your profile API and find the logged in user
- userAuth middleware
- Add the userAuth middleware in profile API and add a new sendConnectionRequest API
- Set the expiry of JWT token and cookies to 7 days after
- Create user schema method to getJWT()
- Create user schema method to comparePassword(passwordInputByUser, passwordHash)

- Create a list of all API you can think of in Dev Tinder
- Group multiple routes under respective routers
- Read documentation for express.Router
- Create routes folder for managing auth, profile, request routers
- create authRouter, profileRouter, requestRouter
- import these routers in app.js
- Create POST /logout API
- Create PATCH /profile/edit
- Create PATCH /profile/password API => forgot password API
- Make you validate all data in every POST, PATCH APIs

- Create Connection Request Schema
- Send connection Request API
- Proper validation of Data
- Think about all corner cases
- $or query $and query in mongoose - https://www.mongodb.com/docs/manual/reference/operator/query-logical/
- schema.pre("save") function
- Read more about about indexes in MongoDB
- why do we need index in DB?
- Whhat is the advantage and disadvantages of creating ?
- Read this article about compound indexes - https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/
- ALWAYS THINK ABOUT CORNER CASES\*\*\*

- Write code with proper validation for POST /request/review/:status/:requestId
- Thought process - POST vs GET
- Read about ref and populate https://mongoosejs.com/docs/5.x/docs/populate.html
- Create GET /user/requests/received with all the checks
- Create GET /user/connections

- Logic for GET /feed API
- Explore the $nin, $and $ne and other query operators
- Pagination

- /feed?page=1&limit=10 ==> first 10 users 1-10 ==> .skip(0) & .limit(10)
- /feed?page=2&limit=10 ==> 11-20 ==> .skip(10) & .limit(10)
- /feed?page=3&limit=10 ==> 21-30 ==> .skip(20) & .limit(10)

- skip = (page - 1) \* limit
