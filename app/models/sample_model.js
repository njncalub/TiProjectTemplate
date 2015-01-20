!function() {
    var Alloy    = require('alloy'),
        Backbone = require('alloy/backbone'),
        _        = require('alloy/underscore');
    
    exports.definition = {
        config: {
            "adapter": {
                "type"           : "sql",
                "collection_name": "sample_model",
                "idAttribute"    : "objectId",
            },
            "columns": {
                "objectId": "text primary key",
            },
            "defaults": {},
        },
        
        extendModel: function(Model) {
            _.extend(Model.prototype, {});
            
            return Model;
        },
        
        extendCollection: function(Collection) {
            var S4 = function() {
                return (0 | 65536 * (1 + Math.random())).toString(16).substring(1);
            };
         
            var guid = function() {
                return S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4();
            };
            
            _.extend(Collection.prototype, {
                
                deleteAll: function() {
                    var collection = this;
                    
                    var sqlStatement = "DELETE FROM " + collection.config.adapter.collection_name;
                    
                    var db = Ti.Database.open(collection.config.adapter.db_name);
                    
                    db.execute(sqlStatement);
                    db.close();
                    
                    collection.trigger("sync");
                },
                
                saveAll: function() {
                    var collection = this;
                    
                    var table   = collection.config.adapter.collection_name;
                    var columns = collection.config.columns;
                    
                    var db = Ti.Database.open(collection.config.adapter.db_name);
                    db.execute("BEGIN;");
                    
                    collection.each(function(model) {
                        if (!model.id) {
                            model.id = guid();
                            model.attributes[model.idAttribute] = model.id;
                        }
                        
                        var names  = [],
                            values = [],
                            q      = [];
                        
                        for (var k in columns) {
                            names.push(k);
                            values.push(model.get(k));
                            q.push("?");
                        }
                        
                        var sqlStatement = "INSERT INTO " + table + " (" + names.join(",") + ") VALUES (" + q.join(",") + ");";
                        
                        db.execute(sqlStatement, values);
                    });
                    
                    db.execute("COMMIT;");
                    db.close();
                    
                    collection.trigger("sync");
                },
                
            });

            return Collection;
        },
    }
}();
