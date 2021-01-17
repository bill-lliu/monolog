import React, { Component } from 'react';
import Contacts from './components/contacts.js';

    class App extends Component {
        state = {
            contacts: []
        }

        // componentDidMount() {
        //     this.interval = setInterval(() => 
        //     fetch('/test')
        //     .then(res => res.json())
        //     .then((data) => this.setState({ contacts: data }), 1000)
        //     .catch(console.log)
        //     );
            
        // }
        // componentWillUnmount() {
        //     clearInterval(this.interval);
        // }

        componentDidMount() {
            fetch('http://localhost:5555/test')
            .then(res => res.json())
            .then((data) => {
              this.setState({ contacts: data })
            })
            .catch(console.log)
        }

        render() {
            return (
              <Contacts contacts={this.state.contacts} />
            )
          }
    }

    export default App;