angular.module ('calcApp', [])

.controller('calcCtrl', [
    '$scope',
    function($scope) {

            $scope.output = '0';
            $scope.pendingValue = null;

            $scope.getVal = function(btn) {
                if($scope.output == '0') {
                    $scope.output = btn;
                } else {
                    $scope.output += String(btn);
                }
                $scope.pendingValue = parseInt($scope.output);
            };

            clear = function(number) {
                $scope.output = number;
            };
            var array = [];
            $scope.save = function() {

                array.push($scope.pendingValue)
                clear('0');
            };

            $scope.operator = '+';

            var num1 = array[0];
            var num2 = array[1];

            $scope.sum = function() {
                $scope.save();
                if(array[1] != undefined && array[0] != undefined ) {
                    console.log(array[0]+ array[1] );
                    array = [];
                }
                $scope.pendingValue = 0;
            };
    }
])