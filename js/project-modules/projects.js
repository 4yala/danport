import {Project, ProjectTags, ProjectStatus, ExternalLink} from "./project-definitions.js";

export const projects = [
    new Project({
        id: "crystal-chaos",
        title: "Crystal Chaos",
        thumbnail: "./images/projects/crystal-chaos-thumbnail.png",
        description: "Play as a young adventurer, trapped within an expansive " +
            "cave system of a lost civilization in search of the Infamous Power Crystal. " +
            "Featuring 5 zones each with their own ecosystem, filled with a host of deadly enemy types. " +
            "Collect experience points to level up your characters stats and collect unique power ups to assist " +
            "you in your journey and unlock new weapons to utilize in your survival!\n" +
            "\n" +
            "Who knows what you'll find lurking in the depths...",
        tags: [
            ProjectTags.GAME,
            ProjectTags.APPLICATION,
            ProjectTags.UE
        ],
        status: ProjectStatus.COMPLETED,
        uploadDate: "30/04/2025",
        highlights:[
            'A collaborative project developed by 24 students',
            'Developed weapon, power-up, and resource systems',
            'Developed through UE5 blueprints'
        ],
        links:[
            new ExternalLink({
                url: "https://clever-critter-games.itch.io/crystal-chaos",
                label: "itch.io page",
                icon: 'images/icons/itch-io-icon.png'
                }
            )
        ]
    }),
    new Project({
        id: "portfolio-website",
        title: "danport.com",
        thumbnail: "./images/projects/website-thumbnail.png",
        description: "The website you are currently on!",
        tags: [
            ProjectTags.WEB,
            ProjectTags.APPLICATION,
        ],
        status: ProjectStatus.ONGOING,
        uploadDate: "30/10/2026",
        highlights:[
            'Developed through HTML, CSS and JavaScript',
            'Hosted on Github Pages'
        ]
    })
    
]