import React, { Component } from 'react';
import './App.scss';
import { SelectJob } from "./components/selectJob";
import { DataContext } from "./components/dcContext";
import { TableJobs } from "./components/TableJobs";
import { LineChartJobs } from "./components/LineChartJobs";
import { BarChartJobs } from "./components/BarChartVol";
import { PiePerMonth } from "./components/PiePerMonth";
import TableDailies from "./components/TableDailies";
import { Sandbox } from "./components/Sandbox";


class App extends Component {

  render() {
    return (
      <div className="App">
        <DataContext>
          <SelectJob/>
          <LineChartJobs/>
          <BarChartJobs/>
          <div id="dailies">
          </div>
          <table>
          <TableJobs/>
          </table>
        </DataContext>
      </div>
    );
  }
}

export default App;
