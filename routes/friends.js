const express = require("express");
router = express();

const  {
    getFriends,
    getSingleFriend,
    createFriend,
    updateFriend,
    deleteFriend
} = require("../controllers/friends")

router.route("/").get(getFriends).post(createFriend);
router.route("/:id").get(getSingleFriend).put(updateFriend).delete(deleteFriend)

module.exports = router