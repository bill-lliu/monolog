import React, { Component } from 'react';
import axios from "axios";

import Graph from "./components/Graphs/graph";
import Emotions from './Emotions';
import VideoFeed from './VideoFeed.js';
import './VideoScript.js';
import './stylesheet.css';
import logo from './assets/img/logo.png';
import GridItem from "./components/Grid/GridItem";
import { Card } from "@material-ui/core";
import GridContainer from "./components/Grid/GridContainer";

class App extends Component {

    state = {
        emotions: [],
        emotionObject: [],
        wpm: 0
    };

    render() {
        return (
            <div style={{ display: "grid", placeItems: "center" }}>
                <center><img src={logo} alt="monolog" width="240px" height="80px" /></center>
                <VideoFeed />

                <GridContainer>
                    <button
                        style={{
                            width: "180px",
                            height: "40px",
                            borderRadius: "10px",
                            letterSpacing: "1px",
                            margin: "1rem"
                        }}
                        className="btn btn-small waves-effect waves-light teal"
                        onClick={this.handleStart}
                    >
                        {'START RECORDING!'}
                    </button>
                    <button
                        style={{
                            width: "60px",
                            height: "40px",
                            borderRadius: "10px",
                            letterSpacing: "1px",
                            margin: "1rem"
                        }}
                        className="btn btn-small waves-effect waves-light teal"
                        onClick={this.handleStart}
                    >
                        {'STOP'}
                    </button>
                    <GridItem>
                    <div key='WPM'>
                        <h5 style={{margin:"22px"}}> {'WPM'} {parseFloat(this.state.wpm).toFixed(2)} </h5>
                    </div>
                </GridItem>
                </GridContainer>

                <Emotions emotions={this.state.emotions} wpm={this.state.wpm} />

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

                axios.get('/get/wpm').then( (res2)=>{
                this.setState({wpm: res2['data']['wpm']})
            })
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