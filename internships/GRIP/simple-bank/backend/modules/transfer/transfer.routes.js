const router = require("express").Router();
const {
    addTransfer,
    getUserTransfers
} = require("./controller/transfer.controller");
const validationFunc = require("../../middleware/validation");
const {
    addtransferValidation,
    getUserTransfersValidation
} = require("./transfer.validation");


// apis start*************************
router.get("/transfer/getUserTransfers/:userId", validationFunc(getUserTransfersValidation),getUserTransfers);
router.post("/transfer/addTransfer", validationFunc(addtransferValidation),addTransfer);
// apis end*************************


module.exports = router;