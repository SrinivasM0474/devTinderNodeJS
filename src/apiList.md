# DevTinder APIs

### authRouter

- POST /signup
- POST /login
- POST /logout

### profileRouter

- GET /profile/view
- PATCH /profile/edit

### connectionRequestRouter

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

- POST /request/send/:status/:userId //dynamic

- POST /request/review/accepted/:requestId
- POST /request/review/rejected/:requestId

### userRouter

- GET /user/connections
- GET /user/requests
- GET /user/feed - Gets youthe profiles of other users on the platform

##

- Status: ignore, interested, accepted, rejected
