


const eventElem = document.querySelector('#event');
const orderButton = document.querySelector('#order-button');
const ticketNumberElem = document.querySelector('#order-number');
const etaElem = document.querySelector('#eta');

/* const usernameElem = document.querySelector('#username');
const passwordElem = document.querySelector('#password');
const createButton = document.querySelector('#create-button');
 */
const loginUsername = document.querySelector('#username-login');
const loginPassword = document.querySelector('#password-login');
const loginButton = document.querySelector('#login-button');

async function ticket(ticket) {
  
   
   const reqObj={ticket:ticket}
    const response = await fetch('http://localhost:4001/api/event/buy', {
        method: 'POST',
        body: JSON.stringify(reqObj),
        headers: {
    
            'Content-Type': 'application/json'
        }
       
   
    });
  
    const data = await response.json();
    console.log(data);

    if (data.success) {
        // Visar ordernummer och leveranstid (ETA);
        ticketNumberElem.innerHTML = `Ticketnummer: ${data.ticketNr}`;
        /* etaElem.innerHTML = `Leveranstid: ${data.eta} minuter`; */
    }
 
}

function showEvent (event){
    event.forEach ((eventItem)=>{
        const itemElem = document.createElement('li');
        itemElem.classList.add('event-item');//sätter en css class
        itemElem.innerHTML= `<span>${eventItem.title}</span>${eventItem.price} kr</span>
         ${eventItem.date} </span`;
        eventElem.append(itemElem);

        itemElem.addEventListener('click',()=>{
            ticket(eventItem.id);
          
        
          
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



    
/* 
async function createAccount(credentials) {
    const response = await fetch('http://localhost:4001/api/staff/create', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    console.log(data);
} */

function saveToken(token) {
    sessionStorage.setItem('token', token);
}

async function login(credentials) {
    const response = await fetch('http://localhost:4001/api/staff/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: {
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
};

/*  createButton.addEventListener('click', () => {
    const credentials = {
        username: usernameElem.value,
        password: passwordElem.value
    }

    createAccount(credentials);
}); */
loginButton.addEventListener('click', () => {
    const credentials = {
        username: loginUsername.value,
        password: loginPassword.value
    }

    login(credentials);
});