import React, { Component } from 'react';
import axios from 'axios';
import { PendingList } from './PendingList.jsx';
import UserPanel from '../../../lib/UserPanel.js';

import './Friends.css';

const {REST_SERVER_URL} = process.env;
const REQUEST_HEADER = { "Content-Type": "application/json" };

class Friends extends Component {
  constructor() {
    super();
    this.state = {
      currentUser: +localStorage.getItem('id'),
      searchTerm: '',
      results: [],
    };
  }

  userLookup = async (e) => {
    e.preventDefault();
    if (this.state.searchTerm && this.state.searchTerm.length > 3) {
      const results = await UserPanel.userLookup(this.state.searchTerm);
      this.setState({
        results
      });
    }
  }

  addFriend = (e) => {
    e.preventDefault(); //Without this line 2nd axios call breaks
    const { username } = this.state;
    const id = localStorage.getItem('id')
    axios.post(`${REST_SERVER_URL}/api/users/`, {username})
      .then(res => {
        const body = {
          u_id: id,
          f_id: res.data.id.toString(),
        }
        axios.post(`${REST_SERVER_URL}/api/friends/`, body)
          .then(data => {
            this.refs.search.value = '';
            this.fetchFriends();
          })
          .catch(err => {
            console.log('Error adding: ', username);
          });
      })
      .catch(err => {
        console.log('Error finding: ', username);
      });
  }

  handleInput = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  fetchFriends = async (userId = this.state.currentUser) => {
    const { friends } = UserPanel.getUserFriendList(userId);
    for(let friend of data) {
      const fid = friend.u_id;
      const user = await axios.get(`${REST_SERVER_URL}/api/users/${fid}`);
      if(id == friend.id) friend.avatar = user.data[0].avatar
      friend.permId = user.data[0].id
      friend.name = user.data[0].username
      if(friend.status == 0 && friend.u_id == id) awaiting.push(friend)
      if(friend.status == 0 && friend.u_id != id) pending.push(friend)
      if(friend.status == 1 && friend.id != id) flist.push(friend)
    }
    this.setState({ friends: flist });
    this.setState({ pending: pending });
    this.setState({ awaiting: awaiting });
  }

  deleteFriend = async (e) => {
    const id = localStorage.getItem("id");
    const fid = e.id;
    const { data } = await axios.delete(
      `${REST_SERVER_URL}/api/friends/deleteFriend/${id}/${fid}`
    );
    this.fetchFriends();
  }

  acceptFriend = async (e) => {
    const id = localStorage.getItem("id");
    const fid = e.permId;
    const { data } = await axios.put(
      `${REST_SERVER_URL}/api/friends/${id}/${fid}/1`
    );
    const body = {
      u_id: id,
      f_id: fid,
      status: 1
    }
    const added = await axios.post(`${REST_SERVER_URL}/api/friends/add`, body);
    this.fetchFriends();
  }

  rejectFriend = async (e) => {
    const id = localStorage.getItem("id");
    const fid = e.permId;
    const { data } = await axios.put(
      `${REST_SERVER_URL}/api/friends/${id}/${fid}/2`
    );
    this.fetchFriends();
  }

  render() {
    const results = this.state.results.length > 0 && (
      <div className="pending-container">
        <div className="friend-title">Results</div>
        <div>
        {this.state.results.map((user) => (
          <div key={`sr-${user.id}-${user.username}`}>{user.username}</div>
        ))}
        </div>
      </div>
    )
    return (
      <div className="friend-container">
        <div className="friend-top">
          <div className="friend-head">Friends List</div>
          <form className="friend-search">
            <input ref="search" name="searchTerm" type="text" placeholder="Username" className="friend-form" onChange={this.handleInput} />
            <button type="submit" className="friend-button" onClick={(e) => this.userLookup(e)}>Search</ button>
          </ form>
        </ div>
        <div className="friend-list-container">
          {results}
        </div>
      </div>
    )
  }
}

export default Friends;
