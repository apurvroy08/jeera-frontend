import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/dashboard'
import Login from '../pages/login'
import Signup from '../pages/signup'
import UserTasksTable from '../pages/userTasksTable'
import UserTasksForm from '../components/userTasksForm'
import AddProjectForm from '../components/addProjectForm'

const AppRoutes = () => {

    const [taskData, setTaskData] = useState([])
    const [editTask, setEditTask] = useState()
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/userTasksTable/:projectId' element={<UserTasksTable taskData={taskData} setEditTask={setEditTask} />} />
                <Route path='/userTaskForm/:projectId' element={<UserTasksForm setTaskData={setTaskData} editTask={editTask} />} />
                <Route path='/addProjectForm' element={<AddProjectForm />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes