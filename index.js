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
    jwtToken.open("POST", "https://sandbox.resmarksystems.com/public/api/authenticate",false);
    jwtToken.setRequestHeader('Content-type','application/json; charset=utf-8');
    jwtToken.send(json);
    
    token = jwtToken.responseText;

    //RETURNING THE TOKEN TO THE CALLING FUNCTION
    return(jwtToken.responseText);
}

//DECLARE GLOBAL VARIABLE THAT WILL BE POPULATED IN THE FUNCTION
let token;

//SET THE TOKEN VARIABLE AND SHOW THE TOKEN ON THE PAGE
function returnToken(username, key) {
    token = getToken(username,key);
    document.getElementById("jwtToken").innerText =  token;
}

//================================= DISPLAY PRODUCTS =======================================\\

//FUNCTION TO GET AN ARRAY OF PRODUCT OBJECTS THAT CONTAIN THE NAME, OVERVIEW, IMAGE, ID AND NUMBER
function getProducts(token) {
    
    //MAKING THE REQUEST, SETTING THE HEADERS AND SENDING THE BODY OF THE REQUEST
    const products = new XMLHttpRequest();
    products.open("GET", "https://sandbox.resmarksystems.com/public/api/product",false);
    products.setRequestHeader('Content-type','application/json; charset=utf-8');

    //USES THE TOKEN OBTAINED ABOVE FOR ACCESS
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
            image: productArray[x].images[0].small,
            id: productArray[x].id,
            number: productArray[x].productNumber,
            locationId: productArray[x].location[0].id,
            highlights: productArray[x].highlights,
            shortDesc: productArray[x].shortDescription,
            ageRestrictions: productArray[x].ageRestrictions,
            locationsArray: productArray[x].location,
            startTime: productArray[x].dateSettings.startTime,
            duration: productArray[x].dateSettings.duration,
            video: productArray[x].videos[0]
        }

        //PUSH THE PRODUCT OBJECT TO THE NEW PRODUCT ARRAY
        newProductArray.push(productObject);
    }

    //RETURN THE PRODUCT ARRAY TO THE CALLING FUNCTION
    return(newProductArray);
}

//DECLARE GLOBAL VARIABLE THAT WILL BE POPULATED IN THE FUNCTION
let limitedProductArray;

//ADDING AN EVENT LISTENER TO THE 'GET A LIST OF PRODUCTS BY NAME' BUTTON THAT WILL POPULATE THE PRODUCTS CONTAINER WHEN CLICKED
document.getElementById("showProducts").addEventListener("click", function() {
    
    //DEFINING THE VARIABLE TO HOLD THE HTML THAT WILL BE ADDED TO THE PAGE
    let html = '';

    //GET THE ARRAY OF PRODUCT NAMES FOR THE BUSINESS USING THE GENERATED TOKEN
    limitedProductArray = getProducts(token);

    //CREATE THE HTML TO BE ADDED TO THE PAGE OUT OF THE PRODUCT ARRAY
    for (let x=0; x<limitedProductArray.length; x++) {
        
        //CREATE AND UPDATE THE HTML VARIABLE FOR EACH PRODUCT IN THE ARRAY
        html += `
        <a class="product" onclick="selectProduct('${limitedProductArray[x].name}','${limitedProductArray[x].locationId}'); return false;">
            <p class="productName">${limitedProductArray[x].name}</p>
            <img class="productImg" src="${limitedProductArray[x].image}">
            <p class="overview">${limitedProductArray[x].overview}</p>
        </a>
        `;
    }

    document.getElementById("productsContainer").innerHTML = html;
});

//================================= SELECT PRODUCT =======================================\\
let selectedProductNumber;
let selectedName;
let selectedImg;
let selectedOverview; 
let selectedLocationId;
let selectedHighlights;
let selectedShortDesc;
let selectedAgeRestrictions;
let selectedLocationsArray;
let selectedStartTime;
let selectedDuration;
let selectedVideo; 

//FUNCTION THAT SETS THE SELECTED PRODUCT NUMBER AND DISPLAYS THE SELECTED PRODUCT IN THE NEXT SECTION
function selectProduct(productName, locationId) {

    //SETTING THE LOCATION ID VARIABLE FOR THE SELECTED PRODUCT
    selectedLocationId = locationId;

    //STORE THE PRODUCT NUMBER FOR THE SELECTED PRODUCT AND CREATE THE HTML TO DISPLAY
    for (let x=0; x<limitedProductArray.length; x++) {
        if (limitedProductArray[x].name == productName) {
            selectedProductNumber = limitedProductArray[x].number;
            selectedName = limitedProductArray[x].name;
            selectedImg = limitedProductArray[x].image;
            selectedOverview = limitedProductArray[x].overview;
            selectedHighlights = limitedProductArray[x].highlights;
            selectedShortDesc = limitedProductArray[x].shortDesc;
            selectedAgeRestrictions = limitedProductArray[x].ageRestrictions;
            selectedLocationsArray = limitedProductArray[x].locationsArray;
            selectedStartTime = limitedProductArray[x].startTime;
            selectedDuration = limitedProductArray[x].duration;
            selectedVideo = limitedProductArray[x].video.url;
            break;
        }
    }

    //THIS CALLS A FUNCTION IN THE NEXT SECTION TO DISPLAY THE SELECTED PRODUCT THERE
    displaySelectedProduct(selectedName, selectedImg, selectedOverview, selectedHighlights, selectedShortDesc, selectedAgeRestrictions, selectedLocationsArray, selectedStartTime, selectedDuration, selectedVideo);

    //SCROLL THE USER TO THE NEXT SECTION
    document.getElementById('selectDateSection').scrollIntoView({behavior: "smooth"});
}

//================================= SELECT TIME AND ADD PARTICIPANTS =======================================\\

//DISPLAY PRODUCT AND THE DATE AND PARTICIPANT FORM IN THE NEXT SECTION
function displaySelectedProduct(selectedName, selectedImg, selectedOverview, selectedHighlights, selectedShortDesc, selectedAgeRestrictions, selectedLocationsArray, selectedStartTime, selectedDuration, selectedVideo) {
    
    //CODE TO CREATE THE LOCATIONS HTML OUT OF THE RESPONSE DATA
    let locationsHTML = '';
    for (let x=0; x<selectedLocationsArray.length; x++) {
        locationsHTML += 
            `<p>
                <span class="locationName">${selectedLocationsArray[x].name}</span>
                ${selectedLocationsArray[x].city}, 
                ${selectedLocationsArray[x].state} - 
                ${selectedLocationsArray[x].country}
            </p>`
    }

    //CODE TO HANDLE NULL AGE RESTRICTIONS
    if (selectedAgeRestrictions != null) {
        selectedAgeRestrictions = selectedAgeRestrictions.minAge;
    } else {
        selectedAgeRestrictions = 'There are no age restrictions!'
    }

    //DISPLAY THE PRODUCT  AND FORM IN THE NEXT SECTION
    document.getElementById("selectedProduct").innerHTML = `
    <div id="productOverview">
        <div id="videoContainer"><iframe width="420" height="345" src="${selectedVideo}"></iframe></div>
        <div id="additionalInfo">
            <p class="infoHeader">Highlights</p>
            <p class="infoBody">${selectedHighlights}</p>
            <p class="infoHeader">Short Description</p>
            <p class="infoBody">${selectedShortDesc}</p>
            <p class="infoHeader">Age Restrictions</p>
            <p class="infoBody">${selectedAgeRestrictions}</p>
        </div>
        <div id="selectedProductMeta">
            <p class="infoHeader">Start Time</p>
            <p class="infoBody">${selectedStartTime}</p>
            <p class="infoHeader">Duration</p>
            <p class="infoBody">${selectedDuration}</p>
            <p class="infoHeader">Locations</p>
            ${locationsHTML}
        </div>
    </div>
    
    <div class="product">
            <p class="productName">${selectedName}</p>
            <img class="productImg" src="${selectedImg}">
            <p class="overview">${selectedOverview}</p>
    </div>
    <div id="timeAndPartContainer">
        <p class="headerText">Please tell us a little about your trip</p>
        <form id="timeAndPartForm" name="timeAndPartForm" onsubmit="displayAvailableTimes(fromDate.value, toDate.value, guests.value); return false">
        <label for="key">Number of guests: </label>
            <input type="number" id="guests" name="guests" min="1" max="10" required><br><br>    
            <label for="fromDate">From Date: </label>
            <input type="date" id="fromDate" name="fromDate" min="2022-05-01" max="2022-05-31" required><br><br>
            <label for="toDate">To Date: </label>
            <input type="date" id="toDate" name="toDate"  min="2022-05-01" max="2022-05-31" required><br><br>
            <input type="submit" value="Get Availability" class="button" id="getAvailability">
        </form>
    </div>
    <div id="availTimesContainer">
        <p class="headerText">Please select an available time below</p>
        <div id="availableStartDates"></div>
    </div>
    `
}

//FUNCTION TO DISPLAY THE AVAILABLE TIMES BASED ON THE USER PROVIDED INFORMATION
function displayAvailableTimes (from, to, guests) {

    //CREATING THE VARIABLE THAT WILL HOLD ALL THE HTML
    let html = "";

    //GET THE ARRAY OF PRODUCT NAMES FOR THE BUSINESS USING THE GENERATED TOKEN
    startTimesArray = getAvailalbility(from, to);

    //CREATE THE HTML TO BE ADDED TO THE PAGE OUT OF THE PRODUCT ARRAY
    for (let x=0; x<startTimesArray.length; x++) {
        
        //CREATE AND UPDATE THE HTML VARIABLE FOR EACH PRODUCT IN THE ARRAY    
        html += `
        <a onclick="createCart('${startTimesArray[x].activityId}','${guests}','${startTimesArray[x].startTime}','${startTimesArray[x].endTime}'); return false;">
            <div class="startDateRow"> 
                <div class="date">${startTimesArray[x].startTime}</div>
                    to
                <div class="date">${startTimesArray[x].endTime}</div> 
                <div class="pricePerGuest">$${startTimesArray[x].price} / Guest</div>
            </div>    
        </a>    
        `;
    }

    //THERE HAS GOT TO BE A MORE ELEGANT WAY FO REVEALING A HIDDEN DIV - LOOK UP WHEN YOU HAVE MORE TIME
    document.getElementById("availableStartDates").innerHTML = html; 
}

let availability;
let date;

//FUNCTION THAT CONTAINS THE API CALL TO GET AVAILABLE TIMES FOR THE SELECTED PRODUCT
function getAvailalbility (from, to) {
    apiMonth = from.substring(0,7);

    //MAKING THE REQUEST, SETTING THE HEADERS AND SENDING THE BODY OF THE REQUEST
    const productItems = new XMLHttpRequest();
    productItems.open("GET", `https://sandbox.resmarksystems.com/public/api/product/${selectedProductNumber}/item?from=${apiMonth}&to=${apiMonth}`,false);
    productItems.setRequestHeader('Content-type','application/json; charset=utf-8');

    //USES THE TOKEN OBTAINED ABOVE FOR ACCESS
    productItems.setRequestHeader('Authorization',`Bearer ${token}`); 
    productItems.send();

    //PARSING THE RESPONSE TEXT TO TURN IT INTO JSON FROM A STRING
    const parsedResponse = JSON.parse(productItems.responseText);

    //ISOLATING THE ITEMS ARRAY
    const itemsArray = parsedResponse.data.items;

    //DEFINE THE OBJECT THAT WILL STORE THE PRODUCT DATA
    let newStartTimeArray = [];

    //VARIABLES TO HOLD THE FROM AND TO DAY THAT THE CUSTOMER REQUESTED (THIS IS ONLY MEANT TO HANDLE THE PRESETUP DATA - THIS DOESNT HANDLE MONTHS WIDE COMPARISONS)
    fromDay = from.substring(8,10);
    toDay = to.substring(8,10);

    //LOOPS THROUGH THE ITEMS ARRAY TO CREATE THE DATA WE NEED AND THEN PUSH IT TO THE NEWSTARTTIMEARRAY CREATED ABOVE
    for (let x=0; x<itemsArray.length; x++) {
        
        //GETTING THE DAY FROM THE ITEMS DATE TO USE IN A COMPARISON BELOW
        let itemDate = itemsArray[x].date.substring(8,10);
        
        //IF THE DATE OF THE ITEM IS BETWEEN THE START AND END DATE THEN ADD IT TO THE ARRAY
        if ( itemDate >= fromDay && itemDate <= toDay) {

            //VARIABLE TO HOLD THE AVAILABILITY OBJECT SINCE THE KEY IS A NONVIABLE CHARACTER '*'
            let  availabilityObj = itemsArray[x].timesAvailable[0].tiersAvailable;
            
            //CREATE AN OBJECT THAT HAS ALL THE INFORMATION FOR THE PRODUCT
            let startTimeObject = {
                day: parseInt(itemDate),
                date: itemsArray[x].date,
                startTime: dateFormat(itemsArray[x].timesAvailable[0].startTime),
                endTime: dateFormat(itemsArray[x].timesAvailable[0].endTime),
                availability: availabilityObj[Object.keys(availabilityObj)[0]],
                price: itemsArray[x].timesAvailable[0].price.All,
                activityId: itemsArray[x].timesAvailable[0].activityId
            }

            //PUSH THE PRODUCT OBJECT TO THE NEW PRODUCT ARRAY
            newStartTimeArray.push(startTimeObject);
        }
    }

    //SORT THE START TIME ARRAY BEFORE RETURNING IT
    newStartTimeArray.sort(function(a, b) {
        return a.day - b.day;
    });

    console.log(newStartTimeArray);

    //RETURN THE PRODUCT ARRAY TO THE CALLING FUNCTION
    return(newStartTimeArray);
}

//ARRAY THAT HOLDS THE MONTHS OF THE YEAR
let months = ['January','February','March','April','May','June','July','August','September','October','November','December',]

//FUNCTION TO REFORMAT THE DATE AND TIME RETURNED BY THE API
function dateFormat (isoDateTime) {

    //TAKE THE MONTH AND DAY OUT OF THE ISO DATE AND TRANSFORM THE MONTH TO A STRING
    let monthDay =  (months[parseInt(isoDateTime.substring(5,7)) - 1]) + ' ' + isoDateTime.substring(8,10);
    
    //ISOLATING THE HOURS
    let hours = isoDateTime.substring(11,13);

    //ADDING AM PM
    let ampm = hours >= 12 ? 'pm' : 'am';

    //FORMATTING THE HOURS IF NECESSARY
    if (hours<10) {
        if (hours == 00) {
            hours = 12;
        } else {
            hours = hours.substring(1,2);
        }
    }
    if (hours>12) {
        hours = hours-12;
    }

    //ISOLATING THE MINUTES
    let minutes = isoDateTime.substring(14,16);

    //COMPLETED DATE TRANSFORMATION
    let transDate = `${monthDay} ${hours}:${minutes} ${ampm}`;

    //RETURNING THE REFORMATTED DATE TO THE CALLING FUNCTION
    return transDate;
}

let cartId;
let totalPrice;
let participants;

//CREATE A NEW CART AND ADD THE SELECTED ACTIVITY AND PARTICIPANTS TO IT
function createCart (activityId, guests, from, to) {

    //SETTING GLOBAL VARIABLES
    participants = guests;

    //CREATE THE NEW CART
    const newCart = new XMLHttpRequest();
    newCart.open("POST", "https://sandbox.resmarksystems.com/public/api/cart",false);
    newCart.setRequestHeader('Content-type','application/json; charset=utf-8');
    newCart.setRequestHeader('Authorization',`Bearer ${token}`); 
    newCart.send();

    //CREATING VARIABLE FOR THE CART ID OBTAINED FROM THE RESPONSE TEXT OF OUR 'CREATE CART' API CALL
    cartId = JSON.parse(newCart.responseText).data.id;

    //CREATE THE BODY TO SEND WITH THE ADD PRODUCT ITEM API CALL
    const body = {
        itemId: activityId,
        participants: {
            All: guests
        },
        locationId: selectedLocationId
    };
    const json = JSON.stringify(body);

    //ADD THE SELECTED ACTIVITY AND PARTICIPANTS TO THE CART
    const addItem = new XMLHttpRequest();
    addItem.open("POST", `https://sandbox.resmarksystems.com/public/api/cart/${cartId}/item`,false);
    addItem.setRequestHeader('Content-type','application/json; charset=utf-8');
    addItem.setRequestHeader('Authorization',`Bearer ${token}`); 
    addItem.send(json);

    //SETTING THE TOTAL PRICE VARIABLE TO USE LATER
    totalPrice = JSON.parse(addItem.responseText).data.items[0].total;

    //DISPLAY THE 'COLLECT CUSTOMER INFORMATION' FORM IN THE NEXT SECTION
    initCustomerForm(guests, from, to);
}

//INITIALIZE THE CUSTOMER FORM
function initCustomerForm (guests, from, to) {

    //SHOW SUMMARY OF PRODUCT, DATE, TIME, PARTICIPANTS AND TOTAL COST (INCLUDING TAX)
    let html = `
        <img id="cartImg" src="${selectedImg}">
        <div id="cartInfo">
            <h3 id="productName">${selectedName}</h3>
            <p id="participants">Total Guests: ${guests}</p>
            <p class="fromto">Begins: ${from}</p>
            <p class="fromto">Ends: ${to}</p>
            <p id="total">Total: $${totalPrice}</p>
        </div>
    `
    //POPULATE THE CART CONTAINER WITH THE CART SUMMARY
    document.getElementById("cartContainer").innerHTML = html;

    //Variable to hold todays date for max value in DOB
    let today = new Date().toISOString().slice(0,10);

    //SHOW THE FORM TO COLLECT CUSTOMER DATA
    let customerFormHtml = `
        <form id="customerDetails" name="customerForm" onsubmit="addCustomer(email.value, fname.value, lname.value, gender.value, phone.value, dob.value, address.value, city.value, state.value); return false">

            <label for="email">Email:</label><br>
            <input type="text" class="input" id="email" name="email" maxlength="50" required><br><br>

            <label for="fname">First Name:</label><br>
            <input type="text" class="input" id="fname" name="fname" maxlength="20" required><br><br>

            <label for="lname">Last Name:</label><br>
            <input type="text" class="input" id="lname" name="lname" maxlength="20" required><br><br>

            <label for="gender">Gender:</label><br>
            <select class="input" id="gender" name="gender">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select><br><br>

            <label for="phone">Phone:</label><br>
            <input type="tel" class="input" id="phone" name="phone" placeholder="123-456-7890" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" minlength="12" maxlength="12"><br><br>

            <label for="dob">Date of Birth:</label><br>
            <input type="date" class="input" id="dob" name="dob" max="${today}"><br><br>

            <label for="address">Address:</label><br>
            <input type="text" class="input" id="address" name="address" maxlength="30"><br><br>

            <label for="city">City:</label><br>
            <input type="text" class="input" id="city" name="city" maxlength="30"><br><br>

            <label for="state">State:</label><br>
            <input type="text" class="input" id="state" name="state" maxlength="2" placeholder="UT"><br><br>

            <input type="submit" value="Create My Order" class="button getCodeButton" id="submitCustomer">
        </form>
    `
    //POPULATE THE CUSTOMER DATA CONTAINER WITH THE CUSTOMER DATA FORM
    document.getElementById("collectCustomerData").innerHTML = customerFormHtml;

    //SCROLL THE USER TO THE NEXT SECTION
    document.getElementById('reviewCart').scrollIntoView({behavior: "smooth"});
}

let customerFirstName;
let customerLastName;
let customerEmail;
let customerPhone;
let customerAddress;
let customerCity;
let customerState

//ADD THE COLLECTED CUSTOMER DATA TO THE CART
function addCustomer(email, fname, lname, gender, phone, dob, address, city, state) {

   //PREPROCESS PHONE NUMBER
    let processedPhone = phone.replace(/-/g,'');

    //PREPROCESS GENDER
    if (gender == 'Male') {
        gender = 'MALE'
    } else if (gender == 'Female') {
        gender = 'FEMALE'
    } 

    //SET GLOBAL VARIABLES
    customerFirstName = fname;
    customerLastName = lname;
    customerEmail = email;
    customerAddress = address;
    customerCity = city;
    customerState = state;
    customerPhone = phone;

    //CREATE THE BODY TO SEND WITH THE ADD PRODUCT ITEM API CALL
    const body = {
        'email': email,
        'firstName': fname,
        'lastName': lname,
        'phone': processedPhone,
        'birthDate': dob,
        'gender': gender,
        'streetAddress': address,
        'city': city,
        'state': state
    };
    const json = JSON.stringify(body);

    //ADD THE SELECTED ACTIVITY AND PARTICIPANTS TO THE CART
    const addCustomer = new XMLHttpRequest();
    addCustomer.open("PUT", `https://sandbox.resmarksystems.com/public/api/cart/${cartId}/customer`,false);
    addCustomer.setRequestHeader('Content-type','application/json; charset=utf-8');
    addCustomer.setRequestHeader('Authorization',`Bearer ${token}`); 
    addCustomer.send(json);

    //AFTER THE CUSTOMER HAS BEEN ADDED TO THE CART THEN CREATE THE ORDER
    createOrder(email, fname, lname);
}

//CREATE THE NEW ORDER
function createOrder() {

    //CREATE THE BODY TO SEND WITH THE CREATE ORDER ITEM API CALL
    const json = JSON.stringify({id: cartId});

    //ADD THE SELECTED ACTIVITY AND PARTICIPANTS TO THE CART
    const createOrder = new XMLHttpRequest();
    createOrder.open("POST", `https://sandbox.resmarksystems.com/public/api/order`,false);
    createOrder.setRequestHeader('Content-type','application/json; charset=utf-8');
    createOrder.setRequestHeader('Authorization',`Bearer ${token}`); 
    createOrder.send(json);

    //PARSING THE RESPONSE TEXT TO TURN IT INTO JSON FROM A STRING
    const orderData = JSON.parse(createOrder.responseText).data;
    console.log(orderData);

    //AFTER THE ORDER HAS BEEN CREATED DISPLAY IT
    displayOrder(orderData);
}

//DISPLAY THE NEW ORDER IN THE FINAL SECTION
function displayOrder(orderData) {

    //PREPROCESS THE DATES
    let createdDate = dateFormat(orderData.createdDate);
    let startDate = dateFormat(orderData.items[0].date.startTime);
    let endDate = dateFormat(orderData.items[0].date.endTime);

    //DEFINE AND POPULATE THE HTML THAT WILL BE ADDED TO THE PAGE
    let html = `
        <p id="orderSuccess">YOUR ORDER HAS BEEN PROCESSED!</p>
        <div id="orderContainer">
            <div id="orderMeta">
                <span class="orderHeader"><b>Confirmation Number:</b> ${orderData.confirmation}</span>
                <span class="orderHeader"><b>Created By:</b> ${orderData.createdBy}</span> 
                <span class="orderHeader"><b>Email:</b> ${orderData.createdByEmail}</span>
                <span class="orderHeader"><b>Created Date:</b> ${createdDate}</span>
            </div>
            <div class="product orderContainers">
                <p class="productName orderHeaderTextSize">${selectedName}</p>
                <img class="productImg" src="${selectedImg}">
                <p class="overview">${selectedOverview}</p>
            </div>
            <div class="orderContainers">
                <p class="productName orderHeaderTextSize">Order Details</p>
                <p class="orderLineItem"><b>Start Date:</b> &nbsp; ${startDate}</p>
                <p class="orderLineItem"><b>End Date:</b> &nbsp; ${endDate}</p>
                <p class="orderLineItem"><b>Total Guests:</b> &nbsp; ${participants}</p>
                <p class="orderLineItem"><b>Total Price:</b> &nbsp; $${totalPrice}</p>
            </div>
            <div class="orderContainers">
                <p class="productName orderHeaderTextSize">Customer Details</p>
                <p class="orderLineItem"><b>Name:</b> &nbsp; ${customerFirstName} ${customerLastName}</p>
                <p class="orderLineItem"><b>Email:</b> &nbsp; ${customerEmail}</p>
                <p class="orderLineItem"><b>Phone:</b> &nbsp; ${customerPhone}</p>
                <p class="orderLineItem"><b>Address:</b> &nbsp; ${customerAddress} ${customerCity} ${customerState}</p>
            </div>
        </div>
    `

    //POPULATE THE ORDER CONTAINER WITH THE CART SUMMARY
    document.getElementById("displayOrder").innerHTML = html;

} 