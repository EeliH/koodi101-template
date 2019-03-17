/******** DO NOT DELETE THESE LINES ********/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './assets/stylesheets/style.css';

const baseURL = process.env.ENDPOINT;

/****** ADD YOUR CODE AFTER THIS LINE ******/

const getGreetingFromBackend = async () => {
  try {
    const url = `${baseURL}/api/temperature`;
    console.log("Getting greeting from "+url);
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return { greeting :"Could not get greeting from backend"};
};


const InfoBox = (props) => (
  <div>
    <p>{props.temp}°C</p>
    <p>{props.hum}%</p>
  </div>
);


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      temp: null,
      hum: null,
    };
  }

  async componentWillMount() {
    const response = await getGreetingFromBackend();
    console.log(response);
    const latestEntry = response["results"].slice(-1)[0];
    this.setState(
      {
        temp: latestEntry["temperature"], 
        hum: latestEntry["humidity"]
      }
    );
  }

  render() {

    return (
      <InfoBox temp={this.state.temp} hum={this.state.hum} />
    );
  }
}

/****** DO NOT DELETE AFTER THIS LINE ******/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
