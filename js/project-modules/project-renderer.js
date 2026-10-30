import * as ProjectManager from "./project-manager.js";
import {SITE_ROOT} from "../paths.js";

const catalogue = document.querySelector('[data-catalogue]')
let cardTemplate = null;


//Functions
async function initRenderer(){
    if(!catalogue) {return;}
    
    cardTemplate = await loadCardTemplate();
    
    loadUnfilteredList()
}

async function loadCardTemplate(){
    const response = await fetch (
        new URL ("./components/project-card.html", SITE_ROOT ));
    const html = await response.text();
    
    const template = document.createElement('template');
    template.innerHTML = html;
    
    return template;
}
function loadUnfilteredList(){
    let projectList = [];
    switch (catalogue.dataset.catalogue){
        case 'featured':
            projectList = ProjectManager.getFeaturedProjects();
            break;
        case 'all':
            projectList = ProjectManager.getProjects();
            break;
    }
    
    renderCatalogue(projectList)
}


function renderCatalogue(projectList){
    if(!Array.isArray(projectList)){
        throw new Error('No project data provided');}
    
    catalogue.replaceChildren();
    projectList.forEach(project => {
        const card = cardTemplate.content.cloneNode(true);
        
        const thumbnail = card.querySelector('[data-thumbnail]')
        thumbnail.src = new URL(project.thumbnail, SITE_ROOT);
        thumbnail.alt = project.title;
        
        const title = card.querySelector('[data-title]');
        title.textContent = project.title;
        
        const desc = card.querySelector('[data-desc]');
        desc.textContent = project.description;
        
        catalogue.append(card);
    })
    
}

//Execution
initRenderer();