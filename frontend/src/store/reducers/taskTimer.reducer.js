import * as Actions from "../actions";

const initalState = {
  user: [],
  errorMessage: false,
  login: false,
  tasks: [],
  tasksDb: [],
};

const taskTimer = (state = { initalState }, actions) => {
  switch (actions.type) {
    case Actions.REGISTER_USER:
      let login = false;
      if (actions.payload.data) {
        login = true;
      }
      return {
        ...state,
        user: actions.payload,
        login: login,
        errorMessage: false,
      };
    case Actions.LOGOUT:
      return {
        ...state,
        login: actions.payload,
        errorMessage: false,
      };
    case Actions.LOGIN:
      return {
        ...state,
        login: true,
        user: actions.payload,
        errorMessage: false,
      };
    case Actions.LOGIN_ERROR:
      return {
        ...state,
        login: false,
        errorMessage: true,
      };
    case Actions.REGISTER_ERROR:
      return {
        ...state,
        errorMessage: true,
        login: false,
      };
    case Actions.ADD_TASK:
      let newTasks = state.tasks;
      return {
        ...state,
        tasks: newTasks,
      };
    case Actions.GET_TASKS:
      return {
        ...state,
        errorMessage: false,
        tasksDb: actions.payload.data,
        tasks: actions.payload.data,
      };
    case Actions.REMOVE_TASK:
      newTasks = state.tasks.filter((task) => task._id != actions.payload);
      return {
        ...state,
        tasks: newTasks,
      };
    case Actions.GET_TASKS_ERROR:
      return {
        ...state,
        errorMessage: true,
        // tasks:actions.payload,
      };
    default:
      return state;
  }
};
export default taskTimer;
