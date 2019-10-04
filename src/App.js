import React, { Component } from 'react';
import './App.scss';
import { DataContext, dcContext } from "./components/dcContext";
import { InfoContext, infoContext } from "./components/projectInfoContext";

import { DiariasBars } from './components/daily/diariasBars';
import { NumberTotalDisplay } from './components/daily/numberTotalDisplay';
import { BackupStatusPie } from './components/daily/backupStatusPie';
import {TableDiaria} from "./components/daily/tableDiarias";
import { ComposedDailyData } from "./components/daily/ComposedDailyData";
import { PureD3test } from "./components/daily/PureD3test";
import CameraPie from "./components/daily/CameraPie";

import { DailyList } from './components/DailyList';

import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import {makeStyles, createStyles, Theme} from '@material-ui/core';
import createTheme from './createTheme';


const useStyle = makeStyles((theme) => createStyles({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing(3)
  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  button: {
    margin: theme.spacing(1),
  },
  displayFlex: {
    display: 'flex'
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  container: {
    padding: theme.spacing(3)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  textMultiline: {
    minHeight: '30vh'
  }
}));

function Header() {

  const classes = useStyle();

  const context =  React.useContext(infoContext);
  const info =  context.info;

  let date_start = "";
  let date_end = "";

  if(info !== undefined) {

    const date_s = new Date(info.start_date);
    const date_e = new Date(info.end_date);

    date_start = `${date_s.getFullYear()}/${date_s.getMonth()}/${date_s.getDate()}`;
    date_end = `${date_e.getFullYear()}/${date_e.getMonth()}/${date_e.getDate()}`;
  }

  return (
    <Grid container xs={12} lg={10} className={classes.root}>
      <Grid item lg={3} sm={6}>
        <Typography variant='h5'>Project Name:</Typography>
        <Typography variant='h4'>{info.full_name || ""}</Typography>
      </Grid>
      <Grid item lg={3} sm={6}>
        <Typography variant='h5'>Job ID:</Typography>
        <Typography variant='h4'>{info.id_srv || ""}</Typography>
      </Grid>
      <Grid item lg={3} sm={6}>
        <Typography variant='h5'>Start Date:</Typography>
        <Typography variant='h4'>{date_start || ""}</Typography>
      </Grid>
      <Grid item lg={3} sm={6}>
        <Typography variant='h5'>End Date:</Typography>
        <Typography variant='h4'>{date_end || ""}</Typography>
      </Grid>
      <Grid item lg={6}>
        <Typography variant='caption'>Produtor executivo: <strong>{info.executive_producer || ""}</strong><br/>
          Produtora : <strong>{info.producer || ""}</strong>
        </Typography>
      </Grid>
      <Grid item lg={6}>
        <Typography variant='caption'><strong>Cameras:</strong><br/>
          A: <strong>{info.a_camera_model[0]}</strong><br/>
          B: <strong>{info.b_camera_model[0]}</strong>
        </Typography>
      </Grid>
    </Grid>
  );
}

export default function App() {
  // const [dailyDetails, setDailyDetails] = React.useContext<{}>();

  const classes = useStyle();

  return(
    <>
      <ThemeProvider theme={createTheme}>
        <CssBaseline/>
          <DataContext token="00651826-3cba-11e6-b303-06d697bf810e">
            <InfoContext token="cbb7c109-bbc8-4a7d-b7be-6d4c8841cde3">
              <Header/>
            </InfoContext>
            <Grid container md={11} className={classes.root}>
              <Grid item md={12}>
                <DiariasBars/>
              </Grid>
              <Grid item md={12}>
                <ComposedDailyData/>
              </Grid>

              <Grid item md={12}>
                <DailyList />
              </Grid>
            </Grid>
          </DataContext>
      </ThemeProvider>
    </>
  );
}
