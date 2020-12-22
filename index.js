//================================= TOKEN =======================================\\
//FUNCTION TO GET YOUR JWT TOKEN
function getToken(username, key) {
    
    //THE INFORMATION WE WILL PASS TO THE API IN THE BODY
    const body = {
        username: username,
        apikey: key
    };
    const json = JSON.stringify(body);
    
    //MAKING THE REQUEST, SETTING THE HEADER AND SENDING THE BODY OF THE REQUEST
    const jwtToken = new XMLHttpRequest();
    jwtToken.open("POST", "https://auto.resmarksystems.com/public/api/authenticate",false);
    jwtToken.setRequestHeader('Content-type','application/json; charset=utf-8');
    jwtToken.send(json);
    console.log('THIS EXECUTES!!!!!!!!!!!');
    token = jwtToken.responseText;

    //RETURNING THE TOKEN TO THE CALLING FUNCTION
    return(jwtToken.responseText);
}

//DECLARE GLOBAL VARIABLE THAT WILL BE POPULATED IN THNE RETURNTOKEN FUNCTION
let token;

//SET THE TOKEN VARIABLE AND SHOW THE TOKEN ON THE PAGE
function returnToken(username, key) {
    token = getToken(username,key);
    document.getElementById("jwtToken").innerText = token;
}

//================================= PRODUCTS =======================================\\
let productNameArray;

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

    //ISOLATING THE DATA ARRAY
    const productArray = parsedResponse.data;

    //CREATING A NEW ARRAY TO STORE PRODUCT NAMES
    const productNames = [];

    //LOOP THROUGH THE ARRAY ADDING THE PRODUCT NAMES TO THE PRODUCT NAMES ARRAY
    for (let x=0; x<productArray.length; x++) {
        
        productNames.push(productArray[x].name);
    }

    //RETURNING THE TOKEN TO THE CALLING FUNCTION
    return(productNames);
}

//ADDING AN EVENT LISTENER TO THE 'GET A LIST OF PRODUCTS BY NAME' BUTTON
document.getElementById("getProducts").addEventListener("click", function() {
    
    //GET THE ARRAY OF PRODUCT NAMES FOR THE BUSINESS USING THE GENERATED TOKEN
    productNameArray = getProducts(token);

    //UPDATES THE PAGE TO SHOW THE NEWLY OBTAINED TOKEN TO THE USER
    for (let x=0; x<productNameArray.length; x++) {
        document.getElementById("productsList").innerHTML += `<p class="productName">${productNameArray[x]}</p>`
    }
});