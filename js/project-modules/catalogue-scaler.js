import {CatalogueConfigs} from "./catalogue-configs.js";
import {ScaleOverride, ScaleState, ScaleStateListener} from "../general-definitions/scale-definitions.js";

//================ Variables ================

//Elements
const catalogue = document.querySelector('[data-catalogue]');
const cardContainer = catalogue.querySelector('.card-listing');
const catalogueStyles = getComputedStyle(catalogue);

const main = document.querySelector('main');
const mainStyles = getComputedStyle(main);

//Measurements
const scaleConfig = CatalogueConfigs[catalogue.dataset.catalogue];
const containerSurplus = 
    (parseFloat(catalogueStyles.paddingInline) * 2) +
    (parseFloat(catalogueStyles.borderInlineWidth) * 2);
const screenWidthUse = parseFloat(mainStyles.maxWidth) /100;

//Dynamic 
const stateListeners = [];
let lastScreenWidth = 1920 * screenWidthUse;
let cardsPerRow = scaleConfig.maxCardsPerRow;

//Misc
const catalogueState = new ScaleStateListener();
    
//================ Functions ================

export function initScaler() {
    //Apply initial config
    catalogue.style.setProperty(
        '--card-width',
        `${scaleConfig.cardWidth}px`
    );
    catalogue.style.setProperty(
        '--card-height',
        `${scaleConfig.cardHeight}px`
    );
    catalogue.style.setProperty(
        '--card-separation',
        `${scaleConfig.cardSeparation}px`
    );
    catalogue.style.setProperty(
        '--card-border-size',
        `${scaleConfig.cardBorderSize}px`
    );
    catalogue.style.setProperty(
        '--total-list-width',
        `${scaleConfig.calculateTotalWidth()}px`
    );
    
    //Initialise services
    const catalogueOverride = new ScaleOverride({
        name: 'Catalogue Override',
        states: [ScaleState.COMPACT],
        onApply: () => {onCompact(true)},
        onRemove: () => {onCompact(false)},
    })
    
    
    catalogueState.registerOverride(catalogueOverride);
    stateListeners.push(catalogueState);
    window.addEventListener('resize', handleResize);
    
    //Determine state at init
    handleResize();
}

//Processes
function updateScale(newCardAmount){
    if(newCardAmount  === cardsPerRow){
        console.error(`Requested card amount is already set ${newCardAmount}`);
        return;
    }
    //Apply measurements
    const totalWidth = scaleConfig.calculateTotalWidth(newCardAmount);
    catalogue.style.setProperty(
        '--total-list-width',
        `${totalWidth}px`
    );
    
    //Update state
    if(newCardAmount === 1)
        broadcastScaleState(ScaleState.COMPACT);
    else if(newCardAmount === 2)
        broadcastScaleState(ScaleState.MODERATE);
    else if(cardsPerRow <= 2 && newCardAmount > 2)
        broadcastScaleState(ScaleState.UNRESTRICTED)

    cardsPerRow = newCardAmount;
}
function handleResize(){
    const availableWidth = 
        document.documentElement.clientWidth * screenWidthUse;
    let targetCardsPerRow = cardsPerRow;
    
    //Growth check
    if(availableWidth > lastScreenWidth && 
        targetCardsPerRow < scaleConfig.maxCardsPerRow){
        
        while(targetCardsPerRow < scaleConfig.maxCardsPerRow &&
            availableWidth >= scaleConfig.calculateTotalWidth(targetCardsPerRow + 1) +
            containerSurplus)
        {
            targetCardsPerRow++;
        }
    }
    
    //Shrink check
    else if(availableWidth < lastScreenWidth && 
        targetCardsPerRow > 1){
        const listWidth = cardContainer.clientWidth;
        while(targetCardsPerRow > 1 &&
            listWidth < scaleConfig.calculateTotalWidth(targetCardsPerRow))
        {
            targetCardsPerRow--;
        }
    }
    //Process change
    lastScreenWidth = availableWidth;
    if(targetCardsPerRow !== cardsPerRow)
        updateScale(targetCardsPerRow);
}


function broadcastScaleState(newState){
    stateListeners.forEach(stateListener => {
        stateListener.updateState(newState);
    })
}

function onCompact(toggle){
    if(typeof toggle !== 'boolean'){
        console.error(`Parameter introduced = ${toggle}, is not a boolean`)
        return;
    }
    catalogue.classList.toggle('compact-mode', toggle);
}

//Public API
export function registerStateListener(listener){
    if(!listener instanceof ScaleStateListener){
        console.error("Submitted listener is not a a valid ScaleStateListener instance");
        return;
    }
    stateListeners.push(listener);
}