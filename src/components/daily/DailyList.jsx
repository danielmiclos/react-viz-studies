import React from 'react';
import ReactDOM from 'react-dom';
import {dcContext} from "../dcContext";
import * as dc from "dc";
import * as d3 from "d3";
import {print_filter} from '../util/print-filter';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

//
import clsx from 'clsx';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Done from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

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
      fontSize: theme.typography.pxToRem(15),
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
      background: '#333333',
      backgroundColor: '#333333',
      border: `solid 1px red`,
    },
    green  : {
      color: '#00FF33',
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

        console.log('my chart is redraw');
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

  const showList = (conteudo) => {
    return conteudo.map(d => {
      return (
        <ExpansionPanel classes={classes.expansion}>
          <ExpansionPanelSummary
            classes={classes.expansion}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1c-content"
            id="panel1c-header"
          >
            <div className={classes.column}>
              <Typography className={classes.heading}>Diária: {d.daily_name}</Typography>
            </div>
            <div className={classes.column}>
              <Typography className={classes.heading}>Data: {dateParse(d.ChegadaHD)}</Typography>
            </div>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.column}>
              <Typography variant="caption">Cameras</Typography>
            </div>
            <div className={classes.column} >
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
        <div><Typography variant="caption">HD Log Status:</Typography> {d.hd_log_status ? <Done className={classes.green}/> : ''}</div>
        <div><Typography variant="caption">LTO Log Status</Typography> {d.lto_log_status ? <Done className={classes.green}/> : ''}</div>
        <hr/>
      </div>

    ));
  };

  return (
    <div className="dc-table" style={{width: '90%'}}>
      <h2>List</h2>
      {showList(content)}
      <div ref={div} className=""  />
    </div>
  )

};


