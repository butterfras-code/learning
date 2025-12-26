//projects array of objects
// Each object represents a project with its details
let projects = []
// Function to display projects on the webpage
function displayProjects() {
    const projectsDiv = document.getElementById("projectsDiv");
    projects.forEach(project => {
        const projectElement = document.createElement("div");
        projectElement.innerHTML = `
            <div class="project">
                <div class="project-title">
                    <h3>${project.title}</h3></div>
                    <p>${project.description}</p>
                    <a href="${project.relativeLink}">View Project</a>
                </div>
            </div>
        `;
        projectsDiv.appendChild(projectElement);
    });
}
async function loadProjects() {
    try {
        const res = await fetch('./projects.json'); // or './projects.json' if you rename
        if (!res.ok) throw new Error(res.statusText);
        projects = await res.json();
        displayProjects();
    } catch (err) {
        console.error('Failed to load projects.json:', err);
    }
}
window.onload = function() {
    loadProjects();
    displayProjects();
}