//Scale states
export const ScaleState = Object.freeze({
    UNRESTRICTED: 'unrestricted',
    MODERATE: 'moderate',
    COMPACT: 'compact',
})

export class ScaleStateListener {
    currentState = null;
    stateEvents = new Map();
    
    registerEvent(state, onTrigger){
        if(!Object.values(ScaleState).includes(state)){
            console.error(`Invalid state submitted: ${state}`);
            return;
        }
        if(typeof onTrigger !== 'function'){
            console.error(`Invalid callback submitted`);
            return;
        }
        
        this.stateEvents.set(state, onTrigger);
    }
    
    updateState(state){
        //validation
        if(!Object.values(ScaleState).includes(state)){            
            console.error(`Invalid state update submitted: ${state}`);
            return;}
        if(this.currentState === state) return;
        
        //Execution
        this.stateEvents.get(this.currentState)?.(false);
        this.stateEvents.get(state)?.(true);
        
        //Update state
        this.currentState = state;
    }
}

//Individual classes
export class CatalogueScaleConfig{
    constructor({maxCardsPerRow, cardWidth, cardHeight, cardSeparation, cardBorderSize}){
        this.maxCardsPerRow = maxCardsPerRow;
        this.cardWidth = cardWidth;
        this.cardHeight = cardHeight;
        this.cardSeparation = cardSeparation;
        this.cardBorderSize = cardBorderSize;
    }

    calculateTotalWidth(cardsPerRow = this.maxCardsPerRow){
        return (cardsPerRow * this.cardWidth)
            + (this.cardSeparation * (cardsPerRow -1))
            + (this.cardBorderSize * cardsPerRow * 2);
    };
}
