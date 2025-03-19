import React, { useEffect, useState } from 'react'
import styles from "./AddProjectForm.module.css"
import { AddProject, GetUserApi } from '../../services'
import { useNavigate } from 'react-router-dom'

const AddProjectForm = () => {

    const [user, setUser] = useState([])
    const [addProjectFormData, setAddProjectFormData] = useState({
        projectName: "",
        user: "",
        createdDate: "",
        priority: ""
    })

    const navigate = useNavigate()

    useEffect(() => {
        FatchUsersName()
    }, [])

    const FatchUsersName = async () => {
        const response = await GetUserApi()
        try {
            if (response?.status === 200) {
                setUser(response?.data)
            }
        } catch {
            console.error("getUsers api error", error)
        }
    }

    const handleChange = (e) => {
        setAddProjectFormData({
            ...addProjectFormData, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            const response = await AddProject(addProjectFormData) 
            if(response.status === 200){
                alert("Project added successfully")
            } else{
                console.log("add project api error");
            }
        } catch (error) {
            console.error("error in add project api", error)
        }

        navigate("/")

        setAddProjectFormData({
            projectName: "",
            user: "",
            createdDate: "",
            priority: ""
        })
    }

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Add New Project</h2>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Project Name</label>
                    <input
                        type="text"
                        name="projectName"
                        placeholder="Enter Project Name"
                        onChange={handleChange}
                        value={addProjectFormData.projectName}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>User Name</label>
                    <select
                        name="user"
                        onChange={handleChange}
                        value={addProjectFormData.user}
                        required
                    >
                        <option value="">select user</option>
                        {user.map((item) => (
                            <option key={item._id} value={item._id}>{item.name}</option>
                        ))}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label>Created Date</label>
                    <input
                        type="date"
                        name="createdDate"
                        onChange={handleChange}
                        value={addProjectFormData.createdDate}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Priority</label>
                    <select
                        name="priority"
                        onChange={handleChange}
                        value={addProjectFormData.priority}
                        required
                    >
                        <option value="">Select Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <button className={styles.submitButton} type='submit'>
                    Add Project
                </button>
            </form>
        </div>
    )
}

export default AddProjectForm