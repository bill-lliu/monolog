import React, { Component } from 'react';
import axios from "axios";

import Graph from "./components/Graphs/graph";
import Emotions from './Emotions';
import VideoFeed from './VideoFeed.js';
import './VideoScript.js';
import './stylesheet.css';
import logo from './assets/img/logo.png';

class App extends Component {

    state = {
        emotions: [],
        emotionObject: []
    };

    render() {
        return (
            <div style={{ display: "grid", placeItems: "center" }}>
                <center><img src={logo} alt="monolog" width="240px" height="80px" /></center>
                <VideoFeed />
                <button
                    style={{
                        width: "180px",
                        borderRadius: "3px",
                        letterSpacing: "1px",
                        marginTop: "0.5rem",
                        marginBottom: '0.1rem'
                    }}
                    className="btn btn-small waves-effect waves-light teal"
                    onClick={this.handleStart}
                >
                    {'START'}
                </button>
                <Emotions emotions={this.state.emotions} />
                <Graph emotionObject={this.state.emotionObject} />
            </div>
        )
    }

    handleStart() {
        axios.get()
    }

    //first time checking page
    componentDidMount() {
        this.interval = setInterval(() => {
            console.log("Sending Request")
            axios.get('/get/interim_combined').then((res => {
                const emotion_data = res['data']['emotions']
                let emotion_list = []
                for (const [key, value] of Object.entries(emotion_data)) {
                    emotion_list.push({ 'emotion': key, 'value': value })
                }
                this.setState({ emotions: emotion_list });
                this.setState({ emotionObject: Object.values(emotion_data) })
                console.log(this.state)
            }))
        }
            , 2000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    //will update every time the state changes
    componentDidUpdate() {
        console.log("updating")
    }

}

export default App;