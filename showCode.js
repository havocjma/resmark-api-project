//===============================  SHOW JWT TOKEN CODE  ===============================\\
document.getElementById("getTokenCode").addEventListener("click", function() {

    //TOGGLE THE VISIBILITY OF THE DIV WITH AN ANIMATION DEPENDING ON THE CURRENT STATE
    let code = document.getElementById("tokenCode");
    let arrow = document.getElementById("jwtArrow");

    if (code.style.display == "block") {
        code.style.display = "none";
        arrow.classList.remove("up");
        arrow.classList.add("down");
    } else {
        code.style.display = "block";
        arrow.classList.remove("down");
        arrow.classList.add("up")
    }
});

//===============================  SHOW PRODUCTS CODE  ===============================\\
document.getElementById("getProductsCode").addEventListener("click", function() {

    //TOGGLE THE VISIBILITY OF THE DIV WITH AN ANIMATION DEPENDING ON THE CURRENT STATE
    let code = document.getElementById("productsCode");
    let arrow = document.getElementById("productsArrow");

    if (code.style.display == "block") {
        code.style.display = "none";
        arrow.classList.remove("up");
        arrow.classList.add("down");
    } else {
        code.style.display = "block";
        arrow.classList.remove("down");
        arrow.classList.add("up");
    }
});


//===============================  SHOW DATE AND PARTICIPANT CODE  ===============================\\
document.getElementById("getDatesCode").addEventListener("click", function() {

    //TOGGLE THE VISIBILITY OF THE DIV WITH AN ANIMATION DEPENDING ON THE CURRENT STATE
    let dateCode = document.getElementById("datesCode");
    let dateArrow = document.getElementById("datesArrow");
    let cartCode = document.getElementById("cartCode");
    let cartArrow = document.getElementById("cartArrow");
    
    //TEAR DOWN THE CREATE CART ELEMENTS IF IT IS ON
    if (cartCode.style.display == "block") {
        cartCode.style.display = "none";
        cartArrow.classList.remove("up");
        cartArrow.classList.add("down");
    }

    //UPDATE THE PRODUCT API ELEMENTS
    if (dateCode.style.display == "block") {
        dateCode.style.display = "none";
        dateArrow.classList.remove("up");
        dateArrow.classList.add("down");
    } else {
        dateCode.style.display = "block";
        dateArrow.classList.remove("down");
        dateArrow.classList.add("up");
    }
});

document.getElementById("getCreateCartCode").addEventListener("click", function() {

    //TOGGLE THE VISIBILITY OF THE DIV WITH AN ANIMATION DEPENDING ON THE CURRENT STATE
    let dateCode = document.getElementById("datesCode");
    let dateArrow = document.getElementById("datesArrow");
    let cartCode = document.getElementById("cartCode");
    let cartArrow = document.getElementById("cartArrow");

    //TEAR DOWN THE DATE ELEMENTS IF IT IS ON
    if (dateCode.style.display == "block") {
        dateCode.style.display = "none";
        dateArrow.classList.remove("up");
        dateArrow.classList.add("down");
    }

    //UPDATE THE CREATE CART API ELEMENTS
    if (cartCode.style.display == "block") {
        cartCode.style.display = "none";
        cartArrow.classList.remove("up");
        cartArrow.classList.add("down");
    } else {
        cartCode.style.display = "block";
        cartArrow.classList.remove("down");
        cartArrow.classList.add("up");
    }
});

//===============================  SHOW CUSTOMER CODE  ===============================\\
document.getElementById("getCustomerCode").addEventListener("click", function() {

    //TOGGLE THE VISIBILITY OF THE DIV WITH AN ANIMATION DEPENDING ON THE CURRENT STATE
    let code = document.getElementById("customerCode");
    let arrow = document.getElementById("customerArrow");

    if (code.style.display == "block") {
        code.style.display = "none";
        arrow.classList.remove("up");
        arrow.classList.add("down");
    } else {
        code.style.display = "block";
        arrow.classList.remove("down");
        arrow.classList.add("up");
    }
});

//===============================  SHOW ORDER CODE  ===============================\\
document.getElementById("getOrderCode").addEventListener("click", function() {

    //TOGGLE THE VISIBILITY OF THE DIV WITH AN ANIMATION DEPENDING ON THE CURRENT STATE
    let code = document.getElementById("orderCode");
    let arrow = document.getElementById("orderArrow");

    if (code.style.display == "block") {
        code.style.display = "none";
        arrow.classList.remove("up");
        arrow.classList.add("down");
    } else {
        code.style.display = "block";
        arrow.classList.remove("down");
        arrow.classList.add("up");
    }
});