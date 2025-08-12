type TaskButtonProps = {
    onClick: () => void,
    classes: string,
    title: string
}

const TaskButton = ({
    onClick,
    classes,
    title
}: TaskButtonProps) => {
    return(
        <button
            onClick={onClick}
            className={classes}
        >
            {title}
        </button>
    )
}

export default TaskButton;