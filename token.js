//FUNCTION TO GET YOUR JWT TOKEN
function getToken() {
    
    //THE INFORMATION WE WILL PASS TO THE API IN THE BODY
    const body = {
        username: "joseph@resmarksystems.com",
        apikey: "29a48798-3016-419a-9b53-bf533bc80669"
    };
    const json = JSON.stringify(body);
    
    //MAKING THE REQUEST, SETTING THE HEADER AND SENDING THE BODY OF THE REQUEST
    const jwtToken = new XMLHttpRequest();
    jwtToken.open("POST", "https://auto.resmarksystems.com/public/api/authenticate",false);
    jwtToken.setRequestHeader('Content-type','application/json; charset=utf-8');
    jwtToken.send(json);

    //RETURNING THE TOKEN TO THE CALLING FUNCTION
    return(jwtToken.responseText);
}

//STORE THE TOKEN IN A VARIABLE TO USE THROUGHOUT THE CODE
const token = getToken();

//ADDING AN EVENT LISTENER TO THE 'GET A JWT TOKEN BUTTON'
document.getElementById("getJwt").addEventListener("click", function() {
    //UPDATES THE PAGE TO SHOW THE NEWLY OBTAINED TOKEN TO THE USER
    document.getElementById("jwtToken").innerText = token;
  });

export{token};  