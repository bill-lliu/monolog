import React, { Component } from 'react';
import axios from "axios";

import Graph from "./components/Graphs/graph";
import Emotions from './Emotions';
import VideoFeed from './VideoFeed.js';
import './VideoScript.js';
import './stylesheet.css';

class App extends Component {

    // func1() {
    //     alert("Great Shot!");
    // }

    // func2() {
    //     alert("Great Shot!");
    // }

    state = {
        emotions: [],
        emotionObject: []
    };




    render() {
        return (
            <div style={{ display: "grid", placeItems: "center" }}>
                <center><img src="frontend\material-dashboard-react-master\src\assets\img\logo.png" alt="monolog" /></center>
                {/*<button onClick={func1}>Start Recording!</button>*/}
                {/*<button onClick={func2}>Stop</button>*/}
                <VideoFeed />
                <Emotions emotions={this.state.emotions} />

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
            axios.get('/get/video-emotions').then((res => {
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