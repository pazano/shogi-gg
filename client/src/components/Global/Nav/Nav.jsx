import React, { Component } from 'react';
import { HalfLockup } from '../Logo';
import { Link } from 'react-router-dom';

import './Nav.css'

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.username,
    };
    this.handlePlayMatchClick = this.handlePlayMatchClick.bind(this);
  }

  async handlePlayMatchClick(ranked) {
    this.props.history.push({
      pathname: `/match/queue`,
      state: {
        userId: +localStorage.getItem("id"),
        ranked
      },
      history: this.props.history
    });
  }

  render() {
    return (
      <div className="topnav">
        <div className="topnav__logo"><Link to="/home"><HalfLockup palette={{ gg: '#FFF', text: '#FFF', glyph: '#f15a4a' }} /></Link></div>
        <div className="topnav__play">
          <button onClick={() => this.handlePlayMatchClick(false)}>Quick Match</button>
          <button onClick={() => this.handlePlayMatchClick(true)}>Ranked</button>
        </div>
      </div>
    )
  }
}

export default Nav;
