/**
 * Created by Roderik on 4/01/2015.
 */
var mongoose = require("mongoose");
var mongodbURL = 'mongodb://localhost/tweetDB';

module.exports = (function () {
    var db = mongoose.connect(mongodbURL); //connecteer de database
    mongoose.connection.on("open", function () {
        console.log("connection with mongo server " + mongodbURL);
        // get collection (=table) names als test
        mongoose.connection.db.collectionNames(function (err, names) {
            console.log("collection list:");
            console.log(names);
        });
    });
    mongoose.connection.on("error", function () { });
    mongoose.connection.on("close", function () { });
})();