import {ScaleStateListener, ScaleState} from "../general-definitions/scale-definitions.js";
import {registerStateListener} from "../project-modules/catalogue-scaler.js";

//Variables
const introductionContainer = document.querySelector('.author-introduction');

const stateListener = new ScaleStateListener();


//Functions
function onModerateScale(toggle){
    if(typeof toggle !== 'boolean'){
        console.error(`Parameter introduced = ${toggle}, is not a boolean`)
        return;
    }
    introductionContainer.classList.toggle('compact-mode', toggle)
}

function bindScaleBehaviour(){
    //Initialise listener class
    stateListener.registerEvent(ScaleState.MODERATE, onModerateScale)
    
    //Send to the scaler
    registerStateListener(stateListener);
}


//Execution
bindScaleBehaviour();