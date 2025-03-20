import React, { useEffect, useState } from "react";
import styles from "./UserTasksForm.module.css";
import { useNavigate } from "react-router-dom";
import { AddTasksApi, UpdateTaskApi } from "../../services";

const UserTasksForm = ({ editTask, setTaskData, projectId }) => {

  const [userTaskFormData, setUserTaskFormData] = useState({
    project: projectId,
    taskName: "",
    status: "",
    taskDetails: "",
    remark: ""
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (editTask) {
      setUserTaskFormData(editTask)
    }
  }, [editTask])


  const handleChange = (e) => {
    setUserTaskFormData({
      ...userTaskFormData, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (editTask) {
      const response = await UpdateTaskApi(editTask._id, userTaskFormData);
      if (response?.status === 200) {
        alert("Task updated successfully!");
      }
    } else {
      const response = await AddTasksApi(userTaskFormData);
      if (response?.status === 200) {
        alert("Task added successfully!");
        setTaskData(prevTasks => [...prevTasks, response.data.task]);
      }
    }
    navigate("/userTasksTable");

    setUserTaskFormData({
      taskName: "",
      status: "",
      taskDetails: "",
      remark: "",
    });

  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{editTask ? "Update Task" : "Create a Task"}</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="taskName">Task Name</label>
          <input type="text" id="taskName" name="taskName" placeholder="Enter Task Name" onChange={handleChange} value={userTaskFormData.taskName} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="status">Status</label>
          <select id="status" name="status" onChange={handleChange} value={userTaskFormData.status}>
            <option value="">Choose</option>
            <option value="not-started">Not Started</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="taskDetails">Task Details</label>
          <input type="text" id="taskDetails" name="taskDetails" placeholder="Enter Task Details" onChange={handleChange} value={userTaskFormData.taskDetails} />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="remark">Remark</label>
          <input type="text" id="remark" name="remark" placeholder="Enter Remark" onChange={handleChange} value={userTaskFormData.remark} />
        </div>

        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.submitButton}>{editTask ? "Update" : "Submit"}</button>
        </div>
      </form>
    </div>
  );
};

export default UserTasksForm;
