import React, {Component} from 'react';
import Emotions from './Emotions';
import axios from "axios";

class App extends Component {
    
    state = {
        emotions: []
    };

    render() {
        return (
            <div>
                <center><h1>monolog</h1></center>
                <Emotions emotions={this.state.emotions} />
                {/* insert graphs here */}
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
        }))
    }
}

export default App;