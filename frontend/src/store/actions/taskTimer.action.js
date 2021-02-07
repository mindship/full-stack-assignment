import { url } from "../../utils";
import axios from "axios";
export const REGISTER_USER = "REGISTER_USER";
export const REGISTER_ERROR = "REGISTER_ERROR";
export const LOGIN = "LOGIN";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";
export const GET_TASKS = "GET_TASKS";
export const GET_TASKS_ERROR = "GET_TASKS_ERROR";
export const ADD_TASK = "ADD_TASK";
export const REMOVE_TASK = "REMOVE_TASK";
export const registerUser = (user) => {
  return async (dispatch) => {
    const data = {
      name: user.name,
      email: user.email,
      password: user.password,
    };
    try {
      const response = await axios.post(url + "/register", data);
      if (response.data.message) {
        dispatch({
          type: REGISTER_ERROR,
          payload: response.data.message,
        });
        return;
      }
      dispatch({
        type: REGISTER_USER,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_ERROR,
        payload: error.message,
      });
    }
  };
};
export const clearRgister = () => {
  return async (dispatch) => {
    dispatch({
      type: LOGOUT,
      payload: false,
    });
  };
};

export const loginAction = (user) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(url + "/singin", user);
      dispatch({
        type: LOGIN,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_ERROR,
        payload: error.message,
      });
    }
  };
};

export const addTask = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(url + "/task", data);
      dispatch({
        type: ADD_TASK,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADD_TASK,
        payload: error.message,
      });
    }
  };
};

export const getTasks = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(url + `/task/${data.email}`);
      dispatch({
        type: GET_TASKS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: GET_TASKS_ERROR,
        payload: error.message,
      });
    }
  };
};

export const deleteTask = (data) => {
  return async (dispatch, getCurrentState) => {
    try {
      const state = getCurrentState();
      const response = await axios.delete(url + `/task/${data.id}`);
      dispatch({
        type: REMOVE_TASK,
        payload: data.id,
      });
    } catch (error) {
      dispatch({
        type: GET_TASKS_ERROR,
        payload: error.message,
      });
    }
  };
};
