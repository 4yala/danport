import {projects} from "./projects.js";

export function getProjects() {
    return projects;
}

export function getFeaturedProjects() {
    return projects.slice(0,4);
}
