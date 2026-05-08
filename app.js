const express = require("express");
const { mean, median, mode } = require("./helpers");

const app = express();


function convertAndValidateNums(numsString) {
    if(!numsString) {
        throw new Error("nums are required");
    }

    const numsArray = numsString.split(",");
    // turns "1, 2, 3" into ["1", "2", "3"]
    const result = [];

    for(let val of numsArray) {
        const num = Number(val);
        // Number converts "2" to 2

        if(Number.isNaN(num)) {
            throw new Error(`${val} is not a number.`);
        }

        result.push(num);
    }

    return result;
}
// if you visit /mean, grab numbers from the URL, validate them, calculate the mean, then send JSON back
app.get("/mean", function(req, res) {
    // creates the get route
    try{
        const nums = convertAndValidateNums(req.query.nums);
        // req.query anything in URL after "?" and takes nums=1,2,3 into nums: "1,2,3"
        // convertAndValidateNums splits string from "1,2,3" to ["1", "2", "3"] then to [1, 2, 3] and makes sure everything is valid, no words or NaN

        const value = mean(nums);
        // calls the helper function

        return res.json({
            operation: "mean",
            value: value
        });
        // send JSON response back
    } catch(err) {
        return res.status(400).json({
            error: err.message
        });
    }
});

app.get("/median", function(req, res) {
    try{
        const nums = convertAndValidateNums(req.query.nums);

        const value = median(nums);

        return res.json({
            operation: "median",
            value: value
        });
    } catch(err) {
        return next(err);
    }
});

app.get("/mode", function(req, res) {
    try{
        const nums = convertAndValidateNums(req.query.nums);

        const value = mode(nums);

        return res.json({
            operation: "mode",
            value: value
        });
    } catch(err) {
        return next(err);
    }
});

app.get("/all", function(req, res) {
    try{
        const nums = convertAndValidateNums(req.query.nums);

        return res.json({
            operation: "all",
            mean: mean(nums),
            median: median(nums),
            mode: mode(nums)
        });
    } catch(err) {
        return next(err);
    }
})

app.use(function(err, req, res, next) {
    return res.status(400).json({
            error: err.message
        });
});


module.exports = app;