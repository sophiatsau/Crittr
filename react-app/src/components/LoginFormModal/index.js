import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { login } from "../../store/session";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import DemoLoginButton from "./DemoLoginButton";
import OauthButton from "../OauthButton";

function LoginFormModal() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    // only say "invalid credentials" to not reveal user info
    if (data.errors) {
      setErrors(data.errors.UnknownError || "Invalid credentials.");
    } else {
        closeModal()
        history.push('/')
    }
  };

  return (
    <>
      <h1 >Log In</h1>
      <form onSubmit={handleSubmit} id="login-form">
        <div className="error">{errors}</div>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button style={{marginTop:"5px"}} type="submit" className="purple-button">Log In</button>
        <OauthButton />

        <DemoLoginButton {...{setErrors, closeModal}}/>
      </form>
    </>
  );
}

export default LoginFormModal;
