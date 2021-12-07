const express = require('express');
const router = express.Router();
const Product = require('../model/productSchema');
const Authenticate = require('../middlewares/authentication');
var mongoose = require('mongoose');
var dateTime = require('node-datetime');


router.put('/addBid', Authenticate, async (req, res) => {
    try {

        var dt = dateTime.create();

        var formatted = dt.format('Y-m-d H:M:S');

        console.log(formatted);

        var productId = mongoose.Types.ObjectId(req.body.productId);
        const array = {
            'bidPrice': req.body.bid,
            'date': formatted,
            'userName': req.rootUser.userName
        }

        const updateDoc = {
            $push: {
                'bids': array
            }
        }

        const [result1, result2] = await Promise.all([
            Product.updateOne({ '_id': productId }, { $set: { 'biddingPrice': req.body.bid } }),
            Product.updateOne({ '_id': productId }, updateDoc)
        ])

        console.log(result1, result2);

        if (result1 && result2) {
            return res.status(202).json({ message: 'Bid Added Successfully' });
        } else {
            return res.status(404).json({ message: "Else Bad Requests :)" });
        }

    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "Bad Requests :)" });
    }
})








module.exports = router;