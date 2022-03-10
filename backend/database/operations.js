 const nedb = require('nedb-promise');//startar upp en ny databas
const database = new nedb ({filename: 'accounts.db', autoload:true })



//lägg in det som ska visas på fronten
const event=
  [


      {
        "id":1,
        "title":"Lasse-Stefanz",
        "location":"Kjell Härnqvistsalen",
        "time":"19:00-21:00",
        "date":"21 Mars",
        "price":350,
        "ticket":[]
      //verified:false?
      
      },
      {
        "id":2,
        "title":"Pelle trubadur",
        "location":"Pubelipuben",
        "time":"22:00-00:00",
        "date":"29 Mars",
        "price":110,
        "ticket":[]

      },
      {
        "id":3,
        "title":"Kajsas kör",
        "location":"Götaplatsen",
        "time":"15:00-16:00",
        "date":"10 April",
        "price":99,
        "ticket":[]
      },

        {
        "id":4,
        "title":"Klubb Untz",
        "location":"Din favoritkällare",
        "time":"22:00-du tröttnar",
        "date":"17 April",
        "price":150,
        "ticket":[]

      }
    ]


    const {hashPassword} = require('../utils/bcrypt');


  async function staff(){
    const pass =await hashPassword('pwd123');
    const user ={username:'nadia' ,password: pass}

      database.insert(user)
  }





  //be databasen sätta upp detta

  async function getEventById(id){
    const eventId = await database.find({ id: id });
/*     database.findOne({ type:'event-event',orders:[0] }); */
      return eventId;


 }

  function saveEvent(){
    database.insert(event);

  }

  function getTicketNr(){
    let ticket =  database.find({}) //hämtar allt i databasen.
    console.log('getting tickets');
    return ticket;
    
}


  async function getEvent() {



    const event = database.find({ title:{$exists:true}});
    return event;


    //console.log(menu);
}
  function createTicketContainer(){
    database.insert({type:'ticket-orders', ticket:[]});
  }

  function saveTicket(ticket){
     database.insert({ticket:ticket});
 
  }

  async function checkTicket(ticketNr){
   const check = await database.find({ ticketNr: ticketNr });
   return check;

 }



  async function getAccountByUsername(username) {
    const account =  database.find({ username: username });


    return account;
}

function saveAccount(account) {
  database.insert(account);
}


//staff();





  module.exports ={
    checkTicket, getEvent,saveEvent,createTicketContainer,getEventById,saveTicket,getAccountByUsername,saveAccount,staff,getTicketNr,
  }




  //ska göras generea ticket id så det consol loggas......ticket id ordernumber i samm<++ save funtion ska köras på klicken som har ticket id på sig så det blir en ny rad i accounts db
