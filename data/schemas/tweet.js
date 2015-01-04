/**
 * Created by Roderik on 4/01/2015.
 */
var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
    userName: {type: String, required: true},
    imageUrl: {type: String},
    bannerUrl: {type: String},
    text: {type: String},
    hashTag: {type: String}
});

module.exports = tweetSchema;