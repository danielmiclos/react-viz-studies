import React, { Component } from 'react';
import './App.css';
import { SelectJob } from "./components/selectJob";
import { DataContext } from "./components/dcContext";
import { TableJobs } from "./components/TableJobs";
import { LineChartJobs } from "./components/LineChartJobs";
import { BarChartJobs } from "./components/BarChartVol";
import { PiePerMonth } from "./components/PiePerMonth";


class App extends Component {

  render() {
    return (
      <div className="App">
        <DataContext>
          <SelectJob/>
          <LineChartJobs/>
          <BarChartJobs/>
          <PiePerMonth/>
          <TableJobs/>
        </DataContext>
      </div>
    );
  }
}

export default App;
