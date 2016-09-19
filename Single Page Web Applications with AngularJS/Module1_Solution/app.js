(function () {
'use strict';

angular.module('myFirstApp', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.inject = ['$scope','$filter'];

function LunchCheckController($scope,$filter)
{
  $scope.lunchData = "";
  var stringToReturn = "";

  $scope.checkOnClick = function(){
    if(! ($scope.lunchData))
    {
      stringToReturn = "Please enter data first";
    }
    else
    {
      var itemsArray = $scope.lunchData.split(',');
      var numberOfItemsForLunch = itemsArray.length;
      if(numberOfItemsForLunch<=3)
      {
        stringToReturn = "Enjoy!";

      }
      else
      {
        stringToReturn = "Too much!";
      }
    }
        $scope.outputText = stringToReturn;
  };
}

})();
