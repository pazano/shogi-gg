import axios from 'axios';

const { REST_SERVER_URL } = process.env;

// Friends List
const getUserFriendList = async (userId) => {
  // todo... rewrite backend controller / query
  const { data } = await axios.get(
    `${REST_SERVER_URL}/api/friends/fetchFriends/${userId}`,
    {
      headers: { "Content-Type": "application/json" }
    }
  );
  // todo... what is returned here?
  const friends = data.filter(
      friend => friend.id !== userId && friend.status === 1
    );
  return friends;
}

// Open Challenges
const getUserChallenges = async (userId) => {
  let { data } = await axios.get(
    `${REST_SERVER_URL}/api/openMatches`,
    {
      params: { id: userId }
    },
    {
      headers: { "Content-Type": "application/json" }
    }
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
    {
      data: { id }
    },
    {
      headers: { "Content-Type": "application/json" }
    }
  );
}

// Open Invitations
const getUserInvitations = async (userId) => {


}

export default {
  getUserFriendList,
  getUserChallenges,
  deleteChallenge,
  getUserInvitations
}
