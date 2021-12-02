import { SET_TASKS, SET_TASKS_ID } from './actions'

const initialState = {
  tasks: [],
  tasksID: 1
}

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: action.payload }
    case SET_TASKS_ID:
      return { ...state, tasksID: action.payload}
    default:
      return state
  }
}

export default taskReducer
