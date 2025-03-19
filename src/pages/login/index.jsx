import React, { useState } from "react";
import styles from "./Login.module.css";
import { LoginApi } from "../../services";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setLoginFormData({
      ...loginFormData, [e.target.name]: e.target.value
    })
  }

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(loginFormData);
      const response = await LoginApi(loginFormData)

      if (response?.status === 200) {
        alert("Login successful!")
        console.log(response, "lllllllllllllllll");
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("user", JSON.stringify(response.data.user))
        navigate("/")
      } else {
        alert(response.data.msg)
        setLoginFormData({
          email: "",
          password: ""
        })
      }

    } catch (error) {
      console.error("login faild", error)
    }
  }

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleLoginFormSubmit}>
        <h2>Login</h2>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" name="email" value={loginFormData.email} onChange={handleChange} />
        </div>

        <div className={styles.inputGroup}>
          <label>Password</label>
          <input type="password" placeholder="Enter your password" name="password" value={loginFormData.password} onChange={handleChange} />
        </div>


        <button className={styles.loginButton} type="submit">Login</button>
        <p className={styles.signupText}>
          Not a member? <a href="/signup" className={styles.signupLink}>Signup</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
