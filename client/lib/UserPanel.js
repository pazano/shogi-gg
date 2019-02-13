import axios from 'axios';

const { REST_SERVER_URL } = process.env;
const REQUEST_HEADER = { "Content-Type": "application/json" };

// Friends List
const getUserFriendList = async (userId) => {
  const { data } = await axios.get(
    `${REST_SERVER_URL}/api/friends`, { params: { id: userId }, headers: REQUEST_HEADER}
  );
  const friends = [];
  const invites = [];
  const names = {};
  data.forEach(friend => {
    if (friend.id !== userId) {
      if (friend.status === 1) friends.push(friend);
      if (friend.status === 0 && friend.initiated_by !== userId) invites.push(friend);
    }
    names[friend.id] = friend.username;
  });
  return {
    friends,
    invites,
    names
  }
}

// Open Challenges
const getUserChallenges = async (userId) => {
  let { data } = await axios.get(
    `${REST_SERVER_URL}/api/openMatches`,
    { params: { id: userId }, headers: REQUEST_HEADER }
  );
  const challengeObject = {};
  Object.values(data).forEach(challenge => {
    challengeObject[challenge.id] = {
      'id': challenge.id,
      'fromUser': challenge.player1,
      'toUser': challenge.player2,
      'type': challenge.player1 === userId ? 'TO' : 'FROM',
    }
  })
  return challengeObject;
}

const deleteChallenge = async (id) => {
  await axios.delete(
    `${REST_SERVER_URL}/api/openmatches`,
    { data: { id },
      headers: REQUEST_HEADER },
  );
}

const userLookup = async (searchTerm) => {
  try {
    const { data } = await axios.get(
      `${REST_SERVER_URL}/api/friends/search/`,
      { params: { searchTerm }, headers: REQUEST_HEADER }
    );
    return data;
  } catch(e) {
    console.warn('Search Error');
    return false;
  }
}

const createFriendInvite = async (userId, friendId) => {
  try {
    const { data } = axios.post(
      `${REST_SERVER_URL}/api/friends/`,
      { userId, friendId, status: 0}, REQUEST_HEADER
    );
    return data;
  } catch(err) {
    console.warn('Create Friend Invite Failure');
    return false;
  }
}

// Open Invitations
const acceptFriendInvite = async (friendKey) => {
  try {
    const { data } = await axios.put(
      `${REST_SERVER_URL}/api/friends/`,
      { friendKey, status: 1 }, { headers: REQUEST_HEADER }
    );
    return data;
  } catch (e) {
    return false;
  }
}

const rejectFriendInvite = async (friendKey) => {
  try {
    const { data } = await axios.delete(
      `${REST_SERVER_URL}/api/friends/`,
      { data: { friendKey }, headers: REQUEST_HEADER }
    );
    return data;
  } catch(e) {
    return false;
  }
}

export default {
  getUserFriendList,
  getUserChallenges,
  deleteChallenge,
  createFriendInvite,
  acceptFriendInvite,
  rejectFriendInvite,
  userLookup
}
