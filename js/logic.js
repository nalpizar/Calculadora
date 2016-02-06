angular.module('todoList',[
    'ngRoute',
    'todoList.controllers'
]).config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/taskList.html',
            controller : 'ToDoCtrl'
        })
        .when('/description/:id', {
            templateUrl: 'views/taskDescription.html'
        })
        .otherwise({redirectTo: '/'});
}]);

angular.module('todoList.controllers', []);