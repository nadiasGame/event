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
    const user ={username:'ben' ,password: pass}

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
    database.push(ticketNr)
  }

 

  async function getEvent() {



    const event= await database.find({ });
    return event;


    //console.log(menu);
}
  function createTicketContainer(){
    database.insert({type:'ticket-orders', ticket:[]});
  }

  function saveTicket(retval,order){
     const test = retval;
     const test2 = JSON.stringify(order.ticket);

   console.log("test: ", test + " test2 " + test2);
    //database.update ({id: ticket},{$push: { ticket: tickettNr }, }, {});
    // database.update(
    //   { id: test2},
    //   { $push: { ticket: [test]} },
    //   {},// this argument was missing
    //   function (err, numReplaced) {
    //     console.log("replaced---->" + test2, test);
    //   }
    //   );
      // database.update(
      //        { id: test2 },
      //        { $push: { ticket: test} },
      //        {},// this argument was missing
      //        function (err, test) {
      //          console.log("added---->" + test);
      //
      //          database.loadDatabase();
      //        }
      //        );
             database.update({ id: test2}, { $push: { ticket: test } }, {multi:true}, function (err, numReplaced) {
           // numReplaced = 1
           // Field 'name' request.name, name now has the value of request.text
           console.log(numReplaced);
           //database.loadDatabase();
           //DB.update({ _id: ID }, { $push: { "activity.Weekly": [0,1,2,4,2,3] } }, {});
         });
    //database.update ({ type:'event-ticket' },{$push: { tickets: ticket } ,}, {});

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
      getEvent,saveEvent,createTicketContainer,getEventById,saveTicket,getAccountByUsername,saveAccount,staff,getTicketNr,
  }




  //ska göras generea ticket id så det consol loggas......ticket id ordernumber i samm<++ save funtion ska köras på klicken som har ticket id på sig så det blir en ny rad i accounts db
