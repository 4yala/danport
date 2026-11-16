import {SITE_ROOT} from "./paths.js";

//================ Generic elements ================
const header = await loadHeader();

export const overlayContainer = loadOverlay();
const overlaidElems = [];

//================ Functions ================

//==== Element loaders ====
async function loadHeader(){
    const container = document.querySelector("#site-header");
    if(!container)return null;

    const response = await fetch(
        new URL ('./components/header.html', SITE_ROOT));
    const html = await response.text();

    const template = document.createElement('template');
    template.innerHTML = html;

    const headerElem = template.content.firstElementChild;
    container.replaceChildren(headerElem);

    return headerElem;
}
function loadOverlay(){
    const container = document.createElement('div');
    
    container.id = 'overlay-container';
    container.classList.add('overlay-root');
    
    document.body.append(container);
    
    return container;
}

//==== Public API ====

//== Overlaying ==
export function enableOverlay(elem){
    if(!(elem instanceof Element)){
        console.error("Requested item to overlay is not a valid element");
        return;
    }
    if(overlaidElems.includes(elem)){
        console.error("Requested item to overlay is already enabled");
        return;
    }
    
    document.body.classList.add('overlay-active');
    
    elem.classList.add('active');
    overlaidElems.push(elem);
}

export function disableOverlay(elem){
    const index = overlaidElems.indexOf(elem);
    if(index === -1){
        console.error("Requested item to disable from overlay is not registered as enabled");
        return;
    }
    
    elem.classList.remove('active');
    overlaidElems.splice(index, 1);
    
    if(overlaidElems.length <= 0){
        document.body.classList.remove('overlay-active');
    }
}

export function disableAllOverlays(){
    if(overlaidElems.length <= 0){
        console.error("No overlay elements found enabled");
        return;
    }
    
    for (const overlay of overlaidElems){
        overlay.classList.remove('active');
    }
    overlaidElems.length = 0;
    
    document.body.classList.remove('overlay-active');
}

//==== Init ====
function initPage(){
    
}

initPage();

