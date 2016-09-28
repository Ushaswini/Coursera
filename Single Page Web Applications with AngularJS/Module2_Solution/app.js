(function(){
  'use strict';

  angular.module('ShoppingListCheckOff',[])
  .controller('ToBuyController',ToBuyController)
  .controller('AlreadyBoughtController',AlreadyBoughtController)
  .service('ShoppingListCheckOffService',ShoppingListCheckOffService);



  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){

    var ToBuyList = this;

    ToBuyList.items = ShoppingListCheckOffService.getToBuyItems();

    ToBuyList.bought = function(itemIndex){
      ShoppingListCheckOffService.alreadyBought(itemIndex);
    };

  }


  AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService){

    var boughtList =this;

    boughtList.boughtItems = ShoppingListCheckOffService.getAlreadyBoughtItems();
  }

  function ShoppingListCheckOffService(){

    var service = this;

    var ToBuy = [
                  {name:"Cookies", quantity:10},
                  {name:"Cookies", quantity:11},
                  {name:"Cookies", quantity:12},
                  {name:"Cookies", quantity:13},
                  {name:"Cookies", quantity:14}

    ];

    var AlreadyBought =[];

    service.getToBuyItems = function(){
      return ToBuy;
    };

    service.getAlreadyBoughtItems = function(){
      return AlreadyBought;
    };

    service.alreadyBought = function(indexOfItem){
      var item = ToBuy[indexOfItem];

      ToBuy.splice(item,1);
      AlreadyBought.push(item);
    };

  }

})();
