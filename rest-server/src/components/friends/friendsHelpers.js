import { db } from "../../config/database/";
import { success, error } from "../../lib/log";
import { addFriendHelper, fetchAllFriendsHelper, delFriendHelper, updateFriendHelper, searchFriendHelper } from './friendsSQL';

export const addFriendQuery = async (userId, friendId, status = 0) => {
  try {
    const queryString = await addFriendHelper(userId, friendId, status);
    const data = await db.queryAsync(queryString);
    success("addfriendsQuery - successfully retrieved data ", JSON.stringify(data.rows[0]));
    return data;
  } catch (err) {
    error("friendsQuery - error= ", err);
    throw new Error(err);
  }
};

export const fetchFriendQuery = async (userId) => {
  try {
    const queryString = await fetchAllFriendsHelper(userId);
    const data = await db.queryAsync(queryString);
    success("fetchfriendsQuery - successfully retrieved data ", JSON.stringify(data.rows[0]));
    return data;
  } catch (err) {
    error("friendsQuery - error= ", err);
    throw new Error(err);
  }
};

export const delFriendQuery = async body => {
  try {
    const queryString = await delFriendHelper(body);
    const data = await db.queryAsync(queryString);
    success("delFriendQuery - successfully retrieved data ", JSON.stringify(data.rows[0]));
    return data;
  } catch (err) {
    error("delFriendQuery - error= ", err);
    throw new Error(err);
  }
};

export const updateFriendQuery = async (friendKey, status) => {
  try {
    const queryString = await updateFriendHelper(friendKey, status);
    const data = await db.queryAsync(queryString);
    success("Friend Status Update Successful");
    return data;
  } catch (err) {
    error("updateFriendQuery - error= ", err);
    throw new Error(err);
  }
};

export const searchFriendQuery = async (searchTerm) => {
  try {
    const queryString = await searchFriendHelper(searchTerm);
    const data = await db.queryAsync(queryString);
    success("Friend Status Update Successful");
    return data;
  } catch (err) {
    error("updateFriendQuery - error= ", err);
    throw new Error(err);
  }
};
