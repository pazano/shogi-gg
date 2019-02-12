import express from "express";
import { friendCtrl } from "./friendsControllers";

const router = express.Router();

router
  .route("/")
  .get(friendCtrl.get)
  .post(friendCtrl.add)
  .put(friendCtrl.update)
  .delete(friendCtrl.delete)

router
  .route("/search/")
  .get(friendCtrl.search)

export default router;
