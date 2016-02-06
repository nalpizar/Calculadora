angular.module('persistence.services')

.service ('PersistenceService', 

	function() {

		var saveKey = function (key, object) {
			localStorage.setItem(key, angular.toJson(object)); 
		}

		var verifyKey = function(key) {
        	return angular.fromJson(localStorage.getItem(key));
        };

		var removeKey = function(key) {
			localStorage.removeItem(key);
		};

		return {
			save: saveKey,
			verify: verifyKey,
			remove: removeKey
		}
	}
);