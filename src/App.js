import React, { Component } from 'react';
import './App.scss';
import { DataContext, dcContext } from "./components/dcContext";
import { InfoContext, infoContext } from "./components/projectInfoContext";

import { DiariasBars } from './components/daily/diariasBars';
import { SizeByDate } from './components/daily/sizeByDateLineChart';
import { NumberTotalDisplay } from './components/daily/numberTotalDisplay';
import { BackupStatusPie } from './components/daily/backupStatusPie';
import {TableDiaria} from "./components/daily/tableDiarias";
import { LineChartJobs } from "./components/LineChartJobs";
import { ComposedDailyData } from "./components/daily/ComposedDailyData";
import { PureD3test } from "./components/daily/PureD3test";


function Header() {

  const context = React.useContext(infoContext);
  const info = context.info;

  const date_s = new Date(info.start_date);
  const date_e = new Date(info.end_date);
  //console.log(date_s);

  const date_start = `${date_s.getFullYear()}/${date_s.getMonth()}/${date_s.getDate()}`;
  const date_end = `${date_e.getFullYear()}/${date_e.getMonth()}/${date_e.getDate()}`;

  return <header>
    <div>
      <h4>Project Name:</h4>
      <h2>{info.full_name}</h2>
    </div>
    <div>
      <h4>Job ID:</h4>
      <h2>{info.id_srv}</h2>
    </div>
    <div>
      <h4>Start Date:</h4>
      <h2>{date_start}</h2>
    </div>
    <div>
      <h4>End Date:</h4>
      <h2>{date_end}</h2>
    </div>
  </header>;
}

class App extends Component {

  render() {
    return (
      <div className="App">
        <DataContext>
          <InfoContext>
            <Header/>
          </InfoContext>
          <div className="graphs">
            <div className="diariasbars">
              <div className="graph">
                <DiariasBars/>
              </div>
            </div>
            <div className="sizebydate">
              <div className="graph">
                <ComposedDailyData/>
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
