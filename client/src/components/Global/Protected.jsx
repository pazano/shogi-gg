import React, { Component } from 'react';
import jwtDecode from 'jwt-decode';

class Protected extends Component {
  componentDidMount() {
    try {
      const { exp } = jwtDecode(localStorage.token);
      if (exp < Date.now()) {
        this.props.history.push('/login');
        localStorage.clear();
      }
    } catch (e) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { component: Component } = this.props;
    return (
      <Component {...this.props} />
    );
  }
}

export default Protected;
