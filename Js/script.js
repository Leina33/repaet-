//pizza constructor
function Pizza(size, crust) {
    this.size = size;
    this.crust = crust;
    this.toppings = [];
  }
  
  //price size
  var sizePrice = {
    small: 700,
    medium: 900,
    large: 1200
  };
  var toppingPrice = [
    {
      pepperoni: {
        small: 50,
        medium: 90,
        large: 150
      },
      veges: {
        small: 30,
        medium: 50,
        large: 70,
      },
      bacon: {
        small: 50,
        medium: 75,
        large: 100
      }
    }
  ];
  //crust price
  var crustPrice = {
    crispy: 300,
    stuffed: 200,
    gluten: 100
  };
  //function that calculates  prize according to size
  function sizeCalcPrice(size) {
    if (size === "small") {
      return sizePrice.small * 1;
    } else if (size === "medium") {
      return sizePrice.medium * 1;
    } else {
      return sizePrice.large * 1;
    }
  }
  
  //price according to crust
  function crustCalcPrice(crust) {
    if (crust === "crispy") {
      return crustPrice.crispy * 1;
    } else if (crust === "stuffed") {
      return crustPrice.stuffed * 1;
    } else {
      return crustPrice.gluten * 1;
    }
  }
  // price according to topping
  function toppingsCalcPrice(toppings) {
    var noOfTopping = 0;
    for (i = 0; i < toppings.length; i++) {
      if (toppings[i] == "pepperoni") {
        noOfTopping += 100;
      }
      if (toppings[i] == "veges") {
        noOfTopping += 50;
      }
      if (toppings[i] == "bacon") {
        noOfTopping += 75;
      }
    }
    return noOfTopping * 1;
  }
  
  //function check for an element in array
  function checkPepperoni(topping) {
    return topping === "pepperoni";
  }
  
  // *********UI Logic***********//
  $("document").ready(function() {
    //fetch size of pizza
    function getPizzaSize() {
      return $("#pizza-size")
        .find(":selected")
        .val();
    }
    //fetch crust of pizza
    function getCrust() {
      return $("#pizza-crust")
        .find(":selected")
        .val();
    }
    //fetch topping of pizza
    function getToppings() {
      var toppingList = [];
      $(".toppings :checked").each(function() {
        toppingList.push($(this).val());
      });
      return toppingList;
    }
  
    //submit event
    $("form#myform").submit(function(event) {
      event.preventDefault();
      var pizzaSize = getPizzaSize();
      var crust = getCrust();
      var toppingList = getToppings();
  
      var newPizza = new Pizza(pizzaSize, crust);
      newPizza.toppings.push(toppingList);
      $("#cart").hide();
      $("#table").show();
      $(".checkout").show();
      var oneOrder =
        sizeCalcPrice(pizzaSize) +
        crustCalcPrice(crust) +
        toppingsCalcPrice(toppingList);
  
      //append item to the cart when submit event is triggered
      $("#items").append(
        "<tr>" +
          "<td>" +
          newPizza.size +
          "</td>" +
          "<td>" +
          "<p>" +
          newPizza.crust +
          "</p>" +
          "</td>" +
          "<td>" +
          newPizza.toppings +
          "</td>" +
          "<td>" +
          oneOrder +
          "</td>" +
          "</tr>"
      );
    });
    var totalQuantity = parseInt($("#quantity").val());
    function calcTotal() {
      var priceOnePizza =
        sizeCalcPrice(getPizzaSize()) +
        crustCalcPrice(getCrust()) +
        toppingsCalcPrice(getToppings());
      return priceOnePizza;
    }
    var pizzaList = [];
    //what happens when submit button is triggered
    $("#orderbtn").on("click", function() {
      totalQuantity += 1;
      $("#quantity").text(totalQuantity);
      pizzaList.push(calcTotal());
    });
  
    //display total prize of your order
    $("#gettotal").click(function() {
      var total = 0;
      pizzaList.forEach(function(pizza) {
        total += pizza;
      });
      $("#money").text(total);
    });
});