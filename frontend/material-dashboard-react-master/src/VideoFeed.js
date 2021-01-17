import React, { Component } from 'react';
import 'VideoScript.js'
import 'stylesheet.css'

class VideoFeed extends Component {

    componentDidMount() {
        var video = document.querySelector("#videoElement");
        console.log(video)

        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    //console.log(video);
                    video.srcObject = stream;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }

        function stop(e) {
          var stream = video.srcObject;
          var tracks = stream.getTracks();

          for (var i = 0; i < tracks.length; i++) {
            var track = tracks[i];
            track.stop();
          }

          video.srcObject = null;
        }
    }

    render() {
        return (
            <div id="container">
                <video autoPlay={true} id="videoElement">

                </video>
            </div>
        )
    }
}
export default VideoFeed;