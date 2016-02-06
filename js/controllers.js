angular.module ('todoList.controllers')
    .controller('ToDoCtrl',[
        '$scope',
<<<<<<< HEAD
        function($scope) {
            $scope.tasksCol = [];
            $scope.lastID = 0;
=======
        'PersistenceService',
        function($scope, PersistenceService) {
            $scope.tasksCol = PersistenceService.verify('List') || [];
>>>>>>> 5dbb0526eff361cc8fc7fdd099e8518c8bcbf7a9

            $scope.addTask = function () {
                if ($scope.name !== undefined && $scope.description !== undefined && $scope.dueDate !== undefined) {
                    var itemTask = {};
                    itemTask.name = $scope.name;
                    itemTask.description = $scope.description;
                    itemTask.dueDate = $scope.dueDate;
                    itemTask.done = false;
                    itemTask.id = $scope.lastID;

                    $scope.lastID++;

                    $scope.tasksCol.push(itemTask);

                    $scope.name = '';
                    $scope.description = '';
                    $scope.dueDate = '';
                }
            };

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