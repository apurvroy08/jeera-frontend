import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { useNavigate } from "react-router-dom";
import { GetProjects, GetUserApi } from "../../services";

const Dashboard = ({ setProjectId }) => {
  const [logoutButton, setLogoutButton] = useState(true)
  const [projects, setProjects] = useState([])
  const [search, setSearch] = useState("")
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
      }
    } catch (error) {
      console.error("error in fatch user api")
    }
  }

  const FetchProjects = async () => {
    const response = await GetProjects()
    try {
      if (response.status === 200) {
        setProjects(response?.data)
      } else {
        console.log("error in get project api");
      }
    } catch (error) {
      console.error("error in get project api", error)
    }
  }

  const handleLogout = () => {
    alert("Logout successfully")
    localStorage.setItem("token", "")
    localStorage.setItem("user", "")
    navigate("/login")
  }

  const handleSelectedUser = (e) => {
    const selectedValue = e.target.value
    setSelectedUser(selectedValue)
  }

  const filteredProjects =
    selectedUser ? (projects.filter((project) => (
      project?.user?._id === selectedUser
    ))
    ) : projects;

  const handleProjects = (project_id) => {
    setProjectId(project_id)
    navigate("/userTasksTable")
  }

  const handleSearchProjects = (e) => {
    const searchValue = e.target.value
    setSearch(searchValue)
    const name = projects.filter((item) => item.projectName == searchValue)
    setProjects(name)
    console.log(name);
    
  }

  return (
    <div className={styles.dashboardContainer}>
      <nav className={styles.navbar}>
        <h1 className={styles.title}>Dashboard</h1>
        <input type="search" onChange={handleSearchProjects}
          value={search} placeholder="search project" />
        <select
          className={styles.dropdown}
          value={selectedUser}
          onChange={handleSelectedUser}
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
      {filteredProjects.length > 0 ? (
        filteredProjects.map((item) => (
          <div key={item._id} className={styles.taskGrid}
            onClick={() => handleProjects(item._id)}
          >
            <div className={styles.taskCard}>
              <h3>{item.projectName}</h3>
              <p>
                <strong>Assigned to: </strong>
                {item?.user?.name}
              </p>
              <p>
                <strong>Created Date: </strong>
                {item.createdDate}
              </p>
              <p>
                <strong>Priority: </strong>
                {item.priority}
              </p>
            </div>
          </div>
        ))
      ) : (
        <h3>No projects found</h3>
      )}
    </div >
  );
};

export default Dashboard;
