import React, { useState } from "react";

// import components
import TaskQueue from "./components/TaskQueue";

// import CSS
import "./style.css";

function App() {
    let taskData = JSON.parse(localStorage.getItem("taskList"));

    const [inputValue, setInputValue] = useState("");
    const [assignTo, setAssignTo] = useState("Atul");
    const [task, setTask] = useState(taskData || []);
    const [file, setFile] = useState(null);
    const [search, setSearch] = useState("");
    const [filterData, setFilterData] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Handle inputValue Change function
    const handleInputValue = (e) => {
        setInputValue(e.target.value);
    };

    //  Handle AssignTo Change function
    const handleAssignTo = (e) => {
        setAssignTo(e.target.value);
    };

    // Handle Submit Function
    const handleSubmit = (inputValue, assignTo, file) => {
        if (!inputValue.trim()) {
            alert("type task name ");
            return;
        }
        if (!assignTo.trim()) {
            alert("type Assigning name ");
            return;
        }
        setTask([
            ...task,
            {
                id: Date.now(),
                content: inputValue,
                status: "start",
                assignee: assignTo,
                attachment: file,
                bgColor: "orange",
            },
        ]);
        setInputValue("");
        setAssignTo("Atul");
        // console.log(task);
        localStorage.setItem("taskList", JSON.stringify(task));
    };

    // DragOver
    const dragEnd = (e) => {
        // console.log("drag over");
        e.preventDefault();
    };

    // Drag Drop Function
    let count = 0;
    const dragDrop = (e, newStatus, color) => {
        count++;
        // console.log("drop");
        let transferredData = e.dataTransfer.getData("todoId");
        // console.log(transferredData, "transferData");
        let newData = task.filter((el) => {
            if (String(el.id) === transferredData) {
                el.status = newStatus;
                el.bgColor = color;
                return el;
            }
        });

        setTask([...task, newData]);
        localStorage.setItem("taskList", JSON.stringify(task));

        count > 0 ? alert("Sure to change status ?") : (count = 0);
    };

    // Attachment Function
    const handleAttachment = (e) => {
        setFile(e.target.files[0]);
    };

    // Handle Search Function
    const handleSearch = (e) => {
        e.preventDefault();
        const searchData = task.filter((el) => el.content === search);
        if (searchData) {
            setIsLoading(true);
            setTimeout(() => {
                searchData && setFilterData(searchData);
                setIsLoading(false);
            }, 500);
        }
        setSearch("")
    };

    return (
        <>
            <div className="navbar">
                <div className="navbar__task">
                    <label>Task </label>
                    <input
                        value={ inputValue }
                        onChange={ handleInputValue }
                        type="text"
                        placeholder="Enter Task"
                    />
                    <label>Assignee </label>
                    <input
                        type="text"
                        value={ assignTo }
                        placeholder="Enter Assignee name"
                        onChange={ handleAssignTo }
                    />
                    <label>Attachment </label>
                    <input
                        type="file"
                        id="fileName"
                        onChange={ (e) => handleAttachment(e) }
                    />
                    <button
                        onClick={ () => {
                            if (inputValue.length > 0) {
                                handleSubmit(inputValue, assignTo, file);
                            }
                        } }
                    >
                        Add
                    </button>
                </div>
                <form className="navbar__search" onSubmit={ handleSearch }>
                    <span style={ { fontWeight: 500 } }>Search </span>
                    <input
                        placeholder="Search task"
                        onChange={ (e) => setSearch(e.target.value) }
                    />
                    <button type='submit' >Search</button>
                </form>
            </div>

            <div className="container">
                <div className="task-box">
                    <div
                        onDragOver={ (e) => dragEnd(e) }
                        onDrop={ (e) => dragDrop(e, "start", "orange") }
                        className="start"
                    >
                        <span>
                            <h3 style={ { marginTop: "10px" } }>Todo Task</h3>
                            <br></br>
                            <hr />
                        </span>
                        { task.length > 0 &&
                            task.map((el, idx) => (
                                <div style={ { backgroundColor: el.bgColor } } key={ idx }>
                                    { el.status === "start" && <TaskQueue task={ el } /> }
                                </div>
                            )) }
                    </div>
                    <div
                        onDragOver={ (e) => dragEnd(e) }
                        onDrop={ (e) => dragDrop(e, "wip", "yellow") }
                        className="wip"
                    >
                        <span>
                            <h3 style={ { marginTop: "10px" } }> Task in progress</h3>
                            <br></br>
                            <hr />
                        </span>
                        { task &&
                            task.map((el, idx) => (
                                <div style={ { backgroundColor: el.bgColor } } key={ idx }>
                                    { el.status === "wip" && <TaskQueue task={ el } /> }
                                </div>
                            )) }
                    </div>
                    <div
                        onDragOver={ (e) => dragEnd(e) }
                        onDrop={ (e) => dragDrop(e, "done", "green") }
                        className="done"
                    >
                        <span>
                            <h3 style={ { marginTop: "10px" } }>Task completed</h3>
                            <br></br>
                            <hr />
                        </span>
                        { task &&
                            task.map((el, idx) => (
                                <div style={ { backgroundColor: el.bgColor } } key={ idx }>
                                    { el.status === "done" && <TaskQueue task={ el } /> }
                                </div>
                            )) }
                    </div>
                </div>
                <div className="search_Box">
                    { isLoading ? (
                        <div>
                            <img
                                src="https://cdn.dribbble.com/users/108183/screenshots/2301400/spinnervlll.gif"
                                width="300px"
                                height="500px"
                                alt="loader"
                            />
                        </div>
                    ) : (
                        filterData.length > 0 && (
                            <div style={ { marginTop: "10px" } }>
                                <br></br>
                                <p>
                                    Task: { "  " }<i>{ filterData.length > 0 && filterData[0].content }</i>
                                </p>
                                <br></br>
                                <p>
                                    Assignee:{ "  " }
                                    <b>{ filterData.length > 0 && filterData[0].assignee }</b>
                                </p>
                            </div>
                        )
                    ) }
                </div>
            </div>
        </>
    );
}

export default App;
