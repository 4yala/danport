import * as ProjectManager from "./project-manager.js";
import {SITE_ROOT} from "../paths.js";


//================ Variables ================
const catalogue = document.querySelector('[data-catalogue]')
const cardContainer = catalogue.querySelector('.card-listing')
const cardTemplate = await loadCardTemplate();
const projectInspector = await loadInspector();


//================ Functions ================
//==== Element loading ====
async function loadCardTemplate(){
    const response = await fetch (
        new URL ("./components/project-card.html", SITE_ROOT ));
    const html = await response.text();

    const template = document.createElement('template');
    template.innerHTML = html;

    return template;
}
async function loadInspector(){
    const response = await fetch(
        new URL ("./components/project-inspector.html", SITE_ROOT ));
    const html = await response.text();
    
    const template = document.createElement('template');
    template.innerHTML = html;
    
    const inspectorElem = template.content.firstElementChild;
    document.querySelector("#overlay-container").append(inspectorElem);
    
    
    //Bind exit logic
    const exitButton = inspectorElem.querySelector('.inspector-concealer');
    exitButton.addEventListener('click', hideInspector);
    
    inspectorElem.addEventListener('click', (event) => {
        console.log('Target:', event.target);
        console.log('Current target:', event.currentTarget);
        if (event.target === inspectorElem) {
            hideInspector();
        }
    });
    
    return inspectorElem;
}

//Init
export function initRenderer(){
    if(!catalogue || !cardContainer) {return;}
    
    //Bind interactions
    cardContainer.addEventListener('click', processCardInteraction);
    
    loadUnfilteredList();
}

//==== Generic functions ====
function populateTags(tags = [], listContainer){
    listContainer.replaceChildren();
    
    tags.forEach(tag =>{
        const tagLabel = document.createElement('li');
        tagLabel.classList.add('tag')

        const tagText = document.createElement('span');
        tagText.textContent = tag;

        tagLabel.append(tagText);

        listContainer.append(tagLabel);
    })
}

//==== Catalogue functions ====
function processCardInteraction(event){
    const card = event.target.closest('[data-project-id]');
    
    if(!card)return;
    
    const project = ProjectManager.getProject(card.dataset.projectId);
    
    if(!project){
        console.error(`Project = ${card.dataset.projectId} not found in the database`);
        return;
    }
    renderInspector(project);
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
    
    cardContainer.replaceChildren();
    projectList.forEach(project => {
        const card = cardTemplate.content.cloneNode(true);
        
        cardContainer.append(createCard(project, cardTemplate));
    })
    
}
function createCard(project, template){
    const cardElem = template.content.firstElementChild.cloneNode(true)
    
    const thumbnail = cardElem.querySelector('[data-thumbnail]')
    thumbnail.src = new URL(project.thumbnail, SITE_ROOT);
    thumbnail.alt = project.title;

    const title = cardElem.querySelector('[data-title]');
    title.textContent = project.title;

    const desc = cardElem.querySelector('[data-desc]');
    desc.textContent = project.description;
    
    const tagContainer = cardElem.querySelector('[data-tags]');
    populateTags(project.tags, tagContainer);
    
    cardElem.dataset.projectId = project.id;

    return cardElem;
}

//Inspector functions

function renderInspector(project){
    if(!projectInspector){
        console.error("Inspector elem invalid");
        return;
    }

    console.log(projectInspector);
    const title = projectInspector.querySelector('[data-title]');
    if(title){
        title.textContent = project.title;
    }
    
    const thumbnail = projectInspector.querySelector('[data-thumbnail]');
    thumbnail.src = new URL(project.thumbnail, SITE_ROOT);
    thumbnail.alt = project.title;
    
    const tagContainer = projectInspector.querySelector('[data-tags]');
    populateTags(project.tags, tagContainer);
    
    const status = projectInspector.querySelector('[data-status]');
    status.textContent = project.status;
    
    const date = projectInspector.querySelector('[data-date]');
    date.textContent = project.uploadDate;
    
    const desc = projectInspector.querySelector('[data-desc]');
    desc.textContent = project.description;
    
    const highlightContainer = projectInspector.querySelector('[data-highlights]');
    highlightContainer.replaceChildren();
    
    for (const highlight of project.highlights){
        const listElem = document.createElement('li');
        listElem.textContent = highlight;
        
        highlightContainer.append(listElem);
    }
    
    const linkContainer = projectInspector.querySelector('[data-links]');
    linkContainer.replaceChildren();
    
    for (const link of project.links){
        const listElem = document.createElement('li');
    }
    
    projectInspector.classList.add('active');
}

function hideInspector(){
    projectInspector.classList.remove('active');
}