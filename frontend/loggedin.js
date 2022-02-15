/* const buttonElem = document.querySelector('#order-button');

const inputElem = document.querySelector('#event');

async function getEvent(){
  const response =await fetch ('http://localhost:4001/api/event');



  const data = await response.json();

  console.log(data);

  if (data.success){
      showEvent(data.event);

      console.log(data.event);
  }
} */


const inputElem = document.querySelector('#Ticketverification');
const buttonElem = document.querySelector('#searchButton');


// hämta hem server från backend
async function getMenu() {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:5000/api/event/menu', { //kolla så endpoint är rätt
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }); 
    const data = response.json();
    console.log(data);

    }


const inputElem = document.querySelector('#number');
const buttonElem = document.querySelector('#searchButton');


// hämta hem server från backend
async function getEvent() {
    const token = sessionStorage.getItem('token');
    const response = await fetch('http://localhost:4001/api/event/event', { //kolla så endpoint är rätt
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }); 
    const data = response.json();
    console.log(data);

    }

    async function verify(){
        const ticket = inputElem.value;
        const token = sessionStorage.getItem('token');
        let response = await fetch("/api/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ticket: ticket,
            }),
          });
        const data = await response.json();
            console.log(data);
            if(data.success == true){
                alert('Verified ticket!')
            }
            else{
                alert('did not match ticket!')
            }
    }

    buttonElem.addEventListener('click', () => {
        verify();
    });


 //getEvent();
/* 
 function showEvent(event) {
     console.log("loggar event i show event: ", event);
       event.forEach((eventItem) => {
           const itemElem = document.createElement('li');
           //itemElem.setAttribute('id',${eventItem.id});
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
     } */

 /* async function getEvent(){
     const response =await fetch ('http://localhost:4001/api/event');


     const data = await response.json();

     console.log(data);

     if (data.success){
         showEvent(data.event);

         console.log(data.event);
     }
 }
 getEvent(); */


 /*verify tankar 
 
 window.old_print=window.print
window.print=function() {
    alert('doing things');
    window.old_print();
} 

ticket left

var q_available = 20;
var q_sold = 0;

function buyTicket(num) {
  var soldOut = false;
  if (q_sold >= q_available) {
    alert("Tickets sold out. Sorry.");
    return;
  }
  for (var i = 1; i <= num; i++) {
    // loop through # of tickets to see if sold out
    q_sold++;
    if (q_sold >= q_available) {
      if (i < num) {
        alert("You can only buy " + i + " tickets... Sorry.");
        soldOut = true;
        break;
      }
    }
  }
  if (!soldOut) {
    alert("Thank you. We have " + (q_available - q_sold) + " tickets left.");
    document.getElementById('ticketing').value = 0;
  }
}
<select name="ticketing" id="ticketing" onchange="buyTicket(this.value);">
    <option value="0" disabled selected>Please select</option>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
</select>



*/



/* async function verify() {
  const ticket=inputElem.value
    const token = sessionStorage.getItem('token');

    const response = await fetch('http://localhost:4001/api/loggedin/verify', {
        method: 'POST',
        body: JSON.stringify(ticket),
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
      const data = await response.json();{
    console.log(data);
  }
    if (data.success) {
        // Visar ordernummer och leveranstid (ETA);
        ticketNumberElem.innerHTML = `Ticketnummer: ${data.ticketNr}`;
        etaElem.innerHTML = `Leveranstid: ${data.eta} minuter`;
    }
};
buttonElem.addEventListener('click', () => {

verify();

 });
 */
//getMenu();