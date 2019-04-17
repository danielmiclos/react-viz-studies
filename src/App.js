import React, { Component } from 'react';
import './App.scss';
import { DataContext } from "./components/dcContext";
import { DiariasBars } from './components/daily/diariasBars';
import { SizeByDate } from './components/daily/sizeByDateLineChart';
import { NumberTotalDisplay } from './components/daily/numberTotalDisplay';
import { BackupStatusPie } from './components/daily/backupStatusPie';



class App extends Component {

  render() {
    return (
      <div className="App">
        <DataContext>
          <DiariasBars/>
          <SizeByDate/>
          <NumberTotalDisplay/>
          <BackupStatusPie/>
        </DataContext>
      </div>
    );
  }
}

export default App;
