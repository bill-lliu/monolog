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
                <button
                    style={{
                        width: "180px",
                        height: "40px",
                        borderRadius: "10px",
                        letterSpacing: "1px",
                        marginTop: "1rem",
                        marginBottom: '1rem'
                    }}
                    className="btn btn-small waves-effect waves-light teal"
                    onClick={this.handleStart}
                >
                    {'START'}
                </button>
                
                <Emotions emotions={this.state.emotions} wpm={this.state.wpm} />
                <GridItem xs={12} sm={6} md={3} style={{ marginTop: "15px", marginBottom: "15px" }}>
                    <Card className="card" key='WPM'>
                        <div className="card-body" style={{ display: "grid", placeItems: "center" }}>
                            <h5 className="card-title">{'WPM'}</h5>
                            <h4 className="card-subtitle mb-2 text-muted">{parseFloat(this.state.wpm).toFixed(2)}</h4>
                        </div>
                    </Card>
                </GridItem>
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