/**
 * Created by Roderik on 4/01/2015.
 */
var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
    userName: {type:String, required: true},
    imageUrl: String,
    bannerUrl: String,
    text: String,
    hashTag: String
});

module.Exports = tweetSchema;