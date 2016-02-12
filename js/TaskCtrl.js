angular.module ('todoList.controllers')
.controller('TaskCtrl',[
      '$scope',
      'PersistenceService',
      '$routeParams',
      '$location',
      function($scope, PersistenceService, $routeParams, $location) {
        var localStorageKey = "List";
        var currentID = $routeParams.id;

        $scope.tasksCol = PersistenceService.verify(localStorageKey) || [];
        $scope.lastID = PersistenceService.verify("taskLastID");

        $scope.item = returnItem($scope.tasksCol);

        $scope.$watch('tasksCol', function(newValue, oldValue) {
            PersistenceService.save(localStorageKey, newValue);
        }, true);

        $scope.$watch('lastID', function(newValue, oldValue) {
            PersistenceService.save("taskLastID", newValue);
        }, true);

        function returnItem (object) {
          var task;

          for(i = 0; i < object.length; i++) {
            if (object[i].id == currentID) {
              task=object[i];
            }
          };

          return task
        };

        $scope.deleteItem = function () {

          if ($scope.tasksCol.length == 1) {
            $scope.tasksCol = [];
            $scope.lastID = 0;
          } else {
            var target;

            for (var i = 0; i < $scope.tasksCol.length; i++) {
              if ($scope.tasksCol[i].id == currentID) {
                target = i;
              }
            }

            $scope.tasksCol.splice(target, 1);
            
          }

          $location.path('/index.html');
        };

      }
    ])
;
