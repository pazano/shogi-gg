import React, { Component } from 'react';
import UserTile from '../../Global/UserTile/UserTile.jsx';
import FriendsList from './FriendsList/FriendsList.jsx';
import ChallengeList from './ChallengeList/ChallengeList.jsx';
import InviteList from './InviteList/InviteList.jsx';

/*
  Goals for this component:
  initialize the panel, grabbing friends, challenges and invites on mount
  migrate socket event listeners from the Friendslist
  update friends, challenges, invites lists accordingly
  add "is online" events that trigger on "join" and "leave" socket events
*/


class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async init () {

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

