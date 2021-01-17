import React, { Component } from 'react';
import 'VideoScript.js'
import 'stylesheet.css'

class VideoFeed extends Component {
    render() {
        return (
            <div id="container">
                <video autoplay="true" id="videoElement">

                </video>
            </div>
        )
    }
}
export default VideoFeed;