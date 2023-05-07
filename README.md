# SpotiPi
Server-client based Spotify control

## Setup
0. You would need to create an Spotify for Developers App with a premium account, with the redirect_urls configured like:

http://<machine name>:3000
http://<machine name>:3000/dashboard
http://<machine name>:8888
http://<machine name>:8888/callback

Also add the user with the right email ID under 'User Management' tab on the Spotify account settings page.

1. Create a file in top directory called `.env` to hold your credentials like:
```
CLIENT_ID: '<Your client_id here>'
CLIENT_SECRET: '<Your secret here>'
HOST_NAME=<machine name>
```
Without seting up the keys your application will not be able to communicate with Spotify. For details on how to generate the Id and the secret refer to the [Spotify developer page](https://developer.spotify.com/documentation/general/guides/authorization/app-settings/).

2. Run `yarn install`

## Run client & server
Run `yarn start`. The frontend application should be running on `<machine name>:3000` with the backend running on `machine name:8888`

## Testing backend
You can test the backend directly via curl commands directly on the endpoint. eg: 
```
curl -X PUT "<machine name>:8888/play?access_token=$TOKEN&active_device=$ACTIVE_DEVICE" | jq .
```
