# Description
Backend (Express API) of React-based app canolled Master Melody
meant to connect musicians learning to play musical instruments.
Great for individual use and pair-play.

Backend code repo:
https://github.com/Bitchachos/master-melody-server

Frontend code repo:
https://github.com/Bitchachos/master-melody-client


# Instructions
To run the app:
- Create an .env file with a token secret
- Install dependencies by running npm install or npm i

To run on localhost, enter npm run dev in the terminal.

## API Endpoints

<br/>

**Auth endpoints**

| HTTP verb   | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST  | /api/auth/signup  | –  | { email: String, password: String }  | Create an account  |
| POST  | /api/auth/login  | –  | { email: String, password: String }  | Login  |
| GET  | /api/auth/verify  | Authorization: Bearer `<jwt>`  | –  | Verify jwt  |

<br/>

**Song**

| HTTP verb   | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST  | /api/songs  | Authorization: Bearer `<jwt>`  | { title: String, artist: String }  | Create a new song  |
| GET  | /api/songs  | –  | –  | Get all songs  |
| GET  | /api/songs/:songId  | –  | – | Get song details  |
| PUT  | /api/songs/:songId  | Authorization: Bearer `<jwt>`  | { title: String, artist: String, tasks: Array }  | Update a song  |
| DELETE  | /api/songs/:songId  | Authorization: Bearer `<jwt>`  | – | Delete a song  |

**Rehearsal**

| HTTP verb   | Path | Request Headers | Request body  | Description |
| ------------- | ------------- | ------------- |------------- | ------------- |
| POST  | /api/rehearsals  | Authorization: Bearer `<jwt>`  | { name: String, date: date, time: String, genre: String, skillLevel: String, song: Array, owner: Array }  | Create a new rehearsal  |
| GET  | /api/rehearsals  | –  | –  | Get all rehearsals  |
| GET  | /api/rehearsals/:rehearsalId  | –  | – | Get rehearsal details  |
| PUT  | /api/rehearsals/:rehearsalId  | Authorization: Bearer `<jwt>`  | { title: String, artist: String, tasks: Array }  | Update a rehearsal  |
| DELETE  | /api/rehearsals/:rehearsalId  | Authorization: Bearer `<jwt>`  | – | Delete a rehearsal  |


# Technologies Used
- JavaScript
- Node.js
- Express
- MongoDB
- Mongoose
- CSS
- HTML

# Demo
Backend:
https://master-melody.herokuapp.com/

Frontend:
https://master-melody.netlify.app/