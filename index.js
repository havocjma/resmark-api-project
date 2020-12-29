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
    jwtToken.open("POST", "https://app.resmarksystems.com/public/api/authenticate",false);
    jwtToken.setRequestHeader('Content-type','application/json; charset=utf-8');
    jwtToken.send(json);
    
    token = jwtToken.responseText;

    //RETURNING THE TOKEN TO THE CALLING FUNCTION
    return(jwtToken.responseText);
}

//DECLARE GLOBAL VARIABLE THAT WILL BE POPULATED IN THNE RETURNTOKEN FUNCTION
let token;

//SET THE TOKEN VARIABLE AND SHOW THE TOKEN ON THE PAGE
function returnToken(username, key) {
    token = getToken(username,key);
    document.getElementById("jwtToken").innerText =  token;
}

//================================= PRODUCTS =======================================\\

//FUNCTION TO GET AN ARRAY OF PRODUCT OBJECTS THE HAVE THE NAME, OVERVIEW AND IMAGE
function getProducts(token) {
    
    //MAKING THE REQUEST, SETTING THE HEADERS AND SENDING THE BODY OF THE REQUEST
    const products = new XMLHttpRequest();
    products.open("GET", "https://app.resmarksystems.com/public/api/product",false);
    products.setRequestHeader('Content-type','application/json; charset=utf-8');
    //USES THE TOKEN OBTAINED IN TOKEN.JS FOR ACCESS
    products.setRequestHeader('Authorization',`Bearer ${token}`); 
    products.send();

    //PARSING THE RESPONSE TEXT TO TURN IT INTO JSON FROM A STRING
    const parsedResponse = JSON.parse(products.responseText);

    //ISOLATING THE DATA ARRAY
    const productArray = parsedResponse.data;

    //DEFINE THE OBJECT THAT WILL STORE THE PRODUCT DATA
    let newProductArray = [];

    //UPDATES THE PAGE TO SHOW THE NEWLY OBTAINED TOKEN TO THE USER
    for (let x=0; x<productArray.length; x++) {
        
        //CREATE AN OBJECT THAT HAS ALL THE INFORMATION FOR THE PRODUCT
        let productObject = {
            name: productArray[x].name,
            overview: productArray[x].overview,
            image: productArray[x].images[0].small
        }

        //PUSH THE PRODUCT OBJECT TO THE NEW PRODUCT ARRAY
        newProductArray.push(productObject);
    }

    //RETURN THE PRODUCT ARRAY TO THE CALLING FUNCTION
    return(newProductArray);
}

//ADDING AN EVENT LISTENER TO THE 'GET A LIST OF PRODUCTS BY NAME' BUTTON
document.getElementById("showProducts").addEventListener("click", function() {
    
    //DEFINING THE VARIABLE TO HOLD THE HTML THAT WILL BE ADDED TO THE PAGE
    let html = '';

    //GET THE ARRAY OF PRODUCT NAMES FOR THE BUSINESS USING THE GENERATED TOKEN
    productArray = getProducts(token);
    console.log('^^^^^^^^^^^^^^^' + productArray);

    //CREATE THE HTML TO BE ADDED TO THE PAGE OUT OF THE PRODUCT ARRAY
    for (let x=0; x<productArray.length; x++) {
        
        //CREATE AND UPDATE THE HTML VARIABLE FOR EACH PRODUCT IN THE ARRAY
        html += `
        <div class="product">
            <p class="productName">${productArray[x].name}</p>
            <img class="productImg" src="${productArray[x].image}">
            <p class="overview">${productArray[x].overview}</p>
        </div>
        `;
    }

    document.getElementById("productContainer").innerHTML = html;
});