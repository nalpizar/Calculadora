angular.module ('todoList.controllers')
.controller('ToDoCtrl', [
        '$scope',
        '$routeParams',
        'PersistenceService',
        function($scope, $routeParams, PersistenceService) {
            var localStorageKey = "List";

            $scope.tasksCol = PersistenceService.verify(localStorageKey) || [];
            $scope.lastID = PersistenceService.verify("taskLastID") || 0;
            $scope.notFound = false;

            $scope.addTask = function () {
              $scope.lastID++;

              var taskItem = {
                  id : $scope.lastID,
                  name : $scope.name,
                  description : $scope.description,
                  dueDate : $scope.dueDate,
                  done : false
              }

              $scope.tasksCol.push(taskItem);

              if ($scope.taskForm) {
                $scope.taskForm.$setPristine();
                $scope.taskForm.$setUntouched();
                $scope.name = "";
                $scope.description = "";
                $scope.dueDate = "";
              }
            }

            if ($routeParams.error != "" && $routeParams.error == "error") {
              $scope.notFound = true;
            }

            $scope.$watch('tasksCol', function(newValue, oldValue) {
                PersistenceService.save(localStorageKey, newValue);
            }, true);

            $scope.$watch('lastID', function(newValue, oldValue) {
                PersistenceService.save("taskLastID", newValue);
            }, true);
        }
    ])