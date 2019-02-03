import React, { Component } from "react";
import { HalfLockup } from "../Global/Logo/index.js"
import { FadeIn } from '../Global/Animation/Transitions.jsx';
import "./Auth.css";
import auth from "../../../lib/auth.js";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      error: null,
    };
  }

  setError = (message) => {
    this.setState({
      'error': message
    });
  }

  clearError = () => {
    if(this.state.error) this.setState({ error: null });
  }


  submitAuthData = async (e) => {
    e.preventDefault();
    try {
      const { username, password } = this.state;
      if (username && password) {
        await auth.login(username, password);
        this.props.history.push('/home');
      }
    } catch (err) {
      this.setError("Invalid credentials");
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {

    return(
      <div className="auth__page">
        <FadeIn>
          <div className="auth__page-container">
            <div className="logo__container">
              <HalfLockup />
            </div>
            <div className="auth__page-error">
              {this.state.error}
            </div>
            <form className="auth__form-container">
              <input
                name="username"
                type="text"
                autoComplete="username"
                placeholder={"ENTER YOUR USERNAME"}
                className="auth__form-input"
                onChange={this.handleInputChange}
                onFocus={this.clearError}
                />
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder={"ENTER YOUR PASSWORD"}
                className="auth__form-input"
                onChange={this.handleInputChange}
                onFocus={this.clearError}
                />
              <button
                type="submit"
                className="auth__button"
                onClick={(e) => this.submitAuthData(e)}
              >Login</button>
            </form>
            <div className="landing__signup-cta">
              <em>Need an account?</em> <a className="landing__link-secondary" onClick={() => this.props.history.push("/signup")}>Sign Up</a>
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}

export default Login;
