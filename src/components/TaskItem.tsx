import { useRef } from "react"

export type Task = {
    id: string,
    title: string,
    description: string,
    complete: boolean,
}

type TaskProps = {
    task: Task,
    isEditing: boolean,  
    onChange: (id: string, description: string) => void,
    onEdit: (id: string) => void,
    onCancel: (id: string) => void,
    onSave: (id: string) => void,
} 

const TaskItem = ({
    task,    
    onChange,
    onEdit,
    onCancel,
    onSave,
}: TaskProps) => {
    const descriptionElement = useRef<HTMLDivElement | null>(null)
    return(
        <article>
            <div>
                <h3>
                    {task.title}
                </h3>
                <button type="button">
                    Complete
                </button>
            </div>
            <div
                ref={descriptionElement}
                contentEditable="false"
            >
                {task.description}
            </div>
            <div>
                <div>

                </div>
                <button type="submit">
                    Delete
                </button>

                <button type="submit">
                    Edit/Save
                </button>
            </div>
        </article>
    )
}

export default TaskItem