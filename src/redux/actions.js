export const SET_TASKS = "SET_TASKS";
export const SET_TASKS_ID = "SET_TASKS_ID";

export const setTasks = tasks => dispatch => {
    dispatch({
        type: SET_TASKS,
        payload: tasks,
    })
}

export const setTasksID = tasksID => dispatch => {
    dispatch({
        type: SET_TASKS_ID,
        payload: tasksID,
    })
}