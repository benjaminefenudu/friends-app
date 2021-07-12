// importing Friends data
let Friends = require("../models/FriendList")

// =-=-=-= Read all Friends' record =-=-=-=
const getFriends = (req, res) => {
    res.status(200).json(Friends)
}

// =-=-=-= Read single Friend's record =-=-=-=
const getSingleFriend = (req, res) => {
    const {id} = req.params;
    singleFriend = Friends.find((friend) => friend.id === Number(id))
    if (!singleFriend) {
        return res.status(400).json({ success: false, msg: `No friend with id ${id}.` });
    }
    return res.status(200).json({ success: true, data: singleFriend});
};


// =-=-=-= Create new Friend's record =-=-=-=
const createFriend = (req, res) => {
    const friend = req.body;
    // if user omits any value, send bad request, with required values to provide
    if (!friend.name || !friend.age || !friend.phoneNo) {
      return res.status(400).json({sucess: false, msg: "Please provide Friend's name, age, and phoneNo."});
    }
    let id = Friends.length + 1; // create unique id
    const newFriend = { id, ...req.body };
    // add new friend to end of Friends array
    Friends.push(newFriend);
    return res.status(200).json({
      success: true,
      msg: `Friend ${id} has been created.`,
      data: Friends,
    });
  };

// =-=-=-= Update existing Friend's record =-=-=-=
const updateFriend = (req, res) => {
    const { id } = req.params;
    // find friend by id, return 404 if not found
    friend = Friends.find((friend) => friend.id === Number(id));
    if (!friend) {
      return res.status(404).json({ success: false, msg: `No Friend with id ${id}.` });
    }
    // find and modify specified Friend
    Friends = Friends.map((friend) => {
        if (friend.id === Number(id)) {
        friend = { ...friend, ...req.body };
      }
      return friend;
    });
    return res.status(200).json({success: true, msg: `Friend ${id} has been updated.`, data: Friends});
};
  
// =-=-=-= Delete a Friend record =-=-=-=
  const deleteFriend = (req, res) => {
    const { id } = req.params;
    // find friend by id
    const deleteFriend = Friends.find((friend) => friend.id === Number(id));
    if (!deleteFriend) {
      return res.status(404).json({ success: false, msg: `No friend with id ${id}.` });
    }
    // create new array with all Friends except the specified Friend
    friends = Friends.filter((friend) => friend.id !== Number(id));
    return res.status(200).json({success: true, msg: `Friend ${id} has been deleted.`,
      data: friends,
    });
  };



module.exports = {
    getFriends,
    getSingleFriend,
    createFriend,
    updateFriend,
    deleteFriend
}