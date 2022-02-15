const eventElem = document.querySelector('#event');
const orderButton = document.querySelector('#order-button');
const ticketNumberElem = document.querySelector('#order-number');
const etaElem = document.querySelector('#eta');
const ticketElem = document.querySelector('#Ticketverification');

const usernameLogin = document.querySelector('#username-login');
const passwordLogin = document.querySelector('#password-login');
const loginButton = document.querySelector('#login-button');



async function ticket() {

    const response = await fetch('http://localhost:4001/api/event/buy', {
        method: 'GET',
        headers: {

            'Content-Type': 'application/json'
        }


    });

    const data = await response.json();
    console.log("data".data);

    if (data.success) {
      
console.log(data.ticketNr);
     
        // Visar ordernummer och leveranstid (ETA);
        ticketNumberElem.innerHTML = `Ticketnummer: ${data.ticketNr}`;

   
    }

}


function showEvent (event){
    
    event.forEach ((eventItem)=>{
        const itemElem = document.createElement('li');

        itemElem.classList.add('event-item', 'space');//sätter en css class
        itemElem.innerHTML=


        `
          
           
            <span class="title">${eventItem.title}</span>
            <span class="location">${eventItem.location}</span>
            <span class="date">${eventItem.date}</span>
            <span class="time">${eventItem.time}</span>
            <span class="price">${eventItem.price} sek</span>
           
          
      
        `;
        eventElem.append(itemElem);

        itemElem.addEventListener('click', async()=>{
           const ticketNr = await ticket();
   
         

    
            ticketElem.innerHTML=


            `
            <div class="v2_30">
            <div class="v2_37"></div>
            <div class="v10_37"></div>
            <div class="v2_39"></div>
            <div class="v2_40"></div>
            <div class="v4_2"></div>
            <div class="v2_41"></div>
            <span class="v2_42">WHAT</span>
            <span class="v2_43">WHERE</span>
            <span class="v2_78">FROM</span>
            <span class="v2_73"></span>
            <span class="v4_3">Biljetnummer${ticketNr}:</span>
            <span class="v2_74">${eventItem.title}</span>
            <span class="v2_75">${eventItem.location}</span>
            <span class=${eventItem.time}</span>
            <span class="v4_27">WHEN</span>
            <span class="v4_28">${eventItem.date}</span>
            <span class="v3_2">TO</span>
            <span class="v3_3">${eventItem.time}</span>
            <div class="name"></div>
            <div class="name"></div>
            <div class="name"></div><div class="name">
    
            </div>
            `;
            ticketElem.append();
        

        
            
            

        });
    });
}

async function getEvent(){
    const response =await fetch ('http://localhost:4001/api/event');



    const data = await response.json();

    console.log(data);

    if (data.success){
        showEvent(data.event);

        console.log(data.event);
    }
}





getEvent();



function saveToken(token) {
    sessionStorage.setItem('token', token); 
}

async function login(credentials) {
    const response = await fetch('http://localhost:4001/api/loggedin', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers:{
            
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
        // Spara token i sessionStorage
        // Redirecta till http://localhost:5000/loggedIn.html
        saveToken(data.token); 
        window.location.href = 'http://localhost:4001/loggedin.html';
    }
}

/*   //createButton.addEventListener('click', () => {
    const credentials = {
        username: usernameElem.value,
        password: passwordElem.value
    }

    createAccount(credentials);
}); */ 
loginButton.addEventListener('click', () => {
    const credentials = {
        username: usernameLogin.value,
        password: passwordLogin.value
    }

    login(credentials);
});


