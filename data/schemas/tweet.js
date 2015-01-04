/**
 * Created by Roderik on 4/01/2015.
 */
var mongoose = require('mongoose');

var tweetSchema = new mongoose.Schema({
    userName: 'string',
    imageUrl: 'string',
    bannerUrl: 'string',
    text: 'string',
    hashTag: 'string'
});

module.exports = tweetSchema;