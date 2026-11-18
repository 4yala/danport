//================ Elements ================

//==== Public API ====
Element.prototype.addCustomEventListener = function(type, callback){
    switch (type){
        default:
            console.warn(`Unknown custom event type setup attempted: ${type}`);
            break;
        
        case 'tracked-click':
            bindTrackedClickCallback(this, callback);
            break;
    }
}

//==== Binding handlers ====
function bindTrackedClickCallback(element, callback){
    const trackedEvent = {
        pressEvent: null,
        releaseEvent : null
    }
    
    //Standard cases
    element.addEventListener('pointerdown', (event) => {
        if(!event.isPrimary || trackedEvent.pressEvent)return;
        trackedEvent.pressEvent = event;
    })
    
    document.addEventListener('pointerup', (event) => {
        if(!trackedEvent.pressEvent)return;
        if(event.pointerId !== trackedEvent.pressEvent.pointerId) return;
        
        
        trackedEvent.releaseEvent = event;
        
        //Fire callback
        try{
            callback(trackedEvent);
        }
        finally {
            //Clear state (should work ASSUMING the callback is synchronous)
            trackedEvent.pressEvent = null;
            trackedEvent.releaseEvent = null;
        }
    })
    
    //Exceptional cases
    document.addEventListener('pointercancel', (event) =>{
        if(!trackedEvent.pressEvent)return;
        if(event.pointerId !== trackedEvent.pressEvent.pointerId) return;
        
        trackedEvent.pressEvent = null;
        trackedEvent.releaseEvent = null;
    })
    
    
    /*
    One potential thing to note about this custom event is that we need to expose
    the sign-off logic outside the scope of the intended element structure.
    Not only is it beyond scope, but it enables the sign-off logic to be always 
    triggered independently of the initial logic. 
    
    This can be considered inefficient, however should it evolve into excessive
    overhead, a management system can be implemented. The general idea is to make
    a central unit that uses only one event, this event holds an array where all the
    custom events are cached. Furthermore, state can be included as a part of the cache
    identity dynamically controlling for when the overarching event is eligible to be 
    fired or considered at all.
     */
}