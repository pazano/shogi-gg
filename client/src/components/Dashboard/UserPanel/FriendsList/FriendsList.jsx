import React, { Component } from 'react';
import randomstring from 'randomstring';
import UserPanel from '../../../../../lib/UserPanel';
import ChallengeList from '../ChallengeList/ChallengeList.jsx';
import InviteList from '../InviteList/InviteList.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './FriendsList.css';

const { REST_SERVER_URL } = process.env;

const ChallengeAction = ({ friend, sendChallenge }) => {
  return (
      <div className='friends__list-actions' >
        <button className='friends__list-actions__challenge' onClick={() => sendChallenge(friend)}>
          <FontAwesomeIcon icon="fist-raised" />
        </button>
      </div>
  );
}

const FriendTile = ({ friend, challengedUsers, invokeChat, sendChallenge }) => {
  return (
    <div className="friends__list-item">
      <div className="friends__list-username" onClick={() => invokeChat(friend)}>{friend.username}</div>
      {challengedUsers[friend.id] ? <div></div> : <ChallengeAction friend={friend} sendChallenge={sendChallenge} />}
    </div>
  );
}


class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      friends: [],
      selectedFriend: null,
      challenges: {},
      challengedUsers: {},
      activePopups: []
    };
  }

  async componentDidMount() {
    this.id = +localStorage.getItem('id');
    this.username = localStorage.getItem('username');

    await this.fetchFriends();
    await this.fetchOpenChallenges();

    this.props.socket.on("server.challengeSent", data => {
      (this.id === data.player1 || this.id === data.player2) &&
        this.fetchOpenChallenges();
    });

    this.props.socket.on(
      "server.challengeAccepted",
      ({ matchId, black, white }) => {
        (this.id === black || this.id === white) &&
          this.props.history.push({
            pathname: `/match/${matchId}`,
            state: { matchId, black, white },
            history: this.props.history
          });
      }
    );

    this.props.socket.on("server.challengeRejected", ({ id }) => {
      if (this.state.challenges[id]) {
        this.fetchOpenChallenges();
      }
    });

    this.props.socket.on("server.popupChat", message => {
      if (message.friend_id === this.id) {
        for (let friend of this.state.friends) {
          message.user_id === friend.id && this.props.showActivePopups(friend);
        }
      }
    });
  }

  componentWillUnmount() {
    this.props.socket.close();
  }

  fetchFriends = async (userId = this.id) => {
    const { friends, invites, names } = await UserPanel.getUserFriendList(userId);
    this.setState({
      friends,
      invites,
      friendNames: names
    });
  };

  fetchOpenChallenges = async (userId = this.id) => {
    let challenges = await UserPanel.getUserChallenges(userId);
    let challengedUsers = Object.values(challenges).reduce((users, challenge) => {
      userId === challenge.fromUser ? users[challenge.toUser] = true : users[challenge.fromUser] = true;
      return users;
    }, {});
    this.setState({ challenges, challengedUsers });
  };

  handleFriendSelect = async (user) => {
    !this.state.activePopups.filter(friend => friend.id === user.id).length &&
      (await this.setState({
        selectedFriend: user,
        activePopups: [...this.state.activePopups, user]
      }));
  }

  sendChallenge = async (friend) => {
    const player1 = this.id;
    const player2 = friend.id
    const player1Name = this.username;
    const player2Name = friend.username;
    this.props.socket.emit("client.challengeFriend", {
      player1,
      player2,
      player1Name,
      player2Name
    });
  }

  acceptChallenge = async (e) => {
    const matchId = randomstring.generate();
    const { id, fromUser, toUser } = JSON.parse(e.target.value);
    await UserPanel.deleteChallenge(id);
    this.props.socket.emit("client.acceptChallenge", {
      matchId,
      black: fromUser,
      white: toUser,
      type: 2
    });
  }

  rejectChallenge = async (e) => {
    let { id } = JSON.parse(e.target.value);
    await UserPanel.deleteChallenge(id);
    this.props.socket.emit("client.rejectChallenge", { id });
  }

  acceptFriendInvite = async (e) => {
    const friendKey = e.target.value;
    const data = await UserPanel.acceptFriendInvite(friendKey);
    if (data) this.fetchFriends();
    // TODO:  Socket event for friend event
  }

  render() {
    return (
      <div className="friends__container">
        <ChallengeList
          names={this.state.friendNames}
          challenges={this.state.challenges}
          accept={this.acceptChallenge}
          reject={this.rejectChallenge}
          />
        <div className="friends__header"><h3>Friends</h3></div>
        <div className="friends__list">
          {this.state.friends.map(friend => (
            <FriendTile
              friend={friend}
              challengedUsers={this.state.challengedUsers}
              invokeChat={this.props.showActivePopups}
              sendChallenge={this.sendChallenge}
              key={`fl-${friend.id}`}
            />
          ))}
        </div>
        <InviteList
          invites={this.state.invites}
          names={this.state.friendNames}
          accept={this.acceptFriendInvite}
        />
      </div>
    );
  }
}

export default FriendsList;
