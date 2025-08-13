import type { Task } from "@/components/TaskItem";
import { ACTION_TYPES } from "./types";

export const addTask = (task: Task) => ({
    type: ACTION_TYPES.ADD_TASK,
    payload: task
})

export const updateTask = (task: Task) => ({
    type: ACTION_TYPES.UPDATE_TASK,
    payload: task
})

export const removeTask = (id: Task[`id`]) => ({
    type: ACTION_TYPES.REMOVE_TASK,
    payload: id
})

export type CREATED_ACTIONS_TYPE = 
    | ReturnType<typeof addTask>
    | ReturnType<typeof updateTask>
    | ReturnType<typeof removeTask>