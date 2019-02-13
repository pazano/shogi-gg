import React, { Component } from 'react';
import UserPanel from '../../../lib/UserPanel.js';

import './Friends.css';

const FriendResult = ({ currentUser, result, sendInvite }) => {
  return(
    <div className="search__result-item">
      <div className="search__result-item__label">{result.username}</div>
      <div className="search__result-item__actions">
        <button onClick={() => sendInvite(currentUser, result.id)}>Send Request</button>
      </div>
    </div>
  );
}

const FriendResultList = ({ currentUser, results, sendInvite }) => {
  if (results.length) {
    return (
      <div className="pending-container">
        <div className="friend-title">
          <h3>Results</h3>
        </div>
        <div className="search__result-list">
          {results.map(user =>
            <FriendResult
              currentUser={currentUser}
              result={user}
              sendInvite={sendInvite}
              key={`friend-result-${user.id}`}
            />
          )}
        </div>
      </div>
    );
  } else {
    return ( <div></div> );
  }
}

class Friends extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: +localStorage.getItem('id'),
      searchTerm: '',
      searchResults: [],
    };
  }

  userLookup = async (e) => {
    e.preventDefault();
    if (this.state.searchTerm && this.state.searchTerm.length >= 3) {
      const results = await UserPanel.userLookup(this.state.searchTerm);
      await this.setState({
        searchResults: results
      }, () => console.log('search returned: ', this.state.searchResults));
    }
  }

  sendInvite = async (userId, friendId) => {
    const result = await UserPanel.createFriendInvite(userId, friendId);
    console.log(result);
  }

  handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }


  render() {
    return (
      <div className="friend-container">
        <div className="friend-top">
          <div className="friend-head">Friends List</div>
          <div>
            <input ref="search" name="searchTerm" type="text" placeholder="Username" className="friend-form" onChange={this.handleInput} />
            <button className="friend-button" onClick={(e) => this.userLookup(e)}>Search</ button>
          </div>
        </div>
        <FriendResultList
          currentUser={this.state.currentUser}
          results={this.state.searchResults}
          sendInvite={this.sendInvite}
        />
      </div>
    );
  }
}

export default Friends;
