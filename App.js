import React, { Component } from 'react';
import queryString from 'query-string';
import 'style.css';

class App extends Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        let q = queryString.parse(window.location.search);
        let aT = q.access_token;

        if (!aT) {
            return 
        }

        fetch('https://api.spotify.com/v1/me', {
            headers: {'Authorization': 'Bearer ' + aT}
            }).then(response => response.json())
            .then(data => this.setState({
                user: {
                    name: data.display_name
                }
        }));

        fetch('https://api.spotify.com/v1/me/playlists', {
            headers: {'Authorization': 'Bearer ' + aT}
            }).then(response => response.json())
            .then(data => this.setState({
                playlists: data.items.map(item => {
                    console.log(data.items);
                    return {
                        name: item.name,
                        id: item.id,
                        tracks: []
                    }
                })
            })).then(function (){
                    let playlistObject = this.state.data.playlists;
                    for(var i = 0; i < Object.entries(playlistObject).length; i++){
                        if (this.name = 'SHE-ify') {
                            let playlistID = this.id;
                            let tracks = this.tracks;
                            let playlistInfo = (playlistID, tracks);

                            return playlistInfo;
                        
                        }

                    }
                    
            }).then(function(){
                if(playlistInfo === undefined || playlistInfo === null){
                        //create playlist
                }
                
            });
        
        //get user's top tracks/artists
        //tracks -- can derive artists from but may have duplicate artists (less to search from), saves on second req for tracks
        //artists -- may get more artists, but could use like artists maybe, is second req
        //make array with artist, binary value, to compare in musicbrainz
        //add (or get first) tracks from artists to playlist
               
         
                

    }

    render (){
        return (
            <div className='sheify-react'>

                {() => {this.state.user
                ?  <div className='userView'>
                    <h2>Hey there, {this.state.user.name.substr(0,str.indexOf(' ')) ? this.state.user.name.substr(0,str.indexOf(' ')) : this.state.user.name}!</h2>
                    <h3>We've added music to your playlist SHE-ify in Spotify.</h3>
                    <button onClick={() => {
                        window.location = 'open.spotify.com/playlist/' + playlistInfo[0];
            
                    }}style={{padding: '18px', 'font-size': '28px', 'margin-top': '18px'}}>Listen Now</button>
                    </div>
                : <div className='intro'>
                    <h2>Let's Turn up the volume on women who rock.</h2>
                    <button onClick={() => {
                        window.location = window.location.href.includes('localhost') 
                        ? 'http://localhost:8888/login' 
                        : 'https://she-ify.com/login' }
            
                    }style={{padding: '18px', 'font-size': '28px', 'margin-top': '18px'}}>Sign in with Spotify</button>
                    </div>
                }
                }
            </div>
        );
    }
}