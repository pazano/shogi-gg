import React, { Component } from "react";
import io from "socket.io-client/dist/socket.io.js";

import OpenMatches from "./OpenMatches/index.jsx";
import PrevMatches from "./PrevMatches/index.jsx";
import FriendChallenge from "./FriendChallenge/index.jsx";
import Leaderboard from "./Leaderboard/index.jsx";
import Nav from "../Global/Nav/Nav.jsx";
import ChatPopup from "./Chat/popup.jsx";

import "./Home.css";

const { SOCKET_SERVER_URL } = process.env;

class Home extends Component {
  constructor() {
    super();
    this.state = {
      activePopups: []
    };
    this.showActivePopups = this.showActivePopups.bind(this);
    this.removeActivePopup = this.removeActivePopup.bind(this);
    this.minimizePopup = this.minimizePopup.bind(this);
  }

  componentWillMount() {
    this.socket = io(SOCKET_SERVER_URL, {
      query: {
        roomId: "home",
        username: localStorage.getItem("username"),
        userId: +localStorage.getItem("id")
      }
    });
  }

  async componentDidMount() {}

  componentWillUnmount() {
    this.socket.close();
  }

  logout = () => {
    localStorage.clear();
    this.props.history.push("/login");
  };

  showActivePopups(user) {
    const maxPopups = Math.floor(window.innerWidth / 305);
    const { activePopups } = this.state;
    if (
      !this.state.activePopups.filter(friend => friend.id === user.id).length
    ) {
      user.minimized = false;
      activePopups.length >= maxPopups && activePopups.shift();
      activePopups.push(user);
      this.setState({ activePopups });
    }
  }

  removeActivePopup(id) {
    this.setState({
      activePopups: this.state.activePopups.filter(friend => friend.id !== id)
    });
  }

  minimizePopup(id) {
    const { activePopups } = this.state;
    for (let friend of activePopups) {
      friend.id === id && (friend.minimized = !friend.minimized);
    }
    this.setState({ activePopups });
  }

  render() {
    return (
      <div className="home-container">
        <div className="nav-container">
          <Nav socket={this.socket} />
        </div>
        <div className="home-components">
          <div className="match-container">
            <PrevMatches history={this.props.history} socket={this.socket} />
          </div>
          <FriendChallenge
            history={this.props.history}
            socket={this.socket}
            showActivePopups={this.showActivePopups}
          />
        </div>
        <ChatPopup
          socket={this.socket}
          activePopups={this.state.activePopups}
          removeActivePopup={this.removeActivePopup}
          minimizePopup={this.minimizePopup}
        />
      </div>
    );
  }
}

export default Home;
