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
document.getElementById("getDateAndPartCode").addEventListener("click", function() {

    //TOGGLE THE VISIBILITY OF THE DIV WITH AN ANIMATION DEPENDING ON THE CURRENT STATE
    let code = document.getElementById("dateAndPartCode");
    let arrow = document.getElementById("dateAndPartArrow");

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