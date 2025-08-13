import type { Task } from "@/components/TaskItem"

export const ACTION_TYPES = {
    ADD_TASK: 'SET_TASK',
    UPDATE_TASK: 'UPDATE_TASK',
    REMOVE_TASK: 'REMOVE_TASK'
} as const


export type ACTION_TYPES_TYPE = typeof ACTION_TYPES[keyof typeof ACTION_TYPES]

export type STATE_TYPE = {
    tasks: Task[]
}
