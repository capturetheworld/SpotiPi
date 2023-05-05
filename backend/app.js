/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

const express = require('express'); // Express web server framework
const request = require('request') // "Request library"
const cors = require('cors');
const bodyParser = require("body-parser")
const querystring = require('querystring');
const cookieParser = require('cookie-parser');
const SpotifyWebApi = require('spotify-web-api-node')
require('dotenv').config({ path: '../.env' })
// var request = require('request'); // "Request" library

const app = express();
app.use(cors())
app.options('*', cors());
app.use(cookieParser());
app.use(bodyParser.json())

let client_id = process.env.CLIENT_ID;
let client_secret = process.env.CLIENT_SECRET;

var redirect_uri = 'http://localhost:3000'; // Your redirect uri


var stateKey = 'spotify_auth_state';


// var playerControls = function(req, res, command) {
//     var access_token = req.query.access_token;
//     var active_device = req.query.active_device;
//
//     var player_options = {
//         url: 'https://api.spotify.com/v1/me/player/' + command,
//         headers: { 'Authorization': 'Bearer ' + access_token },
//         form: {
//             device_id: active_device
//         },
//         json: true
//     }
//     console.log(player_options)
//     putRequest(player_options, res)
// 

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function (length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

app.get('/', function (req, res) {
    console.log(client_id, client_secret)
    res.send('Hello from SpotiPi backend!')
});

app.get('/apival', function (req, res) {

    res.send(client_id);
});

app.get('/apisecret', function (req, res) {

    res.send(client_secret);
});



app.post('/login', function (req, res) {
    const code = req.body.code

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: client_id,
        clientSecret: client_secret
    })

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expires_In: data.body.expires_in
            })
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
});

app.get('/callback', function (req, res) {

    // your application requests refresh and access tokens
    // after checking the state parameter

    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;

    if (state === null || state !== storedState) {
        res.redirect('/#' +
            querystring.stringify({
                error: 'state_mismatch'
            }));
    } else {
        res.clearCookie(stateKey);
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            form: {
                code: code,
                redirect_uri: redirect_uri,
                grant_type: 'authorization_code'
            },
            headers: {
                'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
            },
            json: true
        };

        request.post(authOptions, function (error, response, body) {
            if (!error && response.statusCode === 200) {

                var access_token = body.access_token,
                    refresh_token = body.refresh_token;

                var options = {
                    url: 'https://api.spotify.com/v1/me',
                    headers: { 'Authorization': 'Bearer ' + access_token },
                    json: true
                };

                // use the access token to access the Spotify Web API
                request.get(options, function (error, response, body) {
                    console.log(body);
                });

                // var options = {
                //   url: 'https://api.spotify.com/v1/me/player/devices',
                //   headers: {'Authorization': 'Bearer ' + access_token},
                //   json: true
                // }
                //
                // request.get(options, function(error, response, body) {
                //   console.log(body);
                // });

                // we can also pass the token to the browser to make requests from there
                res.redirect('/#' +
                    querystring.stringify({
                        access_token: access_token,
                        refresh_token: refresh_token
                    }));
            } else {
                res.redirect('/#' +
                    querystring.stringify({
                        error: 'invalid_token'
                    }));
            }
        });
    }
});

app.post('/refresh', function (req, res) {
    console.log('hi')
    const refreshToken = req.body.refreshToken

    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: client_id,
        clientSecret: client_secret,
        refreshToken
    })

    spotifyApi.refreshAccessToken()
        .then(data => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            })
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
});

app.get('/get_devices', function (req, res) {

    var access_token = req.query.access_token;
    var options = {
        url: 'https://api.spotify.com/v1/me/player/devices',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }
    console.log()

    request.get(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body)
            var devices = body.devices;
            res.send({
                'devices': devices
            });
        }
        else {
            res.send({
                'error': 'Suffered a fatal error ' + response.statusCode,
                'spotifyResponse': response
            })
        }
    });

});

app.get('/active_device', function (req, res) {
    var access_token = req.query.access_token;
    var options = {
        url: 'https://api.spotify.com/v1/me/player',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }
    console.log(options)

    request.get(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var active_device = body.device.id;
            console.log(active_device)
            res.send({
                'active_device': active_device
            })
        }
        else {
            res.send({
                'error': 'Suffered a fatal error ' + error,
                'spotifyResponse': response
            })
        }
    });
});

app.get('/state', function (req, res) {
    var access_token = req.query.access_token;
    var options = {
        url: 'https://api.spotify.com/v1/me/player',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }
    console.log(options)
    getRequest(options, res)
})

app.put('/play', function (req, res) {
    var access_token = req.body.access_token;

    var play_options = {
        url: 'https://api.spotify.com/v1/me/player/play',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
    }
    console.log(play_options)

    putRequest(play_options, res)
    // playerControls(req, res, 'play')
});

app.put('/pause', function (req, res) {
    var access_token = req.body.access_token;
    var active_device = req.body.active_device;

    var pause_options = {
        url: 'https://api.spotify.com/v1/me/player/pause',
        headers: { 'Authorization': 'Bearer ' + access_token },
        form: {
            device_id: active_device
        },
        json: true
    }

    putRequest(pause_options, res)
    // playerControls(req, res, 'pause')
})

app.post('/next', function (req, res) {
    var access_token = req.body.access_token;
    var active_device = req.body.active_device;

    var next_options = {
        url: 'https://api.spotify.com/v1/me/player/next',
        headers: { 'Authorization': 'Bearer ' + access_token },
        form: {
            device_id: active_device
        },
        json: true
    }
    postRequest(next_options, res)
})

app.post('/previous', function (req, res) {
    var access_token = req.body.access_token;
    var active_device = req.body.active_device;

    var next_options = {
        url: 'https://api.spotify.com/v1/me/player/previous',
        headers: { 'Authorization': 'Bearer ' + access_token },
        form: {
            device_id: active_device
        },
        json: true
    }
    postRequest(next_options, res)
})

var getRequest = function (options, res) {
    var statusCode = 500;
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body)
            statusCode = 200
        }
        else {
            // console.log("Error: " + error)
            // console.log(response)
            console.log("Failed to get valid request")
        }
        res.status(statusCode).send(body)
    })
}

var putRequest = function (options, res) {
    var statusCode = 500;
    request.put(options, function (error, response, body) {
        if (!error && response.statusCode === 204) {
            console.log(body)
            statusCode = 204
        }
        else {
            console.log("Error: " + error)
            console.log(response.statusCode)
            console.log(response.rawHeaders)
        }
        res.status(statusCode).send(body)
    });
}

var postRequest = function (options, res) {
    var statusCode = 500;
    request.post(options, function (error, response, body) {
        if (!error && response.statusCode === 204) {
            console.log(body)
            statusCode = 204
        }
        else {
            console.log("Error: " + error)
            console.log(response.statusCode)
            console.log(response.rawHeaders)
        }
        res.status(statusCode).send(body)
    });
}

console.log('Listening on 8888');
app.listen(8888);