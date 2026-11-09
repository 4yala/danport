import {ScaleState, ScaleOverride, ScaleStateListener} from "../general-definitions/scale-definitions.js";
import {registerStateListener} from "../project-modules/catalogue-scaler.js";

//Variables
const introductionContainer = document.querySelector('.author-introduction');

const stateListener = new ScaleStateListener();


//Functions
function compressIntro(toggle){
    introductionContainer.classList.toggle('compact-mode', toggle)
}

function bindScaleBehaviour(){
    const introOverride = new ScaleOverride({
        name: "compact-intro",
        states: [ScaleState.COMPACT, ScaleState.MODERATE],
        onApply: () => {compressIntro(true)},
        onRemove: () => {compressIntro(false)},
    });

    stateListener.registerOverride(introOverride);
    
    //Send to the scaler
    registerStateListener(stateListener);
}


//Execution
bindScaleBehaviour();