const express = require('express');
const got = require('got');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const client_id = 'CLIENT_ID'; 
const client_secret = 'CLIENT_SECRET'; 
const redirect_uri = 'REDIRECT_URI'; 

//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(cors())
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }))
//app.use(bodyParser.json())

let stateKey = 'spotify_auth_state';

const app = express()
const apiPort = 3000

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
//app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.json());

let generateRandomString = function(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
    } 

app.get('/login', function(req, res) {

    var state = generateRandomString(16);
    res.cookie(stateKey, state);
  
    var scope = 'user-read-email user-read-private playlist-modify-public playlist-modify-private playlist-read-private';
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
      }));
  });

app.get('/callback', function(req, res) {
    var code = req.query.code || null;
    var state = req.query.state || null;
    var storedState = req.cookies ? req.cookies[stateKey] : null;
  
    if (state === null || state !== storedState) {
      res.redirect('/#oops-login' +
        querystring.stringify({
          error: 'state_mismatch'
        }));
    } else {
        res.clearCookie(stateKey);
        var aOptions = {
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
        }

        got.post('https://accounts.spotify.com/api/token', aOptions)
        .then(function(response){
            console.log(posted);

            var access_token = body.access_token
            let myUri = 'frontend uri' || 'http://localhost:3000';
            res.redirect(myUri + '?access_token=' + access_token);

            return response.body;
        }).catch(function(error){
          res.redirect('/#oops-token' +
          querystring.stringify({
              error: 'invalid_token'
          }));
        });
    }
    
});

//let apiPort = 8888;
app.listen(apiPort, () => console.log(`Server listening on port ${apiPort}`));