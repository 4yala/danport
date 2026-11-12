import {projects} from "./projects.js";

export function getProject(id){
    return projects.find(p => p.id === id) || null;
}
export function getProjects() {
    return projects;
}

export function getFeaturedProjects() {
    return projects.slice(0,4);
}
