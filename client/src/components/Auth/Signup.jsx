import React, { Component } from 'react';
import axios from 'axios';
import { HalfLockup } from '../Global/Logo/index.js'
import { FadeIn } from '../Global/Animation/Transitions.jsx';

import './Auth.css';
import auth from '../../../lib/auth.js';

const {REST_SERVER_URL} = process.env;

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      email: null,
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
    if (this.state.error) this.setState({ error: null });
  }

  submitAuthData = async (e) => {
    e.preventDefault();
    try {
      const { email, username, password } = this.state;
      if (email && username && password) {
        await auth.register(email, username, password);
        this.props.history.push('/home')
      }
    } catch (err) {
      this.setError("Username already exists");
    }
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({ [name]: value });
  }

  render() {
    return (
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
                name='email'
                type='text'
                className='auth__form-input'
                placeholder={'ENTER YOUR EMAIL'}
                autoComplete='email'
                onChange={this.handleInputChange}
                />
              <input
                name='username'
                type='text'
                className='auth__form-input'
                autoComplete="username"
                placeholder={'ENTER YOUR USERNAME'}
                onChange={this.handleInputChange}
                />
              <input
                name='password'
                type='password'
                className='auth__form-input'
                autoComplete="new-password"
                placeholder={'ENTER YOUR PASSWORD'}
                onChange={this.handleInputChange}
                />
              <button
                type='submit'
                className='auth__button'
                onClick={(e) => this.submitAuthData(e)}
                >Submit</button>
            </form>
            <div className="landing__signup-cta">
              <em>Already have an account?</em> <a className="landing__link-secondary" onClick={() => this.props.history.push("/login")}>Login</a>
            </div>
          </div>
        </FadeIn>
      </div>
    )
  }
}

export default Signup;
