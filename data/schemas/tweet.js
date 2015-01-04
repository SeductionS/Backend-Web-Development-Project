/**
 * Created by Roderik on 4/01/2015.
 */
var mongoose = require('mongoose');

var tweetSchema = mongoose.Schema({
    userName: String,
    imageUrl: String,
    bannerUrl: String,
    text: String,
    hashTag: String
});

module.Exports = tweetSchema;