const nedb = require('nedb-promise');//startar upp en ny databas
const database = new nedb ({filename: 'accounts.db', autoload:true })


//lägg in det som ska visas på fronten
const event=
[
      {
        "id":1,
        "title":"untz",
        "location":"Kjell Härnqvistsalen",
        "time":"19:00-21:00",
        "date":"1 April",
        "price":350,
        "ticket":[]         
      },
      {
        "id":2,
        "title":"Lasse-stefanz",
        "location":"Pubelipuben",
        "time":"22:00-00:00",
        "date":"1 April",
        "price":110,
        "ticket":[]
                  
      },
      {
        "id":3,
        "title":"Pelle trubadur",
        "location":"Götaplatsen",
        "time":"20:00",
        "date":"10 April",
        "price":99,
        "ticket":[]
       
      }           
    ]

   
    const {hashPassword} = require('../utils/bcrypt'); 


  async function staff(){
    const pass =await hashPassword('pwd123');
    const user ={username:'kassem' ,password: pass}
  
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
 
  //saveEvent();

  async function getEvent() {
 
   
    const event= await database.find({  });
    return event;
     
  
    //console.log(menu);
}
  function createTicketContainer(){
    database.insert({type:'ticket-orders', ticket:[]});
  }

  function saveTicket(ticket){
    database.update ({ type:'event-ticket' },{$push: { tickets: ticket } ,}, {});
  }

 
  async function getAccountByUsername(username) {
    const account = await database.find({ username: username });


    return account;
}

function saveAccount(account) {
  database.insert(account);
}


//staff();




  
  module.exports ={
      getEvent,saveEvent,createTicketContainer,getEventById,saveTicket,getAccountByUsername,saveAccount,staff
  }




  //ska göras generea ticket id så det consol loggas......ticket id ordernumber i samm<++ save funtion ska köras på klicken som har ticket id på sig så det blir en ny rad i accounts db
  