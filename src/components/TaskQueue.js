/*

*/

const TaskQueue = ({ task }) => {
    const dragStart = (e, id) => {
        e.dataTransfer.setData("todoId", id);
        // console.log("🚀 id", id)

    };

    const dragEnd = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            key={ task.id }
            draggable={ true }
            onDragStart={ (e) => dragStart(e, task.id) }
            // onDragOver={ dragEnd }
            style={ { height: "25px", margin: "5px", } }

        >
            <p style={ { marginTop: "-2px", } }>{ task.content }</p>
        </div>
    );
};

export default TaskQueue;