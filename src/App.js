import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as crossfilter from 'crossfilter2';
import dc from 'dc';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {data:[]};
  }

  componentDidMount() {
    fetch("./data/dailies.json")
      .then(res => res.json())
      .then(
        (result) => {
          console.log('success');
          //console.log(result);
          this.setState({data: result});
          this.makeData(result);
        },
        (error) => {
          console.log('something went wrong');
          console.log(error);
        }
      )
  }

  makeData = (data) => {
      const  dailies = crossfilter(data);

      const jobDimension = dailies.dimension(d => d.job_name);
      const jobGroup = jobDimension.group();

      const dayDimension = dailies.dimension(d => d.daily_date);
      const dayGroup = dayDimension.group();

      const dataLenghtDimension = dailies.dimension(d => d.data_length);

      console.log(jobDimension.filterAll().top(Infinity));
      console.log(jobGroup.top(Infinity));

      const menu = dc.selectMenu(this.menu)
        .dimension(jobDimension)
        .group(jobGroup);



      dc.renderAll();
  };


  render() {
    return (
      <div className="App">
       <h1>{React.version}</h1>
        <div className="list" ref={(ref) => this.menu = ref}>
          <h2>Menu</h2>
        </div>
        <div ref={(ref) => this.barDiarias = ref}>
          <h2>Diarias</h2>
        </div>
      </div>
    );
  }
}

export default App;
