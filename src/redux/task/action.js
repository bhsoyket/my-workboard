import {
  CREATE_TASK,
  GET_USER_TASKS,
  UPDATE_TASK,
  ALL_TASK,
  GET_TASK
} from "./action-types";
import axios from "axios";

export const createTaskActionCreator = task => {  
  return async dispatch => {
    await axios({
      method: "POST",
      url: `/works`,
      baseURL: `http://192.168.1.5:7000`,
      data: task,
      headers: {
        authorization:
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGIzY2YzZTMwYzk1OTAwMTJmZWVmMjciLCJwaG9uZSI6IjE4Mjc0NTM5MDYiLCJyb2xlIjoibWFuYWdlbWVudCIsInR0bCI6MTgwMDAwMCwiaWF0IjoxNTcyMDY1MzM4fQ.I9LPCud5s2dOVGnfeqcXLlxHgWxwkJFaX5JwYsAWPceHCY2WG0_8-JwPt_jkdmJnUk6lUkkvbsaDkbwLPQsAc5y438_yH54gn0SMP9ToR8b9zdGX8vswMFGJRMxEuBQ1DW-fJt6rv5bKOoO2HlsXY2EKwjQHrtKXzJcdMt5FNt_6TkDynQI0aOl4x--ugTZOb7YBkALTnkVBhY5n6vbwa85S7fy1aRdnFcZvgIXYJm_sikVaIvUrqFr3q-86guwFikThuQehG5GFTnVdVedMpVy_jPux-zix6kq9KG02TKJIJT0aKmH3U_jHDiYZGfpsHR3mw7xX18lMVto3doDOdA"
      }
    })
    .then(resData => {
      console.log("on Reponse", resData.data.data);
      dispatch({ type: CREATE_TASK, payload: resData.data.data });
    })
    .catch(error => {
      console.error("Error on getting tasks", error.message);
    });

    return task;
  };
};

export const getTaskActionCreator = workId => {
  return async dispatch => {
    const tasks = await axios({
      method: "GET",
      url: `/works/${workId}`,
      baseURL: `http://192.168.1.5:7000`,
      headers: {
        authorization:
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGIzY2YzZTMwYzk1OTAwMTJmZWVmMjciLCJwaG9uZSI6IjE4Mjc0NTM5MDYiLCJyb2xlIjoibWFuYWdlbWVudCIsInR0bCI6MTgwMDAwMCwiaWF0IjoxNTcyMDY1MzM4fQ.I9LPCud5s2dOVGnfeqcXLlxHgWxwkJFaX5JwYsAWPceHCY2WG0_8-JwPt_jkdmJnUk6lUkkvbsaDkbwLPQsAc5y438_yH54gn0SMP9ToR8b9zdGX8vswMFGJRMxEuBQ1DW-fJt6rv5bKOoO2HlsXY2EKwjQHrtKXzJcdMt5FNt_6TkDynQI0aOl4x--ugTZOb7YBkALTnkVBhY5n6vbwa85S7fy1aRdnFcZvgIXYJm_sikVaIvUrqFr3q-86guwFikThuQehG5GFTnVdVedMpVy_jPux-zix6kq9KG02TKJIJT0aKmH3U_jHDiYZGfpsHR3mw7xX18lMVto3doDOdA"
      }
    })
    .then(resData => {
      console.log("on Reponse", resData.data.data);
      dispatch({ type: GET_TASK, payload: resData.data.data });
    })
    .catch(error => {
      console.error("Error on getting tasks", error.message);
    });

    return tasks;
  };
};

export const getUserTasksActionCreator = userId => {
  return async dispatch => {
    const tasks = await axios({
      method: "GET",
      url: `/works/users/${userId}`,
      baseURL: `http://192.168.1.5:7000`,
      headers: {
        authorization:
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGIzY2YzZTMwYzk1OTAwMTJmZWVmMjciLCJwaG9uZSI6IjE4Mjc0NTM5MDYiLCJyb2xlIjoibWFuYWdlbWVudCIsInR0bCI6MTgwMDAwMCwiaWF0IjoxNTcyMDY1MzM4fQ.I9LPCud5s2dOVGnfeqcXLlxHgWxwkJFaX5JwYsAWPceHCY2WG0_8-JwPt_jkdmJnUk6lUkkvbsaDkbwLPQsAc5y438_yH54gn0SMP9ToR8b9zdGX8vswMFGJRMxEuBQ1DW-fJt6rv5bKOoO2HlsXY2EKwjQHrtKXzJcdMt5FNt_6TkDynQI0aOl4x--ugTZOb7YBkALTnkVBhY5n6vbwa85S7fy1aRdnFcZvgIXYJm_sikVaIvUrqFr3q-86guwFikThuQehG5GFTnVdVedMpVy_jPux-zix6kq9KG02TKJIJT0aKmH3U_jHDiYZGfpsHR3mw7xX18lMVto3doDOdA"
      }
    })
      .then(resData => {
        console.log("on Reponse", resData.data.data);
        dispatch({ type: GET_USER_TASKS, payload: resData.data.data });
      })
      .catch(error => {
        console.error("Error on getting tasks", error.message);
      });

    return tasks;
  };
};

export const updateTaskActionCreator = task => {  
  return async dispatch => {
    const { id, ...updatedTask } = task;
    await axios({
      method: "PUT",
      url: `/works/${id}/${task.user.id}`,
      baseURL: `http://192.168.1.5:7000`,
      data: updatedTask,
      headers: {
        authorization:
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGIzY2YzZTMwYzk1OTAwMTJmZWVmMjciLCJwaG9uZSI6IjE4Mjc0NTM5MDYiLCJyb2xlIjoibWFuYWdlbWVudCIsInR0bCI6MTgwMDAwMCwiaWF0IjoxNTcyMDY1MzM4fQ.I9LPCud5s2dOVGnfeqcXLlxHgWxwkJFaX5JwYsAWPceHCY2WG0_8-JwPt_jkdmJnUk6lUkkvbsaDkbwLPQsAc5y438_yH54gn0SMP9ToR8b9zdGX8vswMFGJRMxEuBQ1DW-fJt6rv5bKOoO2HlsXY2EKwjQHrtKXzJcdMt5FNt_6TkDynQI0aOl4x--ugTZOb7YBkALTnkVBhY5n6vbwa85S7fy1aRdnFcZvgIXYJm_sikVaIvUrqFr3q-86guwFikThuQehG5GFTnVdVedMpVy_jPux-zix6kq9KG02TKJIJT0aKmH3U_jHDiYZGfpsHR3mw7xX18lMVto3doDOdA"
      }
    })
    .then(resData => {
      console.log("on Reponse", resData.data.data);
      dispatch({ type: UPDATE_TASK, payload: resData.data.data });
    })
    .catch(error => {
      console.error("Error on getting tasks", error.message);
    });

    return task;
  };
};

export const getAllUserTodayTasksActionCreator = userId => {
  return async dispatch => {
    const tasks = await axios({
      method: "GET",
      url: `/works/users/${userId}`,
      baseURL: `http://192.168.1.5:7000`,
      headers: {
        authorization:
          "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGIzY2YzZTMwYzk1OTAwMTJmZWVmMjciLCJwaG9uZSI6IjE4Mjc0NTM5MDYiLCJyb2xlIjoibWFuYWdlbWVudCIsInR0bCI6MTgwMDAwMCwiaWF0IjoxNTcyMDY1MzM4fQ.I9LPCud5s2dOVGnfeqcXLlxHgWxwkJFaX5JwYsAWPceHCY2WG0_8-JwPt_jkdmJnUk6lUkkvbsaDkbwLPQsAc5y438_yH54gn0SMP9ToR8b9zdGX8vswMFGJRMxEuBQ1DW-fJt6rv5bKOoO2HlsXY2EKwjQHrtKXzJcdMt5FNt_6TkDynQI0aOl4x--ugTZOb7YBkALTnkVBhY5n6vbwa85S7fy1aRdnFcZvgIXYJm_sikVaIvUrqFr3q-86guwFikThuQehG5GFTnVdVedMpVy_jPux-zix6kq9KG02TKJIJT0aKmH3U_jHDiYZGfpsHR3mw7xX18lMVto3doDOdA"
      }
    })
      .then(resData => {
        console.log("on Reponse", resData.data.data);
        dispatch({ type: GET_USER_TASKS, payload: resData.data.data });
      })
      .catch(error => {
        console.error("Error on getting tasks", error.message);
      });

    return tasks;
  };
};
