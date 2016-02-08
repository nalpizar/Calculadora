angular.module ('todoList.controllers')
    .controller('ToDoCtrl', [
        '$scope',
        'PersistenceService',
        function($scope, PersistenceService) {
            var localStorageKey = "List";

            $scope.tasksCol = PersistenceService.verify(localStorageKey) || [];
            $scope.lastID = PersistenceService.verify("taskLastID") || 0;

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
            }

            $scope.countPending = function () {
              var counter = 0;

              for(i = 0; i < $scope.tasksCol.length; i++){
                if (!$scope.tasksCol[i].done) {
                  counter++;
                }
              };

              return counter;
            }

            $scope.$watch('tasksCol', function(newValue, oldValue) {
                PersistenceService.save(localStorageKey, newValue);
            }, true);

            $scope.$watch('lastID', function(newValue, oldValue) {
                PersistenceService.save("taskLastID", newValue);
            }, true);
        }
    ])

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

          for(i = 0; i < object.length; i++){
            if (object[i].id == currentID){
              task=object[i];
            }
          };

          return task
        };

        $scope.deleteItem = function () {

          if ($scope.tasksCol.length == 1) {
            $scope.tasksCol = [];
          } else {
            var target;

            for (var i = 0; i < $scope.tasksCol.length; i++) {
              if ($scope.tasksCol[i].id == currentID) {
                target = i;
              }
            }

            console.log(target);
            $scope.tasksCol.splice(target, 1);
          }

          $scope.lastID--;

          if ($scope.lastID < 0) {
            $scope.lastID = 0;
          }

          $location.path('/index.html');
        };

        $scope.setDone = function () {
          $scope.item.done = document.querySelector("input#taskDone-" + currentID).checked ? true : false;
        };
      }
    ])
;
