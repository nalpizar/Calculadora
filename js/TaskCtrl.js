angular.module ('description.controllers')
    .controller('TaskCtrl', [
        '$scope',
        '$routeParams',
        'PersistenceService',
        function($scope, $routeParams,PersistenceService) {
            var localStorageKey = "List";

            $scope.tasksCol = PersistenceService.verify(localStorageKey) || [];

      
         
            $scope.init = function () {               

          /*          var taskItem = {
                       id:$routeParams.id
                       description : $scope.description,
                       dueDate : $scope.dueDate,
  
                    };*/
$scope.tarea();

};



$scope.tarea= function(){
    var id = $routeParams.id;
    var tarea={};
    for (i=0;i<$scope.tasksCol.length;i++){
        if (id==$scope.tasksCol[i].id) {
      tarea=$scope.tasksCol[i];


        };
    

    }
console.log(tarea);
 return tarea;   
}

$scope.init();

}]);
