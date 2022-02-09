function countTickets(user) {
    var count = 0;
    response.tickets.forEach(function(ticket) {
        var filteredFields = ticket.fields.filter(function(field) {
            return field.id == 21732321;
        });
        if (filteredFields.length > 0 && filteredFields[0].value == user) {
            count++;
        }
    });
    return count;
}