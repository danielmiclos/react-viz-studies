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


class App extends Component {

  render() {
    return (
      <div className="App">
        <DataContext>
          <div className="graphs">
            <div className="diariasbars">
              <div className="graph">
                <DiariasBars/>
              </div>
            </div>
            <div className="sizebydate">
              <div className="graph">
              <SizeByDate/>
              </div>
            </div>

            <div className="databydate">
              <div className="graph">
                <LineChartJobs/>
              </div>
            </div>
            <div className="minidata">
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

          <div className="sizebydate">
            <div className="graph">
              <ComposedDailyData />
            </div>
          </div>

        </DataContext>
      </div>
    );
  }
}

export default App;
