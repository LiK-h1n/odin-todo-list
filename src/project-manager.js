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

  const getInbox = () =>
    _projects.find((project) => project.getTitle() === "Inbox");

  const save = () => {
    const dataString = JSON.stringify(
      _projects.map((project) => project.toJSON())
    );

    localStorage.setItem("taskMasterData", dataString);

    console.log("Saved");
  };

  return {
    addProject,
    deleteProject,
    getAllProjects,
    getProjectById,
    setActiveProject,
    getActiveProject,
    getInbox,
    save,
  };
})();

projectManager.addProject("Inbox");
projectManager.setActiveProject(projectManager.getInbox().getId());

export { projectManager };
