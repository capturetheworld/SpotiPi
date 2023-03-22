# SpotiPi
Server-client based Spotify control

## Setup
1. Create a file in `backend/config.js` to hold your like so:
```
const config = {
    client_id: '<Your client_id here>',
    client_secret: '<Your secret here>'
}
```
Without seting up the keys your application will not be able to communicate with Spotify. For details on how to generate the Id and the secret refer to the [Spotify developer page](https://developer.spotify.com/documentation/general/guides/authorization/app-settings/).

2. Run `yarn install`

## Run client & server
Run `yarn start`. The frontend application should be running on `localhost:3000` with the backend running on `localhost:8888`

## Testing backend
You can test the backend directly via curl commands directly on the endpoint. eg: 
```
curl -X PUT "localhost:8888/play?access_token=$TOKEN&active_device=$ACTIVE_DEVICE" | jq .
```
