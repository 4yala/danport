//Data classes
export class Project{
    constructor({
        id,
        title,
        thumbnail,
        description,
        tags = [],
        status,
        uploadDate,
        highlights = [],
        links = []}) 
    {
        this.id = id;
        this.title = title;
        this.thumbnail = thumbnail;
        this.description = description;
        this.tags = tags;
        this.status = status;
        this.uploadDate = uploadDate;
        this.highlights = highlights;
        this.links = links;
    }
}

export class ExternalLink{
    constructor({url, label, icon})
    {
        this.url = url;
        this.label = label;
        this.icon = icon;
    }
}

export class CatalogueConfig{
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

//Read only objects
export const ProjectTags = Object.freeze({
    /*Project type*/
    GAME: 'Game',
    WEB: 'Web',
    APPLICATION: 'Application',
    ASSET: 'Asset',
    TOOL: 'Tool',
    
    /*Project technologies*/
    UNITY: 'Unity',
    UE: 'Unreal Engine',
    BLENDER: 'Blender',
    CSHARP: 'C#',
    CPLUSPLUS: 'C++',
})

export const ProjectStatus = Object.freeze({
    COMPLETED: 'Completed',
    ONGOING: 'Ongoing',
    ONHOLD: "On hold",
    CANCELLED: 'Cancelled',
})

export const CatalogueType = Object.freeze({
    FEATURED: 'featured',
    ALL: 'all'
})