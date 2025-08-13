import type { Task } from "@/components/TaskItem";
import type { CREATED_ACTIONS_TYPE } from "./actions";
import { ACTION_TYPES } from "./types";

export const initialState: {
    tasks: Task[]
} = {
    tasks: []
}

const reducer = (state = initialState, action: CREATED_ACTIONS_TYPE) => {
    switch(action.type) {
        case ACTION_TYPES.ADD_TASK:
            return ({
                ...state,
                tasks: [ ...state.tasks, action.payload],
            })

        case ACTION_TYPES.UPDATE_TASK:
            return ({
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
            })

        case ACTION_TYPES.REMOVE_TASK:
            return ({
                ...state,
                tasks: state.tasks.filter(tasks => tasks.id !== action.payload),
            })

        default: 
            return state;
    }
}

export default reducer