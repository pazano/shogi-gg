  /*
  An update to either record updates both records
  getFriends is simplified, can always use current user as u_id
  updateFriend and deleteFriend use friendKey to tie together both records
*/

const buildFriendKey = (u_id, f_id) => u_id < f_id ? u_id + f_id : f_id + u_id;

export const addFriendHelper = ({ u_id, f_id, status = 0}) => {
  const friendKey = buildFriendKey(u_id, f_id);
  return `
    INSERT INTO friends (u_id, f_id, status, friend_key, initiated_by)
    VALUES (${u_id}, ${f_id}, ${status}, ${friendKey}, ${u_id}), (${f_id}, ${u_id}, ${status}, ${friendKey}, ${u_id})
    RETURNING id, u_id, f_id, status, friend_key
  `;
};

export const fetchAllFriendsHelper = (userId) => {
  return `
    SELECT u.id, u.email, u.username, u.wins, u.losses, u.avatar, f.status, f.initiated_by, f.friend_key
    FROM users AS u
    JOIN friends AS f
    ON (u.id=f.f_id)
    WHERE (f.u_id=${userId})
  `;
};

export const delFriendHelper = (friendKey) => {
  return `
    DELETE FROM friends
    WHERE friendKey=${friendKey}
    RETURNING id
  `;
}

export const updateFriendHelper = (friendKey, status) => {
  console.log(`friendKey: ${friendKey}`)
  return `
    UPDATE friends
    SET status=${status}
    WHERE friend_key=${friendKey}
    RETURNING id, u_id, f_id, status, friend_key
  `;
}

export const searchFriendHelper = (searchTerm) => {
  return `
    SELECT id, email, username, avatar
    FROM users
    WHERE username LIKE '${searchTerm}%'
  `
}
