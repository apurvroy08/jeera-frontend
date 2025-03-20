import { apiEndPoint } from "./apiEndPoints"
import { axiosInstanse } from "./apiConfig"

export const SignUpApi = async (data) => {
    try {
        const response = await axiosInstanse.post(apiEndPoint.signup, data)
        return response
    } catch (error) {
        console.error("Sign Up api error: ", error)
        return error.response
    }
}

export const LoginApi = async (data) => {
    try {
        const response = await axiosInstanse.post(apiEndPoint.login, data)
        return response
    } catch (error) {
        console.error("Login API Error: ", error)
        return error.response
    }
}

export const AddTasksApi = async (data) => {
    try {
        const response = await axiosInstanse.post(apiEndPoint.addTask, data)
        return response
    } catch (error) {
        console.error("Add Task Api Error", error)
        return error.response
    }
}

export const GetTasksApi = async () => {
    try {
        const response = await axiosInstanse.get(apiEndPoint.getTasks)
        return response
    } catch (error) {
        console.error("Get tasks api error", error)
        return error.response
    }
}

export const UpdateTaskApi = async (taskId, updatedTaskData) => {
    try {
        const response = await axiosInstanse.put(`${apiEndPoint.updateTask}/${taskId}`, updatedTaskData);
        return response;
    } catch (error) {
        console.error("Error updating task:", error);
        return error.response;
    }
};

export const DeleteTaskApi = async (taskId) => {
    try {
        const response = await axiosInstanse.delete(`${apiEndPoint.deleteTask}/${taskId}`)
        return response
    } catch (error) {
        console.error("Delete task api error", error)
        return error.response
    }
}

export const GetUserApi = async () => {
    try {
        const response = await axiosInstanse.get(apiEndPoint.getUsersName)
        return response
    } catch (error) {
        console.error("fatch user api error", error)
        return error.response
    }
}

export const GetProjects = async () => {
    try {
        const response = await axiosInstanse.get(apiEndPoint.getProjects)
        return response
    } catch (error) {
        console.error("get Project api error", error)
        return error.response
    }
}

export const AddProject = async (data) => {
    try {
        const response = await axiosInstanse.post(apiEndPoint.addProject, data)
        return response
    } catch (error) {
        console.error("error in add project api", error)
        return error.response
    }
}