import React, {Component} from 'react';
import axios from "axios";

import Graph from "./components/Graphs/graph";
import Emotions from './Emotions';
import VideoFeed from './VideoFeed.js';
import './VideoScript.js';
import './stylesheet.css';

class App extends Component {
    
    state = {
        emotions: [],
        emotionObject: []
    };

    chart_data = () =>{
        return(
            [
      {
        label: 'Series 1',
        data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
      },
      {
        label: 'Series 2',
        data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
      }
    ]
        )
    }

    axes = () =>{
        return(
            [
      { primary: true, type: 'ordinal', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ]
        )
    }


    render() {
        return (
            <div>
                <center><img src="logo.png" alt="monolog" /></center>
                <VideoFeed/>
                <Emotions emotions={this.state.emotions} />
                <Graph emotions={this.state.emotionObject} />
            </div>
        )
    }

    componentDidMount() {
        axios.get('/get/video-emotions').then( (res =>{
            const emotion_data = res['data']['emotions']
            let emotion_list = []
            for(const [key, value] of Object.entries(emotion_data)){
                emotion_list.push({'emotion': key, 'value': value})
            }
            this.setState({emotions: emotion_list});
            this.setState({emotionObject: Object.keys(emotion_data)})
            console.log(this.state)
        }))
    }
}

export default App;