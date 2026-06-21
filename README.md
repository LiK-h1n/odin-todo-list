# Odin: Todo List

## Description

A professional-grade task management application built with vanilla JavaScript and modern front-end tooling. This project demonstrates the ability to manage complex data relationships (Projects containing Todos) and ensure data persistence using the Web Storage API. The architecture follows a strict modular pattern, separating internal logic from DOM manipulation and state management.

## Skills Demonstrated

- **Persistent Data Storage:** Implementing `localStorage` with a custom "Rehydration" logic to transform raw JSON strings back into functional objects with private methods.
- **Modular Architecture:** Utilizing ES6 Modules and Webpack to organize code into logical components (Manager, Display, Project, Todo).
- **Factory Functions & Closures:** Creating encapsulated data structures with private state, accessible only through a public API of getters and setters.
- **Advanced CRUD Operations:** Implementing the full lifecycle of data: Creating tasks/projects, Reading current state, Updating existing records (Edit Modal), and Deleting data.
- **Third-Party Integration:** Using `date-fns` for robust date parsing, formatting, and validation.
- **Dynamic UI Rendering:** Leveraging Template Literals for efficient and scalable UI generation, paired with Event Delegation for high-performance interaction handling.
