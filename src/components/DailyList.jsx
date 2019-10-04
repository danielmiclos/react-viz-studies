import React from 'react';
import { dcContext, deContext } from './dcContext';
import * as dc from 'dc';
import * as d3 from 'd3';
import { Theme, createStyles, makeStyles } from "@material-ui/core";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

import SvgIcon from '@material-ui/core/SvgIcon';
import Done from '../icons/Done.svg';
import InProgress from '../icons/InProgress.svg';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      background: '#333',
      backgroundColor: '#333'
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
      fonstSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    icon: {
      verticalAlign: 'bottom',
      height: 20,
      width: 20,
    },
    details: {
      alignItems: 'center',
    },
    column: {
      flexBasis: '33.33%',
    },
    helper: {
      borderLeft: `2px solid ${theme.palette.divider}`,
      padding: theme.spacing(1, 2),
    },
    link: {
      color: theme.palette.primary.main,
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      },
    },
    expansion: {
      background: '#333',
      backgroundColor: '#333',
    },
    green : {
      color: '#00FF33',
    },
    yellow: {
      color: '#eed367',
    },
    iconImg: {
      width: 20,
      height: 20,
      display: 'inline-block',
      verticalAlign: 'bottom'
    }
  }),
);

export const DailyList = (props) => {
  const classes = useStyles();

  const context = React.useContext(dcContext);
  const [chart, updateChart] = React.useState(null);
  const [content, setContent] = React.useState([]);
  const dailies = context.dailies;
  const div = React.useRef(null);

  const dateParse = d3.timeFormat("%d/%m/%Y");

  React.useEffect(() => {
    const newChart = makeGridList(div.current, dailies);
    newChart.render();
    updateChart(newChart);
  }, 1);

  const makeGridList = (divRef, datum) => {
    const dateParse = d3.timeFormat("%d/%m/%Y");
    const dateDimension = datum.dimension(d => d.ChegadaHD);

    const gridList = (parent) => {
      const chart = {};

      chart.render = () => {
        console.log('my chart is rendering');
        const dataList = dateDimension.top(Infinity);
        if(content !== dataList) {
          setContent(dateDimension.top(Infinity));
        }

        return chart;
      };

      chart.redraw = () => {
        console.log('my chart is redrawing');
        const dataList = dateDimension.top(Infinity);
        if(content !== dataList) {
          setContent(dateDimension.top(Infinity));
        }
        return chart;
      };
      return chart;
    }

    const testGrid = gridList(divRef);

    const rChart = dc.chartRegistry;

    rChart.register(testGrid);

    return testGrid;
  };

  const logStatus = (ar, key) => {
    let acc = undefined;

    ar.forEach((item) => {
      acc = acc === undefined ? item[key] : acc && item[key];
    });

    return acc;

  };

  const showList = (conteudo) => {
    return conteudo.map(d => {
      logStatus(d.cameras, 'hd_log_status');

      return (
        <ExpansionPanel className={classes.expansion}>
          <ExpansionPanelSummary
            classes={classes.expansion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content" >
          <Grid container>
            <Grid className={classes.column} md={3}>
              <Typography className={classes.heading}>Diária: {d.daily_name}</Typography>
            </Grid>
            <Grid className={classes.column} md={3}>
              <Typography className={classes.heading}>Data: {dateParse(d.ChegadaHD)}</Typography>
            </Grid>
            <Grid md={3}>
              Logs: HD: {logStatus(d.cameras, 'hd_log_status') ? (<img src={Done} className={classes.iconImg}/>) : (<img src={InProgress} className={classes.iconImg}/>)} |
              LTO: {logStatus(d.cameras, 'lto_log_status') ? (<img src={Done} className={classes.iconImg}/>) : (<img src={InProgress} className={classes.iconImg}/>)}
            </Grid>
          </Grid>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column}>
              <Typography variant="caption">Cameras</Typography>
            </div>
            <div className={classes.column}>
              {listCameras(d.cameras)}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      )

    });
  };

  const listCameras = (cameras) => {
    return cameras.map((d) => (
      <div>
        <div><Typography variant="caption">Camera id:</Typography> {d.camera_id}</div>
        <div><Typography variant="caption">Data length:</Typography> {d.data_length}{d.data_length_unit}</div>
        <div><Typography variant="caption">Media duration</Typography> {d.media_duration}</div>
        <div><Typography variant="caption">First Copy:</Typography> {d.first_copy}</div>
        <div><Typography variant="caption">Second Copy:</Typography> {d.second_copy}</div>
        <div><Typography variant="caption">Media Volume:</Typography> {d.media_volume}</div>
        <div><Typography variant="caption">HD Log Status:</Typography> {d.hd_log_status ? (<img src={Done} className={classes.iconImg}/>) : (<img src={InProgress} className={classes.iconImg}/>)}</div>
        <div><Typography variant="caption">LTO Log Status</Typography> {d.lto_log_status ? (<img src={Done} className={classes.iconImg}/>) : (<img src={InProgress} className={classes.iconImg}/>)}</div>
        <hr/>
      </div>

    ));
  };

  return (
    <div className="dc-table" style={{width: '90%'}}>
      <h2>List</h2>
      {showList(content)}
      <div ref={div} className="" />
    </div>
  )

};
