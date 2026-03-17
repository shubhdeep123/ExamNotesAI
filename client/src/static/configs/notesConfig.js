export const notesConfig = {
  title: "Generate Notes",
  buttonText: "Generate Notes",
  fields: [
    {
      name: "topic",
      type: "text",
      placeholder: "Enter Topic (e.g Web Development)",
    },
    {
      name: "classLevel",
      type: "text",
      placeholder: "Enter Class / Level (e.g 12th Grade)",
    },
    {
      name: "examType",
      type: "text",
      placeholder: "Enter Exam Type (e.g JEE Advanced)",
    },
  ],
  toggles: [
    {
      name: "revisionMode",
      label: "Revision Mode",
    },
    {
      name: "includeDiagram",
      label: "Include Diagram",
    },
    {
      name: "includeChart",
      label: "Include Chart",
    },
  ],
};