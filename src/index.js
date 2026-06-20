// import { createTodo } from "./todo.js";
// import { projectManager } from "./project-manager.js";

// const gymProject = projectManager.addProject("gym");
// const squatsTask = createTodo("Squats");

// gymProject.addTodo(squatsTask);

// projectManager.getAllProjects().forEach((project) => {
//   console.log(`Project: ${project.getTitle()}`);

//   project.getTodos().forEach((todo) => {
//     console.log(` - Todo: ${todo.getTitle()}`);
//   });
// });

// ------------------------------------------------------

import { displayController } from "./display-controller.js";

displayController.init();
