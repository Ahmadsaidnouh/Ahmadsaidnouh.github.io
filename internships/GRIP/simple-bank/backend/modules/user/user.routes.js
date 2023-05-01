const router = require("express").Router();
const {
    updateBalance,
    getAllUsers,
    getUser,
    addUser
} = require("./controller/user.controller");
const validationFunc = require("../../middleware/validation");
const {
    updateBalanceValidation,
    getUserValidation
} = require("./user.validation");


// apis start*************************
router.get("/",async (req,res) => {res.json({message:"Working Successfully"})})
router.post("/user/addUser", addUser)
router.get("/user/getAllUsers", getAllUsers);
router.get("/user/getUser/:userId", validationFunc(getUserValidation),getUser);
router.patch("/user/updateBalance", validationFunc(updateBalanceValidation),updateBalance);
// apis end*************************


module.exports = router;