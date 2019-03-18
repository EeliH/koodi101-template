/******** DO NOT DELETE THESE LINES ********/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

var moment = require('moment');

import './assets/stylesheets/style.css';

const baseURL = process.env.ENDPOINT;

/****** ADD YOUR CODE AFTER THIS LINE ******/

const getGreetingFromBackend = async () => {
  try {
    const url = `${baseURL}/api/temperature`;
    console.log("Getting data from " + url);
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.error(error);
  }
  return {greetings: "Greetings, traveller!"};
};

const InfoBox = (props) => (
  <table>
    <tbody>
      <tr>
        <td>Timestamp</td>
        <td>Temperature</td>
        <td>Humidity</td>
      </tr>
      {props.data.map(entry => 
      <tr key={entry.id}>
        <td>
          {moment(entry.timestamp).fromNow()}
        </td>
        <td>
          {entry.temperature}
        </td>
        <td>
          {entry.humidity}
        </td>
      </tr>
      )}
    </tbody>
  </table>
);

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  async componentWillMount() {
    const response = await getGreetingFromBackend();
    console.log(response);
    const entries = response["results"];
    console.log(entries);

    this.setState({data: entries});
  }

  render() {
    return (
      <InfoBox data={this.state.data} />
    );
  }
}

/****** DO NOT DELETE AFTER THIS LINE ******/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
