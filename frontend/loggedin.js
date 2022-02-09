

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
