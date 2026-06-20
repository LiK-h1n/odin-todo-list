import { createProject } from "./project.js";

const projectManager = (function createProjectManager() {
  let _projects = [];
  let _activeProject = null;

  const addProject = (title) => {
    const project = createProject(title);
    _projects.push(project);

    return project;
  };

  const deleteProject = (projectId) => {
    _projects = _projects.filter((project) => project.getId() !== projectId);
  };

  const getAllProjects = () => _projects;

  const getProjectById = (projectId) =>
    _projects.find((project) => project.getId() === projectId);

  const setActiveProject = (projectId) => {
    _activeProject = getProjectById(projectId);
  };

  const getActiveProject = () => _activeProject;

  return {
    addProject,
    deleteProject,
    getAllProjects,
    getProjectById,
    setActiveProject,
    getActiveProject,
  };
})();

const inbox = projectManager.addProject("Inbox");
projectManager.setActiveProject(inbox.getId());

export { projectManager };
