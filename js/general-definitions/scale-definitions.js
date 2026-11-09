//Scale states
export const ScaleState = Object.freeze({
    UNRESTRICTED: 'unrestricted',
    MODERATE: 'moderate',
    COMPACT: 'compact',
})

export class ScaleStateListener{
    //Init properties
    #overrides = new Map();
    
    //Dynamic properties
    currentState = null;
    #appliedOverrides = new Map();
    
    registerOverride(override){
        if(!override instanceof ScaleOverride){
            console.error("Invalid override attempted to register");
            return;
        }
        if(this.#overrides.has(override.name)){
            console.error(`Override already registered = ${override.name}`);
            return;
        }
        
        this.#overrides.set(override.name, override);
    }
    
    updateState(state){
        if(!Object.values(ScaleState).includes(state)){
            console.error(`Invalid state update submitted: ${state}`);
            return;}
        if(this.currentState === state) return;
        
        this.#updateOverrides(state);
        
        this.currentState = state;
    }
    
    #updateOverrides(state){
        //Apply overrides based on state
        this.#overrides.forEach((override, name) => 
        {
            if(!override.states.includes(state))return;
            override.onApply();
            this.#appliedOverrides.set(override.name, override);
        })
        
        this.#appliedOverrides.forEach((override, name) =>{
            if(!override.states.includes(state)){
                override.onRemove();
                this.#appliedOverrides.delete(name);
            }
        })
    }
}

export class ScaleOverride{
    constructor({name, states, onApply, onRemove}){
        //Validation
        if(!Array.isArray(states)){
            throw new Error(`Invalid states collection assigned for override ${name}`);
        }
        if(typeof onApply !== "function"){
            throw new Error(`Invalid entry callback for override ${name}`);
        }
        if(typeof onApply !== "function"){
            throw new Error(`Invalid exit callback for override ${name}`);
        }
        
        //Apply properties
        this.name = name;
        this.states = states;
        this.onApply = onApply;
        this.onRemove = onRemove;
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
