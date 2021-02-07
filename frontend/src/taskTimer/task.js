import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import StopIcon from "@material-ui/icons/Stop";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import Tooltip from "@material-ui/core/Tooltip";
import CancelIcon from "@material-ui/icons/Cancel";
import Conformation from "./conformation";
import Timer from "react-compound-timer";
import PausePresentationIcon from "@material-ui/icons/PausePresentation";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 325,
    margin: "16px",
  },
  run: {
    minWidth: 275,
    maxWidth: 325,
    margin: "16px",
    backgroundColor: "red",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  first: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
  },
  timer: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Task(props) {
  const classes = useStyles();
  const [conform, setConform] = useState(false);
  const { task, index, running, id, deleteTask } = props;

  return (
    <Card
      className={
        running === index && task._id ===id ? classes.run : classes.root
      }
    >
      {conform && (
        <Conformation
          setConform={setConform}
          open={conform}
          deleteTask={deleteTask}
          id={task._id}
        />
      )}
      <div className={classes.first}>
        <Typography>{index + 1}</Typography>
        <Typography
          // className={classes.title}
          component="h1"
          color="textPrimary"
        >
          {task.title}
        </Typography>
        <Button onClick={() => setConform(true)}>
          <CancelIcon />
        </Button>
      </div>
      <CardContent>
        <Typography color="textPrimary">{task.note}</Typography>
      </CardContent>
      <CardActions>
        {task._id === id && (
          <Timer initialTime={1000 * 60 * 2} direction="backward">
            {({ start, resume, pause, stop, reset, timerState }) => (
              <div className={classes.timer}>
                <div>
                  {/* <Timer.Days /> days */}
                  {/* <Timer.Hours /> hours */}
                  <Timer.Minutes /> minutes
                  <Timer.Seconds /> seconds
                  {/* <Timer.Milliseconds /> milliseconds */}
                </div>
                {/* <div>{timerState}</div> */}
                <br />
                <div className={classes.buttons}>
                  <Tooltip title="play">
                    <Button size="small" onClick={start}>
                      <PlayArrowIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="pause">
                    <Button size="small" onClick={pause}>
                      <PauseIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="resume">
                    <Button size="small" onClick={resume}>
                      <PausePresentationIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="stop">
                    <Button size="small" onClick={stop}>
                      <StopIcon />
                    </Button>
                  </Tooltip>
                  <Tooltip title="reset">
                    <Button size="small" onClick={reset}>
                      <RotateLeftIcon />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            )}
          </Timer>
        )}
      </CardActions>
      <Typography variant="body2" component="p">
        Created At {task.createdAt}
      </Typography>
    </Card>
  );
}
