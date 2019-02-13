import { addFriendQuery, fetchFriendQuery, delFriendQuery, updateFriendQuery, searchFriendQuery } from './friendsHelpers';
import { success, warning, log, error } from "../../lib/log";

export const friendCtrl = {
  add: async (req, res) => {
    try {
      const { userId, friendId, status} = req.body;
      const data = await addFriendQuery(userId, friendId, status);
      success("addFriendController - sucessfully retrieved data ", JSON.stringify(data.rows[0]));
      return res.status(200).send(data.rows[0]);
    } catch (err) {
      error("addFriendController - error= ", err);
      return res.status(400).send(err);
    }
  },
  get: async (req, res) => {
    try {
      const { id } = req.query;
      const data = await fetchFriendQuery(id);
      success("fetchFriendController - sucessfully retrieved data ", JSON.stringify(data.rows));
      return res.status(200).send(data.rows);
    } catch (err) {
      error("fetchFriendController - error= ", err);
      return res.status(400).send(err);
    }
  },
  update: async (req, res) => {
    try {
      const { friendKey, status } = req.body
      const data = await updateFriendQuery(friendKey, status);
      return res.status(200).send(data.rows);
    } catch (err) {
      error("updateFriendController - error= ", err);
      return res.status(400).send(err);
    }
  },
  delete: async (req, res) => {
    try {
      const { friendKey } = req.params;
      const { data } = await delFriendQuery(friendKey);
      success(`Removed Friend Relationship with FriendKey: ${friendKey}`);
      return res.status(200).send(data); // possibly different payload here to trigger socket event
    } catch (err) {
      error("Error in delFriendController: ", err);
      return res.status(400).send(err);
    }
  },
  search: async (req, res) => {
    try {
      const { searchTerm } = req.query;
      const { rows } = await searchFriendQuery(searchTerm);
      return res.status(200).send(rows);
    } catch (err) {
      error('findFriend error = ', err);
      return res.status(400).send(err);
    }
  }
}
