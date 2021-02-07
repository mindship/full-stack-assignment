import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Task from "./task";
import { addTask, getTasks, deleteTask } from "../store/actions";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import Card from "@material-ui/core/Card";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    textAlign: "center",
    alignContent: "center",
  },
  create: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    maxWidth: "500px",
    minWidth: "300px",
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
    margin: "16px auto",
  },
  input: {
    margin: "8px",
  },
  menuButton: {
    margin: "16px",
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Main(props) {
  const classes = useStyles();
  const history = useHistory();
  const { addTask, user, tasks, getTasks, login, deleteTask, taskDb } = props;
  const [data, setData] = useState({ title: "", note: "" });
  const [runingTask, setRuningTask] = useState({ cur: 0, id: "" });
  const [start, setStart] = useState(false);
  const [addTasks, setAddTask] = useState(tasks);
  const [search, setSearch] = useState({ start: "", data: [] });
  const titleHandler = (event) => {
    setData({ ...data, title: event.target.value });
  };
  const noteHandler = (event) => {
    setData({ ...data, note: event.target.value });
  };
  const searchHandler = (event) => {
    const data = event.target.value;
    const filtered = tasks.filter((task) => task.title.includes(data));
    setSearch({ start: data, data: filtered });
  };
  const addTaskHandler = () => {
    const task = {
      title: data.title,
      note: data.note,
      userEmail: user.email,
    };
    addTask(task);
    setData({ title: "", note: "" });
  };
  if (start && tasks[runingTask.cur + 1]) {
    setInterval(() => {
      setRuningTask({
        ...runingTask,
        cur: runingTask.cur + 1,
        id: tasks[runingTask.cur + 1]._id,
      });
    }, 1000 * 60 * 2);
  }
  useEffect(() => {
    if (login) {
      getTasks({ email: user.email });
    } else {
      history.push("/");
    }
  }, [getTasks]);
  const startHandler = () => {
    setRuningTask({ ...runingTask, id: tasks[runingTask.cur]._id });
    setStart(true);
  };
  const refereshHandler = () => {
    getTasks({ email: user.email });
  };

  return (
    <div>
      <Card className={classes.create}>
        <h4>Create task</h4>
        <TextField
          className={classes.input}
          id="outlined-disabled"
          label="title"
          variant="outlined"
          size="small"
          autoComplete={false}
          value={data.title}
          onChange={(event) => {
            titleHandler(event);
          }}
        />
        <TextField
          className={classes.input}
          id="outlined-disabled"
          label="note"
          variant="outlined"
          size="small"
          autoComplete={false}
          value={data.note}
          onChange={(event) => {
            noteHandler(event);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={addTaskHandler}
          className={classes.menuButton}
        >
          Add task
        </Button>
      </Card>
      <TextField
        className={classes.input}
        id="outlined-disabled"
        // label="Search"
        placeholder="search by title..."
        variant="outlined"
        size="medium"
        autoComplete={false}
        value={search.start}
        onChange={(event) => {
          searchHandler(event);
        }}
      />
      <div>
        <Button
          variant="contained"
          color="primary"
          disabled={!tasks}
          onClick={startHandler}
          className={classes.input}
        >
          Start Tasks
        </Button>
        <Button
          className={classes.input}
          variant="contained"
          color="primary"
          // disabled={!tasks}
          onClick={refereshHandler}
        >
          Refresh
        </Button>
      </div>
      <div className={classes.root}>
        {tasks && search.start === "" ? (
          tasks.map((task, index) => {
            return (
              <Task
                task={task}
                key={index}
                index={index}
                running={runingTask.cur}
                id={runingTask.id}
                deleteTask={deleteTask}
              />
            );
          })
        ) : search.data.length ? (
          search.data.map((task, index) => {
            return (
              <Task
                task={task}
                key={index}
                index={index}
                running={runingTask.cur}
                id={runingTask.id}
                deleteTask={deleteTask}
              />
            );
          })
        ) : (
          <Typography>Nothing to show...</Typography>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tasks: state.tasks,
    user: state.user,
    login: state.login,
    taskDb: state.taskDb,
  };
};
const mapActionToProps = (dispatch) => {
  return bindActionCreators(
    {
      addTask,
      getTasks,
      deleteTask,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapActionToProps)(Main);
