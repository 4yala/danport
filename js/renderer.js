// Renderer module for card picking
// Add your event listener logic here

document.addEventListener('DOMContentLoaded', () => {
    const projectListElement = document.querySelector('[data-project-list]');
    if (projectListElement) {
        projectListElement.addEventListener('click', (event) => {
            // Find the closest ancestor with `data-project-id` attribute
            const projectIdElement = event.target.closest('[data-project-id]');
            if (!projectIdElement) return;

            const projectId = projectIdElement.dataset.projectId;
            
            // Retrieve the project instance from ProjectManager
            const projectInstance = ProjectManager.getProjectById(projectId);
            if (!projectInstance) return;

            // Populate inspector with the selected project instance
            populateInspector(projectInstance);
        });
    }
});