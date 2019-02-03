import React, { Component } from "react";

import "./OpenMatches.css";

class OpenMatches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMatches: [],
      selectedMatch: ""
    };
  }

  componentWillUnmount() {
    this.props.socket.close();
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
      <div className="open_matches">
        <div className="match_actions">
          <button onClick={() => this.handlePlayMatchClick(false)}>Quick Match</button>
          <button onClick={() => this.handlePlayMatchClick(true)}>Ranked</button>
        </div>
      </div>
    );
  }
}

export default OpenMatches;
