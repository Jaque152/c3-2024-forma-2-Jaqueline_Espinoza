import historicalEventsRepository from '../repository/historicalEventsRepository'

exports.getHistoricalEventsByOcurrence = (ctx) => {
    ctx.body = historicalEventsRepository.getHistoricalEvents(ctx.params.ocurrence)
    return ctx

    
}


exports.getHistoricalEventsFormat =(ctx) => {
    const event_search=ctx.params.ocurrence
    const events = historicalEventsRepository.getsearchEvent(ctx.params.ocurrence)
    let tiene_numero = false

    //Termina al encontrar un numero
    for (let letra of event_search){
    if(!isNaN(letra)){
        tiene_numero = true;
        break;
        }
    }
    

    //Caso 2
    if(sortedEvents= events.filter(event => event.date <= 0).sort((a, b) => a.date - b.date)){
        ctx.status = 200;
        ctx.body = sortedEvents;
    }

    //Caso 2

    if(sortedEventsUp = events.filter(event => event.date > 0).sort((a, b) => a.date - b.date)){
        ctx.status = 200;
        ctx.body = sortedEventsUp; 
    }

    //Caso 3
    if (/[^a-zA-Z]/.test(event_search)){
        ctx.status = 400;
        ctx.body = { message: 'Solo se aceptan caracteres no numéricos' }
        return ctx;
    }

    //Caso 4
    if (event_search.length !== 2){
        ctx.status = 400;
        ctx.body = { error: "El input debe ser ac o dc" };
        return ctx;
    }

    else {
        ctx.body = events;
    }
    return ctx
}


