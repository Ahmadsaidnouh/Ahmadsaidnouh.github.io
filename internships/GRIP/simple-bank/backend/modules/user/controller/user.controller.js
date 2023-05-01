const userModel = require("../../../DB/models/user.model");

const updateBalance = async (req, res) => {
    let { userId, newBalance } = req.body;
    try {
        const user = await userModel.findOne({ _id: userId });
        if (user) {
            const updatedUser = await userModel.findByIdAndUpdate(userId, { currentBalance: newBalance }, { new: true })
            res.json({ message: "Done", updatedUser });
        }
        else {
            res.status(400).json({ message: "Error" });
        }
    } catch (error) {
        res.status(400).json({ message: "Error" });
    }
}

const getUser = async (req, res) => {
    let { userId } = req.params;
    try {
        const user = await userModel.findOne({ _id: userId });
        const temp = await userModel.find({});
        var users = temp.filter(function (value) {
            return value._id != userId;
        });
        if (user) {
            res.json({ message: "Done", user, users });
        }
        else {
            res.status(400).json({ message: "Error" });
        }
    } catch (error) {
        res.status(400).json({ message: "Error" });
    }
}
const getAllUsers = async (req, res) => {
    const users = await userModel.find({});
    if (users.length) {
        res.json({ message: "Done", users });
    }
    else {
        res.status(400).json({ message: "Error" });
    }
}
const addUser = async (req, res) => {
    try {


        let { name, email, currentBalance } = req.body;
        const createdUser = new userModel({ name, email, currentBalance });
        const addedUser = await createdUser.save();
        res.json({ message: "done", addedUser });
    } catch (error) {
        res.status(400).json({ message: "Error" })
    }
}

module.exports = {
    updateBalance,
    getAllUsers,
    getUser,
    addUser
}