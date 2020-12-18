import {token} from '/token.js';

function getProducts(token) {
    
    //MAKING THE REQUEST, SETTING THE HEADERS AND SENDING THE BODY OF THE REQUEST
    const products = new XMLHttpRequest();
    products.open("GET", "https://auto.resmarksystems.com/public/api/product",false);
    products.setRequestHeader('Content-type','application/json; charset=utf-8');
    //USES THE TOKEN OBTAINED IN TOKEN.JS FOR ACCESS
    products.setRequestHeader('Authorization',`Bearer ${token}`); 
    products.send();

    //PARSING THE RESPONSE TEXT TO TURN IT INTO JSON FROM A STRING
    const parsedResponse = JSON.parse(products.responseText);
    console.log('Parsed Response: ' + parsedResponse);

    //ISOLATING THE DATA ARRAY
    const productArray = parsedResponse.data;
    console.log('Product Array: ' + productArray);

    //CREATING A NEW ARRAY TO STORE PRODUCT NAMES
    const productNames = [];

    //LOOP THROUGH THE ARRAY ADDING THE PRODUCT NAMES TO THE PRODUCT NAMES ARRAY
    for (let x=0; x<productArray.length; x++) {
        productNames.push(productArray[x].name);
    }

    console.log('Product Names Array: ' + productNames)

    //RETURNING THE TOKEN TO THE CALLING FUNCTION
    return(productNames);
    //return(products.responseText);
}

const productNameArray = getProducts(token);

//ADDING AN EVENT LISTENER TO THE 'GET A JWT TOKEN BUTTON'
document.getElementById("getProducts").addEventListener("click", function() {
    //UPDATES THE PAGE TO SHOW THE NEWLY OBTAINED TOKEN TO THE USER
    for (let x=0; x<productNameArray.length; x++) {
        document.getElementById("productsList").innerHTML += `<p class="productName">${productNameArray[x]}</p>`
    }
  });