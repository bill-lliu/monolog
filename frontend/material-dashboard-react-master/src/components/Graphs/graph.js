import React, {Component} from 'react';
import Chart from 'react-apexcharts'
import axios from 'axios'

class Graph extends Component {

    state = {
        emotionObject: []
    }
    // Props:
    // dates, volume
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: 'volumechart'
                },
                xaxis: {
                    categories: this.state.emotionObject
                },
                stroke: {
                    width: 0,
                    curve: 'smooth'
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        gradientToColors: [ '#24fda9'],
                        shadeIntensity: 1,
                        type: 'horizontal',
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100, 100, 100]
                    },
                },
                title: {
                    text: 'Volume',
                    align: 'left',
                    style: {
                        fontSize: "16px",
                        color: '#666'
                    }
                }
            },
            series: [{
                name: 'volume',
                data: [1,2,3,4, 5, 6, 7]
            }]
        }
    }

    componentDidMount() {
        axios.get('/get/video-emotions').then( (res =>{
            const emotion_data = res['data']['emotions']
            let emotion_list = []
            for(const [key, value] of Object.entries(emotion_data)){
                emotion_list.push({'emotion': key, 'value': value})
            }
            // this.setState({emotions: emotion_list});
            this.setState({emotionObject: Object.keys(emotion_data)})
            console.log(this.state)
        }))
    }

    render() {
        return (
            <div style={{ height: "50%", width: "50%"}}>
                <Chart options={this.state.options} series={this.state.series} type="bar"  />
            </div>
        );
    }
}

export default Graph;