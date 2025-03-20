import React, { useEffect, useState } from 'react'
import styles from './UserTasksTable.module.css'
import { useNavigate } from 'react-router-dom'
import { GetTasksApi, DeleteTaskApi } from '../../services'

const UserTasksTable = ({ setEditTask, projectId }) => {

    const [allTasks, setAllTasks] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchAllTasksData()
    }, [])
    
    const fetchAllTasksData = async () => {
        const response = await GetTasksApi()
        if (response?.status === 200) {
            const filteredTasks = response?.data?.filter(task => task.project === projectId);
        setAllTasks(filteredTasks);
        } else {
            console.log("error in fetching the tasks data")
        }
    }
    console.log(allTasks, "all task");

    const handleAddTask = () => {
        setEditTask("")
        navigate("/userTaskForm")
    }

    const handleEditTask = async (task) => {
        try {
            setEditTask(task)
            navigate("/userTaskForm")
        } catch (error) {
            console.error("edited task error", error)
        }
    }

    const handleDeleteTask = async (taskId) => {
        try {
            const response = await DeleteTaskApi(taskId)
            if (response?.status === 200) {
                alert("Task Deleted successfully")
                fetchAllTasksData()
            } else {
                console.error("delete task api error", response?.data?.msg || "unknown error")
            }
        } catch (error) {
            console.error("delete task api error", error)
        }
    }

    return (
        <div className={styles.container}>
            <button className={styles.addTaskButton} onClick={handleAddTask}>Add Task</button>
            <table className={styles.taskTable}>
                <thead>
                    <tr>
                        <th>no.</th>
                        <th>task</th>
                        <th>status</th>
                        <th>task details</th>
                        <th>remark</th>
                        <th>action</th>
                    </tr>
                </thead>
                <tbody>
                    {allTasks.length > 0 ? (allTasks.map((item, index) => (
                        <tr key={item._id}>
                            <td>{index + 1}</td>
                            <td>{item.taskName}</td>
                            <td>{item.status}</td>
                            <td>{item.taskDetails}</td>
                            <td>{item.remark}</td>
                            <td>
                                <button className={styles.editButton} onClick={() => handleEditTask(item)}>Edit</button>
                                <button className={styles.deleteButton} onClick={() => handleDeleteTask(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))) : (
                        <tr>
                            <td>No tasks added !</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default UserTasksTable