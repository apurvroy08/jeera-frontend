import React, { useState } from "react";
import styles from "./Signup.module.css";
import { SignUpApi } from "../../services";
import { useNavigate } from "react-router-dom";

const Signup = () => {

  const [signupFormData, setSignupFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setSignupFormData({
      ...signupFormData, [e.target.name]: e.target.value
    })
  }

  const handleSignupFormSubmit = async (e) => {
    e.preventDefault()
    try {
      console.log(signupFormData);
      const response = await SignUpApi(signupFormData)
      console.log(response, "llllllllllllllll");

      if (response.status === 201) {
        alert("Sign up successfully.....")
        navigate("/login")
      } else {
        alert(response?.data?.msg || "Sign up failed please try again !")
      }

      setSignupFormData({
        name: "",
        email: "",
        password: "",
        role: ""
      })
    } catch (error) {
      console.error("Sign up failed: ", error)
      alert("Signup failed please try agian !")
    }
  }

  return (
    <div className={styles.signupContainer}>
      <form className={styles.signupForm} onSubmit={handleSignupFormSubmit}>
        <h2>Signup</h2>

        <div className={styles.inputGroup}>
          <label>Full Name</label>
          <input type="text" placeholder="Enter your full name" name="name" onChange={handleChange} value={signupFormData.name} />
        </div>

        <div className={styles.inputGroup}>
          <label>Email</label>
          <input type="email" placeholder="Enter your email" name="email" onChange={handleChange} value={signupFormData.email} />
        </div>

        <div className={styles.inputGroup}>
          <label>Password</label>
          <input type="password" placeholder="Enter your password" name="password" onChange={handleChange} value={signupFormData.password} />
        </div>

        <div className={styles.radioGroup}>
          <label>Select Role:</label>
          <div className={styles.radioOptions}>
            <label htmlFor="">
              <input
                type="radio"
                name="role"
                value="user"
                checked={"user" === signupFormData.role}
                onChange={handleChange}
              />
              user
            </label>
            <label htmlFor="">
              <input
                type="radio"
                name="role"
                value="admin"
                checked={"admin" === signupFormData.role}
                onChange={handleChange}
              />
              admin
            </label>
          </div>
        </div>

        <button className={styles.signupButton} type="submit">Signup</button>

        <p className={styles.loginText}>
          Already Signed Up? <a href="/login" className={styles.loginLink}>Login Here</a>
        </p>

      </form>
    </div>
  );
};

export default Signup;
