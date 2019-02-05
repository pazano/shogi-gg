import React, { Component } from 'react';
import UserTile from '../../Global/UserTile/UserTile.jsx';
import FriendsList from './FriendsList/FriendsList.jsx';
import ChallengeList from './ChallengeList/ChallengeList.jsx';
import InviteList from './InviteList/InviteList.jsx';

class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    let { socket, history, showActivePopups } = this.props;
    return (
      <div className="dashboard__user-panel">
        <UserTile socket={socket} />
        <ChallengeList />
        <FriendsList
          socket={socket}
          history={history}
          showActivePopups={showActivePopups}
        />
        <InviteList />
      </div>
    )
  }

}

export default UserPanel;

