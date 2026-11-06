import * as ProjectManager from "./project-manager.js";
import {CatalogueConfigs} from "./catalogue-configs.js";
import {SITE_ROOT} from "../paths.js";


const catalogue = document.querySelector('[data-catalogue]')
const cardContainer = catalogue.querySelector('.card-listing')
let cardTemplate = null;


const catalogueScaler = {
    //Fixed properties
    config: null,
    containerSurplus: null,
    
    //Dynamic properties
    cardsPerRow: 0,

    //Other reference cache
    screenWidthUse: null,
    
    //functions
    initService(){
        //Process fixed values
        this.config = CatalogueConfigs[catalogue.dataset.catalogue]
        
        const catalogueStyles = getComputedStyle(catalogue);
        this.containerSurplus =
            (parseFloat(catalogueStyles.paddingInline) * 2) +
            (parseFloat(catalogueStyles.borderInlineWidth) * 2)
        
        const main = document.querySelector('main');
        const mainStyles = getComputedStyle(main);
        this.screenWidthUse = parseFloat(mainStyles.maxWidth) / 100;
        
        //Apply initial configuration
        catalogue.style.setProperty(
            '--card-width',
            `${this.config.cardWidth}px`
        )
        catalogue.style.setProperty(
            '--card-height',
            `${this.config.cardHeight}px`
        )
        catalogue.style.setProperty(
            '--card-separation',
            `${this.config.cardSeparation}px`
        )
        catalogue.style.setProperty(
            '--card-border-size',
            `${this.config.cardBorderSize}px`
        )
        
        //Initialise services
        window.addEventListener('resize', () => {
            this.handleResize();
        })
        
        //Apply initial results
        
        this.cardsPerRow = this.config.maxCardsPerRow;
        
        this.updateScale();
    },
    
    updateScale(){
        const totalWidth = this.config.calculateTotalWidth(this.cardsPerRow);
        console.log(totalWidth + " is the total width calculated, at " +
            this.cardsPerRow + " cards accommodated");
        
        catalogue.style.setProperty(
            '--total-list-width',
            `${totalWidth}px`
        );
    },
    
    handleResize(){
        const availableWidth = 
            document.documentElement.clientWidth * this.screenWidthUse;
        
        //Growth check
        if(this.cardsPerRow < this.config.maxCardsPerRow){
            let nextRequiredWidth = 
                this.config.calculateTotalWidth(this.cardsPerRow + 1) + 
                this.containerSurplus;
            
            //Initial growth comparison
            if(availableWidth >= nextRequiredWidth){
                if(this.cardsPerRow === 1) {
                    catalogue.classList.remove('compact-mode')
                }
                //Explore if it can grow more than 1
                while(this.cardsPerRow < this.config.maxCardsPerRow &&
                    availableWidth >= this.config.calculateTotalWidth(this.cardsPerRow + 1) +
                    this.containerSurplus
                    ){
                    this.cardsPerRow++;
                }
                
                //Apply changes
                this.updateScale();
                return;
            }
        }
        
        //Shrink check
        if(this.cardsPerRow > 1){
            const listWidth = cardContainer.clientWidth;
            
            if(listWidth < this.config.calculateTotalWidth(this.cardsPerRow)) {
                while(
                    this.cardsPerRow > 1 &&
                        listWidth < this.config.calculateTotalWidth(this.cardsPerRow)
                    ){
                    this.cardsPerRow--;
                }
                
                //Apply changes
                
                //If its exactly one, apply the compact mode.
                if(this.cardsPerRow === 1){
                    catalogue.classList.add('compact-mode');
                    return;
                }
                this.updateScale();
            }
            
        }
        
    }
}
//Functions

//Init
async function initRenderer(){
    if(!catalogue || !cardContainer) {return;}
    
    catalogueScaler.initService();
    
    cardTemplate = await loadCardTemplate();
    
    loadUnfilteredList();
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
    
    cardContainer.replaceChildren();
    projectList.forEach(project => {
        const card = cardTemplate.content.cloneNode(true);
        
        cardContainer.append(createCard(project, cardTemplate));
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