const express = require('express');
const router = express.Router();
var multer = require('multer')
const Product = require('../model/productSchema');
var dateTime = require('node-datetime');

router.get('/categoryCount', async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                "$group": {
                    _id: "$category",
                    count: { $sum: 1 }
                }
            }
        ])

        console.log(result);
        return res.status(202).json(result);
    } catch (err) {
        console.log(err);
        return res.status(404).json({ message: "Bad Requests :)" });
    }
})


module.exports = router;