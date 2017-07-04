'use strict';

var Query = require('bazalt-query');

// Create the adapter
var adapter = function(ModelClass, data) {
    if(true === Array.isArray(data))
    {
        data = data[0];
    }

    if('undefined' === typeof data || null === data)
    {
        return;
    }

    return new ModelClass(data, false);
};

// Generate identifier query
function getIdentifiersCriteria(model)
{
    var criteria = {};

    for(var identifier of model.$__identifiers)
    {
        criteria[identifier] = model.get(identifier);
    }

    return criteria;
}

// Create the transformer
var transformer = {

    // Create Callback
    create: function(error, values, modelName, callback) {
        if(error)
        {
            return callback(error);
        }

        var query = new Query(modelName);

        // Add the adapter
        query.adapter(adapter.bind({}, this.__proto__.constructor));

        query.create(values);
        query.exec(function(err, model) {

            callback(err, model);
        });
    },

    // Update Callback
    update: function(error, values, modelName, callback) {
        if(error)
        {
            return callback(error);
        }

        var query    = new Query(modelName),
            criteria = getIdentifiersCriteria(this);

        // Add the adapter
        query.adapter(adapter.bind({}, this.__proto__.constructor));

        query.update(criteria, values);
        query.exec(function(err, model) {

            callback(err, model);
        });
    },

    // Destroy Callback
    destroy: function(error, values, modelName, callback) {
        if(error)
        {
            return callback(error);
        }

        var query    = new Query(modelName),
            criteria = getIdentifiersCriteria(this);

        query.destroy(criteria);
        query.exec(function(err) {

            callback(err);
        });
    },

    statics:  {
        query: function() {
            var query = new Query(this.modelName);

            // Add the adapter
            query.adapter(adapter.bind({}, this));

            return query;
        },

        find: function(criteria = {}, callback = undefined) {
            return this.query().find(criteria, callback);
        },

        findOne: function(criteria = {}, callback = undefined) {
            return this.query().findOne(criteria, callback);
        },

        create: function(values = {}, callback = undefined) {
            return this.query().create(values, callback);
        },

        update: function(criteria = {}, values = {}, callback = undefined) {
            return this.query().update(criteria, values, callback);
        },

        destroy: function(criteria = {}, callback = undefined) {
            return this.query().destroy(criteria, callback);
        }
    }
};

module.exports = transformer;