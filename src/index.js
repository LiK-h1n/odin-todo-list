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

import { projectManager } from "./project-manager.js";
import { createTodo } from "./todo.js";
import { displayController } from "./display-controller.js";
import "./styles.css";

const inbox = projectManager.getInbox();
inbox.addTodo(createTodo("Finish the Odin Todo project"));
inbox.addTodo(createTodo("Call the gym for membership details"));

const gymProject = projectManager.addProject("Gym");
gymProject.addTodo(createTodo("Squats: 3 sets of 10"));
gymProject.addTodo(createTodo("Deadlifts: 1 rep max"));

const codingProject = projectManager.addProject("Study Plan");
codingProject.addTodo(createTodo("Master localStorage logic"));
codingProject.addTodo(createTodo("Learn date-fns formatting"));

const sampleTodo = codingProject.getTodos()[0];
sampleTodo.setDescription("Crucial for the 20-day sprint goal!");
sampleTodo.setPriority("high");

displayController.init();
