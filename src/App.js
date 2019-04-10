import React, { Component } from 'react';
import './App.css';
import { SelectJob } from "./components/selectJob";
import { DataContext } from "./components/dcContext";
import { TableJobs } from "./components/TableJobs";
import { BarChartJobs } from "./components/BarChartJobs";


class App extends Component {

  render() {
    return (
      <div className="App">
        <DataContext>
          <SelectJob/>
          <BarChartJobs/>
          <TableJobs/>
        </DataContext>
      </div>
    );
  }
}

export default App;
