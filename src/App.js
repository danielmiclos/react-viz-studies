import React, { Component } from 'react';
import './App.scss';
import { DataContext } from "./components/dcContext";
import { DiariasBars } from './components/daily/diariasBars';
import { SizeByDate } from './components/daily/sizeByDateLineChart';
import { NumberTotalDisplay } from './components/daily/numberTotalDisplay';
import { BackupStatusPie } from './components/daily/backupStatusPie';
import {TableDiaria} from "./components/daily/tableDiarias";


class App extends Component {

  render() {
    return (
      <div className="App">
        <h1>Dashboard</h1>
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
        </DataContext>
      </div>
    );
  }
}

export default App;
