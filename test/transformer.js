/* global describe, it */
'use strict';

// Load dependencies
var should = require('should');
var Schema = require('bazalt-schema');
var Model  = require('bazalt-model');
var Query  = require('bazalt-query');

// Load transformer
var Transformer = require('../');

// Add the transformer to the list
Model.transformer(Transformer);

// Initialize a Model
var User = Model.generate('User', {
    username: Schema.Types.String
});

describe('Test Transformer\'s functions', function() {
    var user;

    it('create a new User', function(done) {

        user = new User({
            username: 'Dallas62'
        });

        user.save(done);
    });

    it('update the User', function(done) {

        user.save(done);
    });

    it('destroy it', function(done) {

        user.destroy(done);
    });

    it('Test User.find()', function(done) {

        User.find({}).exec(done);
    });

});
