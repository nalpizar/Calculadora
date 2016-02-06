angular.module ('description.controllers')
    .controller('TaskCtrl', [
        '$scope',
        'PersistenceService',
        function($scope, PersistenceService) {
            var localStorageKey = "List";

            $scope.tasksCol = PersistenceService.verify(localStorageKey) || [];
            $scope.lastID = 0;

            $scope.init = function () {               

                    var taskItem = {
                        id : $scope.lastID,
                        description : $scope.description,
                        dueDate : $scope.dueDate,
  
                    };

};

$scope.init();

}]);
