import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { GetProjects, GetUserApi } from "../../services";

const Dashboard = () => {
  const [logoutButton, setLogoutButton] = useState(true)
  const [projects, setProjects] = useState([])
  const [userProjects, setUserProjects] = useState()
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState("")
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    FetchUsers()
    FetchProjects()
    if (token) {
      setLogoutButton(false)
    }
  }, [])

  const FetchUsers = async () => {
    const response = await GetUserApi()
    try {
      if (response.status === 200) {
        setUsers(response?.data)
        console.log(proj);
      }
    } catch (error) {

    }
  }

  const FetchProjects = async () => {
    const response = await GetProjects()
    try {
      if (response.status === 200) {
        setProjects(response?.data)
        setUserProjects()
      } else {
        console.log("error in get project api");
      }
    } catch (error) {
      console.error("error in get project api", error)
    }
  }

  const handleProject = (projectId) => {
    navigate(`/userTasksTable/${projectId}`)
  }

  const handleLogout = () => {
    alert("Logout successfully")
    localStorage.setItem("token", "")
    localStorage.setItem("user", "")
    navigate("/login")
  }

  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.navbar}>
        <h1 className={styles.title}>Dashboard</h1>
        <select
          className={styles.dropdown}
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">All users</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>{user.name}</option>
          ))}
        </select>
        <div>
          <button className="addProjectButton" onClick={() => navigate("/addProjectForm")}>Add Projects</button>
        </div>
        {logoutButton ? <button className={styles.logoutButton} onClick={() => navigate("/login")}>Login</button> : <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>}
      </nav>
      {
        projects.length > 0 ? (projects.map((item) => (
          <div key={item._id} className={styles.taskGrid} onClick={() => handleProject(item._id)}>
            <div className={styles.taskCard}>
              <h3>{item.projectName}</h3>
              <p><strong>Assigned to: </strong>{item?.user?.name}</p>
              <p><strong>Created Date: </strong>{item.createdDate}</p>
              <p><strong>Priority: </strong>{item.priority}</p>
            </div>
          </div>
        ))) : (<h3>no project added</h3>)
      }
    </div >
  );
};

export default Dashboard;
