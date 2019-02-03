import React, { Component } from 'react';
import { HalfLockup } from '../Logo';
import { UserTile } from '../UserTile/UserTile.jsx'
import { Link } from 'react-router-dom';

import './Nav.css'

class Nav extends Component {
  constructor() {
    super();
    this.state = {
      username: localStorage.username,
    };
  }

  logout = () => {
    localStorage.clear();
    this.props.socket && this.props.socket.close();
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
        <div className="topnav__user">
          <UserTile socket={this.props.socket} logoutAction={this.logout} />
        </div>
      </div>
    )
  }
}

export default Nav;
