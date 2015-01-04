/**
 * Created by Roderik on 4/01/2015.
 */
var mongoose = require('mongoose');
var TweetSchema = require("../schemas/tweet.js");

var Tweet = mongoose.model('Tweet',TweetSchema,"tweets");

module.exports = Tweet;