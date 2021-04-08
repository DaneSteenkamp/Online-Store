// jQuery function to drop down the navbar when from toggel button when the page is displayed on a small screen 
$(function() {
    $(".navbar-toggler").on('click', function() {

        $(".navbar navbar-expand-lg navbar-light bg-light").slideDown();

    })
});

$(function() {
    $("#cattoggel").on('click', function() {

        $("#navslidedown").slideUp();

    })
});



// Declaring Object Products list 
let products = [

    {
        name: "Amazon Echo 3rd Gen",
        tag: "Echo-3rd-gen",
        price: 2495.00,
        inCart: 0

    },
    {
        name: "Amazon Echo Dot 3rd Gen",
        tag: "Echo-dot-3rd-gen",
        price: 990.00,
        inCart: 0

    },
    {
        name: "Google Home",
        tag: "Google-home",
        price: 2299.00,
        inCart: 0

    },
    {
        name: "Xaomi Alarm Sensor Kit",
        tag: "Alarm-system",
        price: 1399.00,
        inCart: 0

    },
    {
        name: "Xaomi Motion Sensor",
        tag: "Sensor",
        price: 299.00,
        inCart: 0

    },
    {
        name: "Xaomi Wirless Switch",
        tag: "Switch",
        price: 289.00,
        inCart: 0

    },
    {
        name: "Deebot 900",
        tag: "Deebot",
        price: 4899.00,
        inCart: 0

    },
    {
        name: "Sonoff Smart Light Switch",
        tag: "Sonoff",
        price: 489.00,
        inCart: 0

    },
    {
        name: "Nest Thermostat",
        tag: "Nest",
        price: 3675.00,
        inCart: 0

    },
    {
        name: "Xiaomi Smart Home IP AI 360 Security Camera 1080P",
        tag: "Camera-first",
        price: 999.00,
        inCart: 0

    },
    {
        name: "Xiaomi Mi Smart HD WiFi Dash Cam with Night Vision",
        tag: "Camera-second",
        price: 1199.00,
        inCart: 0

    },
    {
        name: "Go Pro Hero 8",
        tag: "Go-Pro",
        price: 6999.00,
        inCart: 0

    }
]

// This function on click of the add to cart button on catalogue page runs functions cartNumber & totalCost
let addtocart = document.querySelectorAll(".cartbtn");

for (let i = 0; i < addtocart.length; i++) {
    addtocart[i].addEventListener("click", () => {
        cartNumbers(products[i]);
        totalCost(products[i])

        alert("click on the shopping cart above to see product in cart and how much you owe");
    })
}

//This function adds 1 to the shopping cart 
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem("cartNumbers")

    if (productNumbers) {
        document.querySelector("#counter").textContent = productNumbers;
    }
}

//This function lets you know how many product you have in your shopping cart 
function cartNumbers(product) {

    let productNumbers = localStorage.getItem("cartNumbers")

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector("#counter").textContent = productNumbers + 1;
    } else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector("#counter").textContent = 1;
    }

    setItems(product);

}

//This function is linking the add to cart button to its related product from the Products object list defined above
function setItems(product) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {

        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}

// This function calculates the total cost of the cart determend by how many products are added 
function totalCost(product) {
    let cartCost = localStorage.getItem("totalCost");


    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);

    } else {
        localStorage.setItem("totalCost", product.price);
    }


}

//This function displays the products on the cart page 
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart")
    cartItems = JSON.parse(cartItems);
    let shoppingCart = document.querySelector(".productscontainer")
    let cartCost = localStorage.getItem("totalCost");
    let productsinside = document.getElementsByClassName('productsinside');



    if (cartItems && shoppingCart) {
        shoppingCart.innerHTML = " ";
        Object.values(cartItems).map(item => {
            shoppingCart.innerHTML += `<div class="productsinside" >
        <img class="pic" src = ./images/${item.tag}.jpg>
        <div class= "productname">${item.name}</div>
        <div class= "price">Price R ${item.price}</div>
        <div class= "vat">Vat R${item.price * 15/100}</div>
        <div class="qty"><input type="text" placeholder="Qty ${item.inCart}" class="input"></div>
        <div class=mastertotal>R ${item.inCart * item.price + item.price * 15/100 * item.inCart }</div>
        </div>`
        })

        let vat = cartCost * 15 / 100
        cartCost = JSON.parse(cartCost);

        shoppingCart.innerHTML += `

    <input type="button" class="clearcart" value="Clear Cart" onclick="clearClick()">

    <div class="mainheading">
         Choose Your Delivery Option
        </div>

        <span class="product-header">
            <form class="deliveryoption">
            
            <h6 class="label" id="label1">Collection  <input type="checkbox" class="tick" id="tick1"> </h6> 
            <p class="p" id="p1">Free - In Store</p>
            <input type="button" class="addbtn" id="addbtn1" value="Add to Total">
          
          
             <h6 class="label" id="label2">Delivery Option 1 <input type="checkbox" class="tick" id="tick2"> </h6>
             
             <span class="show">
                <p class="p" id="p2">- Less than 50Km R 150.00</p>
                <input type="button" class="addbtn" id="addbtn2" value="Add to Total">
            </span>
           
              <h6 class="label" id="label3">Delivery Option 2 <input type="checkbox" class="tick" id="tick3"> </h6>
             
             <span class="show">
                <p class="p" id="p3">- More than 50Km R 400.00</p>
                <input type="button" class="addbtn" id="addbtn3" value="Add to Total">
            </span>
            </form>
        </span>

    <span class="shoppingCarttotalContainer">
      <div class="Promo">
            <h6 class="ddheader">Click On A Number From 1 to 10 To Qualify For A Discount</h6>
                <nav id="nav">
                    <ul id="maindrop">
                        <li>1-10</li>
                        <ul id="subdrop">
                            <li id="a">1</li>
                            <li id="b">2</li>
                            <li id="c">3</li>
                            <li id="d">4</li>
                            <li id="e">5</li>
                            <li id="f">6</li>
                            <li id="g">7</li>
                            <li id="h">8</li>
                            <li id="i">9</li>
                            <li id="j">10</li>
                        </ul>
                    </ul>
                </nav>
            <input id="promocode" type="text" placeholder="Promo Code">
            <input type="button" onclick="promo()" value="Apply Discount" class="applybtn">
            </div>
        <h6 class="shoppingCarttotaltitle">Shopping Cart Total Is</h6>
        <h6 class="shoppingCarttotal">R ${cartCost + vat  } Including VAT</h6>
        <h6 class="newshoppingCarttotal">R ${cartCost + vat + 150 } Including VAT & Delivery</h6>
        <h6 class="bigshoppingCarttotal">R ${cartCost + vat + 400 } Including VAT & Delivery</h6>
        <h6 class="discount10Carttotal">R ${(cartCost + vat) * 0.10} Discount</h6>
        <h6 class="discount20Carttotal">R ${(cartCost + vat) * 0.10} Discount</h6>
        <h6 class="grandshoppingCarttotal">Grand Total R ${cartCost + vat - (cartCost + vat) * 0.10}</h6>
        <h6 class="grandshoppingCarttotal2">Grand Total R ${cartCost + vat - (cartCost + vat) * 0.20}</h6>

    </span>`
    }
}

onLoadCartNumbers();
displayCart();


// This function clears the shopping cart by clearing storage a refreshing the page 
function clearClick() {

    localStorage.clear();
    location.reload();
}

// jQuery function that slides up the non needed delivery options when the tick boxs is checked 
$(function() {
    $("#tick1").on('click', function() {

        $("#label2").slideUp();
        $("#label3").slideUp();
        $("#addbtn2").slideUp();
        $("#addbtn3").slideUp();
        $("#p2").slideUp();
        $("#p3").slideUp();


    })
});

$(function() {
    $("#tick2").on('click', function() {

        $("#label1").slideUp();
        $("#label3").slideUp();
        $("#addbtn1").slideUp();
        $("#addbtn3").slideUp();
        $("#p1").slideUp();
        $("#p3").slideUp();


    })
});

$(function() {
    $("#tick3").on('click', function() {

        $("#label1").slideUp();
        $("#label2").slideUp();
        $("#addbtn1").slideUp();
        $("#addbtn2").slideUp();
        $("#p1").slideUp();
        $("#p2").slideUp();


    })
});

// jQuery function that adds delivery amount to total cost on click of add to total buttons
$(function() {
    $("#addbtn1").on('click', function() {

        $(".shoppingCarttotal").append("  Please Collect Items In Store");

    })
});

$(function() {
    $("#addbtn2").on('click', function() {
        $(".newshoppingCarttotal").show();
        $(".shoppingCarttotal").hide();

    })
});

// jQuery function that drops down the numbers to be selected from 1 -10
$(function() {
    $("#addbtn3").on('click', function() {
        $(".bigshoppingCarttotal").show();
        $(".shoppingCarttotal").hide();

    })
});




$(function() {
    $("#maindrop").hover(function() {
        $("#subdrop").slideDown();
    })
    $("#maindrop").mouseleave(function() {
        $("#subdrop").slideUp();
    })

});


// jQuery function that changes the color of each number on hover to blue 
$(function() {
    $("#a").hover(function() {
        $("#a").css({
            color: '#45C3F5'
        });
    })
    $("#b").hover(function() {
        $("#b").css({
            color: '#45C3F5'
        });
    })
    $("#c").hover(function() {
        $("#c").css({
            color: '#45C3F5'
        });
    })
    $("#d").hover(function() {
        $("#d").css({
            color: '#45C3F5'
        });
    })
    $("#e").hover(function() {
        $("#e").css({
            color: '#45C3F5'
        });
    })
    $("#f").hover(function() {
        $("#f").css({
            color: '#45C3F5'
        });
    })
    $("#g").hover(function() {
        $("#g").css({
            color: '#45C3F5'
        });
    })
    $("#h").hover(function() {
        $("#h").css({
            color: '#45C3F5'
        });
    })
    $("#i").hover(function() {
        $("#i").css({
            color: '#45C3F5'
        });
    })
    $("#j").hover(function() {
        $("#j").css({
            color: '#45C3F5'
        });
    })

});

// jQuery function that changes the color of each number on mouseleave to white 
$(function() {
    $("#a").mouseleave(function() {
        $("#a").css({
            color: 'white'
        });
    })
    $("#b").mouseleave(function() {
        $("#b").css({
            color: 'white'
        });
    })
    $("#c").mouseleave(function() {
        $("#c").css({
            color: 'white'
        });
    })
    $("#d").mouseleave(function() {
        $("#d").css({
            color: 'white'
        });
    })
    $("#e").mouseleave(function() {
        $("#e").css({
            color: 'white'
        });
    })
    $("#f").mouseleave(function() {
        $("#f").css({
            color: 'white'
        });
    })
    $("#g").mouseleave(function() {
        $("#g").css({
            color: 'white'
        });
    })
    $("#h").mouseleave(function() {
        $("#h").css({
            color: 'white'
        });
    })
    $("#i").mouseleave(function() {
        $("#i").css({
            color: 'white'
        });
    })
    $("#j").mouseleave(function() {
        $("#j").css({
            color: 'white'
        });
    })

});

// jQuery function that alerts the user on selection of a number if they recive a discount or not
$(function() {
    $("#a").click(function() {
        alert("Sorry better luck next time - no discount ")
        $("#subdrop >li").css({
            display: "none"
        })
    });
    $("#b").click(function() {
        alert("Sorry better luck next time - no discount ")
        $("#subdrop >li").css({
            display: "none"
        })
    });
    $("#c").click(function() {
        alert("Congratulations you recived 10% off your order- Promo code:[ Promo10987 ] Enter Promo Code below & click Apply Discount  ")
        $("#subdrop >li").css({
            display: "none"
        })
    });
});
$("#d").click(function() {
    alert("Sorry better luck next time - no discount ")
    $("#subdrop >li").css({
        display: "none"
    })
});
$("#e").click(function() {
    alert("Sorry better luck next time - no discount ")
    $("#subdrop >li").css({
        display: "none"
    })
});
$("#f").click(function() {
    alert("Sorry better luck next time - no discount ")
    $("#subdrop >li").css({
        display: "none"
    })
});
$("#g").click(function() {
    alert("Sorry better luck next time - no discount ")
    $("#subdrop >li").css({
        display: "none"
    })
});
$("#h").click(function() {
    alert("Congratulations you recived 20% off your order- Promo code:[ Promo20123 ] Enter Promo Code below & click Apply Discount")
    $("#subdrop >li").css({
        display: "none"
    })
});
$("#i").click(function() {
    alert("Sorry better luck next time - no discount ")
    $("#subdrop >li").css({
        display: "none"
    })
});
$("#j").click(function() {
    alert("Sorry better luck next time - no discount ")
    $("#subdrop >li").css({
        display: "none"
    })
});


// function that applys discount to total when the user enters the promo code clicks the apply discount button 
function promo() {

    let promocode = document.getElementById("promocode").value;

    if (promocode == "Promo10987") {

        $(".discount10Carttotal").show()
        $(".grandshoppingCarttotal").show()

    } else if (promocode == "Promo20123") {
        $(".discount20Carttotal").show()
        $(".grandshoppingCarttotal2").show()

    } else {
        $(".shoppingCarttotal").append(" Sorry No Discount Today");
    }
}

let x = Math.floor((Math.random() * 1000) + 1);

// jQuery function that shows thankyou message and generates a random order number on click of submit order button 
function promocode() {
   
            $(".congratsimage").fadeIn(2000);
            $(".congratsmessage").fadeIn();
            $(".congratsbox").css({ border: "10px solid #45C3F5" });
            $(".congratsmessage").fadeIn();
            $(".congratsmessage").animate({ fontSize: "25px" }, 6000);

            document.querySelector(".congratsmessage").innerHTML = "Congrats your order has been placed" + " " + "Order Number:" + " " + x;
}