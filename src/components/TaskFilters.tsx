export const FILTER = {
    ALL: 'ALL',
    COMPLETE: 'COMPLETE',
    IN_PROGRESS: 'IN_PROGRESS'
} as const

export type FILTER_TYPE = typeof FILTER[keyof typeof FILTER]

const TaskFiltres = () => {
    return(
        <ul>
            <li>
                Все
            </li>
            <li>
                Незавершенные
            </li>
            <li>
                Завершенные
            </li>
        </ul>
    )
}

export default TaskFiltres;