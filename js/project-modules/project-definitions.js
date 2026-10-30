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

export class ExternalLink{
    constructor({url, label, icon})
    {
        this.url = url;
        this.label = label;
        this.icon = icon;
    }
}