angular.module ('todoList.controllers')
    .controller('ToDoCtrl', [
        '$scope',
        'PersistenceService',
        function($scope, PersistenceService) {
            var localStorageKey = "List";

            $scope.tasksCol = PersistenceService.verify(localStorageKey) || [];
            $scope.lastID = 0;

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

            $scope.$watch('tasksCol', function(newValue, oldValue) {
                PersistenceService.save(localStorageKey, newValue);
            }, true);
        }
    ])

    .controller('TaskCtrl',[
        '$scope',
        'PersistenceService',
        '$routeParams',
        function($scope,PersistenceService,$routeParams){
            var localStorageKey ="List";
            var currentID=$routeParams.id;
            $scope.tasksCol=PersistenceService.verify(localStorageKey) || [];

            $scope.item= returnItem($scope.tasksCol);

            function returnItem(object){

               var task;


                for(i=0;i<object.length ; i++){
                    if (object[i].id == currentID){
                        task=object[i];
                    }
                };

                return task
            }
        $scope.DeleteItem= function(){
            currentID-=1;
            $scope.tasksCol.splice(currentID, 1);
           // console.log($scope.item,currentID);
           window.location='/index.html';   
         

     }


        }





    ])
