const TaskNew = () => {
    return(
        <form>
            <div>
                <label htmlFor="title">
                    Title
                </label>
                <input name="title" id="title" type="text" />
                <div>
                    Error
                </div>
            </div>
            <div>
                <label htmlFor="description">
                    Description
                </label>
                <textarea name="description" id="description">

                </textarea>
            </div>
            <div>
                Error
            </div>
            <button type="submit">
                Add
            </button>
        </form>
    )
}

export default TaskNew