// eslint-disable-next-line no-unused-vars
import React, { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import "./LoginModal.css";


Modal.setAppElement("#root");

const LoginModal = forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  LoginModal.displayName = "LoginModal";
  // Toggle modal visibility
  const toggleModal = () => setShowModal((prev) => !prev);

  // Expose modal controls to parent component
  useImperativeHandle(ref, () => ({
    openModal: toggleModal,
  }));

  // Clear fields when modal is closed
  useEffect(() => {
    if (!showModal) {
      setUsername("");
      setPassword("");
    }
  }, [showModal]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:7177/api/auth/login", {
        username,
        password,
      });
      console.log("response",response);
      const { token } = response.data;

      // Save token
      if (rememberMe) {
        localStorage.setItem("token", token);
      } else {
        sessionStorage.setItem("token", token);
      }

      // Decode token to get user role
      // eslint-disable-next-line no-undef
      const user = jwt_decode(token);
      if (user.role === "admin") {
        toggleModal();
        navigate("/admin");
      } else if (user.role === "user") {
        toggleModal();
        navigate("/user"); // Calendar page for user
      } else {
        alert("Unknown role");
      }
    } catch (error) {
      console.log("error",error.message);
      console.error("Login failed", error);
      alert("Invalid credentials or server error.");
    }
  };

  return (
    <>
      <Modal
        isOpen={showModal}
        onRequestClose={toggleModal}
        className="login-modal"
        overlayClassName="login-overlay"
      >
        <div className="close-btn-cont">
          <button onClick={toggleModal} className="close-btn">X</button>
        </div>
        <div className="container">
          <h1 className="heading">Log in</h1>
          <form onSubmit={handleSubmit} className="form">
            <div>
              <label htmlFor="username" className="input-label">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <div className="password-input-container">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="input password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="icon-button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div>
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>
            </div>
            <button type="submit" className="button">
              Submit
            </button>
          </form>
        </div>
      </Modal>
    </>
  );
});


export default LoginModal