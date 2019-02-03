import React, { Component } from "react";
import io from "socket.io-client/dist/socket.io.js";

import PrevMatches from "./PrevMatches/index.jsx";
import Competitive from "./Competitive/Competitive.jsx"
import FriendsList from "./FriendsList/index.jsx";
import Nav from "../Global/Nav/Nav.jsx";
import UserTile from "../Global/UserTile/UserTile.jsx"
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
      <div className="dashboard">
        <div className="dashboard__content">
          <div className="dashboard__content-header">
            <Nav socket={this.socket} />
          </div>
          <div className="dashboard__content-modules">
            <PrevMatches history={this.props.history} socket={this.socket} />
            <Competitive />
          </div>
          <ChatPopup
            socket={this.socket}
            activePopups={this.state.activePopups}
            removeActivePopup={this.removeActivePopup}
            minimizePopup={this.minimizePopup}
          />
        </div>
        <div className="dashboard__user-panel">
          <UserTile
            socket={this.socket}
          />
          <FriendsList
            history={this.props.history}
            socket={this.socket}
            showActivePopups={this.showActivePopups}
          />
        </div>
      </div>
    );
  }
}

export default Home;
