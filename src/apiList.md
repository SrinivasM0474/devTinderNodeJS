# DevTinder APIs

### authRouter

- POST /signup
- POST /login
- POST /logout

### profileRouter

- GET /profile/view
- PATCH /profile/edit

### connectionRequestRouter

- POST /request/send/:status/:requestId

- POST /request/review/:status/:requestId

### userRouter

- GET /user/requests/received
- GET /user/connections
- GET /user/feed - Gets youthe profiles of other users on the platform

##

- Status: ignore, interested, accepted, rejecte
