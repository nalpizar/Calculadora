angular.module('persistence.services')

.service ('PersistenceService',

	function($routeParams) {

		var saveKey = function (key, object) {
			localStorage.setItem(key, angular.toJson(object)); 
		}

		var verifyKey = function(key) {
        	return angular.fromJson(localStorage.getItem(key));
        };

		var removeKey = function(key) {
			localStorage.removeItem(key);
		};

		

        var returnItem= function(verifyKey){
        	var currentID=$routeParams.id
            var task;

            for(i=0;i<verifyKey.length;i++){
            	if (verifyKey[i].id== currentID){
            		task=verifyKey[i]
            	}
           return task;

            }

        };//returnItem



      




		return {
			save: saveKey,
			verify: verifyKey,
			remove: removeKey,
			taskId:returnItem
		}
	}


        




);