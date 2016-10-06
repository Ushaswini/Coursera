(function(){
  'use strict';

  angular.module('NarrowItDownApp',[])
  .controller('NarrowItDownController',NarrowItDownController)
  .service('MenuSearchService',MenuSearchService)
  .constant('ApiBasePath',"https://davids-restaurant.herokuapp.com")
  .directive('foundItems',FoundItemsDirective);


function FoundItemsDirective(){
  var ddo = {
    templateUrl:'foundItemsDirective.html',
    scope:{
      found:'<',
      onRemove:'&',
      myTitle:'@title'
    },
    controller:NarrowItDownController,
    controllerAs: 'list',
    bindToController:true
  };

  return ddo;
}
  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var narrowItDown = this;

    narrowItDown.searchText = "";
    narrowItDown.found = [];
    narrowItDown.title = "";

    narrowItDown.getList = function(){
      if(narrowItDown.searchText){
        var promise =  MenuSearchService.getMatchedMenuItems(narrowItDown.searchText.toLowerCase());
        promise.then(function(response){
          narrowItDown.found =response.matchedItems;
          if(response.matchedItems.length >0){
            narrowItDown.title = "";
          }else{
            narrowItDown.title = "Nothing Found!";
          }
        });
      }else{
        narrowItDown.found =[];
        narrowItDown.title = "Nothing Found!";
      }

    };

    narrowItDown.removeItem = function(itemIndex){
        MenuSearchService.remove(itemIndex);
    }

  }

  MenuSearchService.$inject=['$http','ApiBasePath'];
  function MenuSearchService($http,ApiBasePath){

    var service = this;
    var matchedItems = [];

    service.getMatchedMenuItems = function(searchText){

      return $http({
            method:"GET",
            url:(ApiBasePath + "/menu_items.json")
          })
      .then(function(response){
        console.log("response is",response);
        matchedItems = response.data.menu_items;
        matchedItems = matchedItems.filter(function(listItem){
          var isFound;
            if(listItem.description.indexOf(searchText) != -1){
              isFound= true;
            }else{
              isFound=false;
            }
            return isFound;
        });
        console.log("matchedItems are", matchedItems);
        return {matchedItems: matchedItems};
      });
    };

    service.remove = function(itemIndex){
     matchedItems.splice(itemIndex,1);
    };
  }

})();
