import * as ProjectManager from "./project-manager.js";
import {SITE_ROOT} from "../paths.js";

const catalogue = document.querySelector('[data-catalogue]')
let cardTemplate = null;


//Functions

//Init
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

//Catalogue loading
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


//Card populator
function renderCatalogue(projectList){
    if(!Array.isArray(projectList)){
        throw new Error('No project data provided');}
    
    catalogue.replaceChildren();
    projectList.forEach(project => {
        const card = cardTemplate.content.cloneNode(true);
        
        catalogue.append(createCard(project, cardTemplate));
    })
    
}

function createCard(project, template){
    const cardElem = template.content.cloneNode(true)
    
    const thumbnail = cardElem.querySelector('[data-thumbnail]')
    thumbnail.src = new URL(project.thumbnail, SITE_ROOT);
    thumbnail.alt = project.title;

    const title = cardElem.querySelector('[data-title]');
    title.textContent = project.title;

    const desc = cardElem.querySelector('[data-desc]');
    desc.textContent = project.description;
    
    const tagContainer = cardElem.querySelector('[data-tags]');
    populateTags(project.tags, tagContainer);
    
    return cardElem;
}

function populateTags(tags = [], listContainer){
    tags.forEach(tag =>{
        const tagLabel = document.createElement('li');
        tagLabel.classList.add('tag')
        
        const tagText = document.createElement('span');
        tagText.textContent = tag;
        
        tagLabel.append(tagText);
        
        listContainer.append(tagLabel);
    })
}


//Execution
initRenderer();