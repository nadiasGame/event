


const eventElem = document.querySelector('#event');
const orderButton = document.querySelector('#order-button');
const ticketNumberElem = document.querySelector('#order-number');
const etaElem = document.querySelector('#eta');

const usernameLogin = document.querySelector('#username-login');
const passwordLogin = document.querySelector('#password-login');
const loginButton = document.querySelector('#login-button');


function showEvent(event) {
    console.log("loggar event i show event: ", event);
      event.forEach((eventItem) => {
          const itemElem = document.createElement('li');
          itemElem.setAttribute('id',${eventItem.id});
          itemElem.classList.add('event-item');//sätter en css class
          itemElem.innerHTML =
          `
            
              <span>${eventItem.title}</span>
              <span>${eventItem.time}</span>
              <span>${eventItem.date}</span>
              <span>${eventItem.price} kr</span>
              <span>${eventItem.location}</span>

              `;
      
            console.log("Vad får vi: ", itemElem);
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