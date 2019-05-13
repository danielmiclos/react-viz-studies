import React, { Component } from 'react';
import './App.scss';
import { DataContext } from "./components/dcContext";
import { DiariasBars } from './components/daily/diariasBars';
import { SizeByDate } from './components/daily/sizeByDateLineChart';
import { NumberTotalDisplay } from './components/daily/numberTotalDisplay';
import { BackupStatusPie } from './components/daily/backupStatusPie';
import {TableDiaria} from "./components/daily/tableDiarias";
import { LineChartJobs } from "./components/LineChartJobs";
import { ComposedDailyData } from "./components/daily/ComposedDailyData";
import { PureD3test } from "./components/daily/PureD3test";


class App extends Component {

  render() {
    return (
      <div className="App">
        <DataContext>
          <header>
            <div>
              <h4>Project Name:</h4>
              <h2>PSI 4</h2>
            </div>
            <div>
              <h4>Job ID:</h4>
              <h2>J_POS_0000538</h2>
            </div>
            <div>
              <h4>Start Date:</h4>
              <h2>2018-05-15</h2>
            </div>
            <div>
              <h4>End Date:</h4>
              <h2>2018-08-31</h2>
            </div>
          </header>
          <div className="graphs">
            <div className="diariasbars">
              <div className="graph">
                <DiariasBars/>
              </div>
            </div>
            <div className="sizebydate">
              <div className="graph">
                <ComposedDailyData />
              </div>
            </div>

            {/*<div className="databydate">*/}
            {/*  <div className="graph">*/}
            {/*    <LineChartJobs/>*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="minidata">
              <div className="graph">
                <PureD3test title="Total Storage"/>
              </div>
              <div className="graph">
                <div className="numberTotal">
                  <NumberTotalDisplay/>
                </div>
              </div>
              <br/>
              <div className="graph">
                <BackupStatusPie/>
              </div>
            </div>

            <div className="tablediarias">
              <div className="graph">
                <TableDiaria/>
              </div>
            </div>

          </div>

          <div className="graph">

          </div>

        </DataContext>
      </div>
    );
  }
}

export default App;
