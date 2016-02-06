angular.module ('todoList.controllers')
    .controller('ToDoCtrl', [
        '$scope',
        'PersistenceService',
        function($scope, PersistenceService) {
            var localStorageKey = "List";

            $scope.tasksCol = PersistenceService.verify(localStorageKey) || [];
            $scope.lastID = 0;

            $scope.addTask = function () {
                console.log($scope.lastID);

                if ($scope.name !== undefined) {
                    ++$scope.lastID;

                    var taskItem = {
                        id : $scope.lastID,
                        name : $scope.name,
                        description : $scope.description,
                        dueDate : $scope.dueDate,
                        done : false
                    }

                    $scope.tasksCol.push(taskItem);

                    // Reset form fields
                    $scope.name = "";
                    $scope.description = "";
                    $scope.dueDate = "";
                }
            }

            // Syncs
            $scope.$watch('tasksCol', function(newValue, oldValue) {
                PersistenceService.save(localStorageKey, newValue);
            }, true);

            $scope.clearDoneTasks = function () {
                var listContainer = document.querySelector("#todoList");
                var taskItems = listContainer.querySelectorAll("li");

                for (var i = 0; i < taskItems.length; i++) {
                    var child = taskItems[i];

                    if (child.getAttribute("data-status") === "true") {
                        listContainer.removeChild(child);
                    }
                };
            };

            $scope.setDone = function (taskID) {
                $scope.tasksCol[taskID].done = document.querySelector("input#taskDone-" + taskID).checked ? true : false;
            };

            $scope.getTaskNumbers = function () {
                var n = 0;

                for (var i = 0; i < $scope.tasksCol.length; i++) {
                    var current = $scope.tasksCol[i];
                    n += current.done ? 0 : 1;
                };

                return n;
            }
}]);