/**
 * Created by Roderik on 4/01/2015.
 */
var mongoose = require("mongoose");
var tweetSchema = require("../schemas/tweet.js");

var Tweet = mongoose.model('Tweet',tweetSchema,"tweets");
module.exports = Tweet;