import React, {Component} from 'react';
import Emotions from './Emotions';

class App extends Component {
    
    state = {
        emotions: []
    };

    render() {
        return (
            <Emotions emotions={this.state.emotions} />
        )
    }

    componentDidMount() {
        fetch('http://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then((data) => {
          this.setState({ emotions: data })
        })
        .catch(console.log)
    }
}

export default App;