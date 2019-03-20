/******** DO NOT DELETE THESE LINES ********/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalRectSeries,
  VerticalRectSeriesCanvas,
  ChartLabel,
  LineSeries,
  LineSeriesCanvas
} from 'react-vis';

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

const InfoBox = (props) => {
  return (
  <table className="table">
    <thead>
      <tr>
        <td scope="col">ID</td>
        <td scope="col">Time</td>
        <td scope="col">Temperature</td>
        <td scope="col">Humidity</td>
      </tr>
    </thead>
    <tbody>
      {props.data.map(entry => 
      <tr key={entry.id}>
        <th scope="row">
          {entry.id}
        </th>
        <td>
          {moment(entry.timestamp).fromNow()}
        </td>
        <td>
          {entry.temperature}°C
        </td>
        <td>
          {entry.humidity}%
        </td>
      </tr>
      )}
    </tbody>
  </table>

);

}

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
    const {useCanvas} = this.state;
    const RectSeries = useCanvas
      ? VerticalRectSeriesCanvas
      : VerticalRectSeries;

    return (
      <div className="content">
        <XYPlot xDomain={[0, 7]} width={300} height={350} stackBy="y">
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <RectSeries
            data={
              this.state.data.slice(-7).map(entry => {
                // TODO: get this id thing to work my man
                return {x0: entry.id-1, x: entry.id, y: entry.humidity};
              }) 
            }
          />
        </XYPlot>
        <InfoBox data={this.state.data} />
      </div>
    );
  }
}

/****** DO NOT DELETE AFTER THIS LINE ******/

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
