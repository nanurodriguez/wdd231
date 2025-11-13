//This file will contain the function that populates the section selection element on the page.
import { byuiCourse } from "./course.mjs";
export function setSectionSelection( sections) {
  const sectionSelect = document.querySelector("#sectionNumber");
  byuiCourse.sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNumber;
    option.textContent = `${section.sectionNumber}`;
    sectionSelect.appendChild(option);
  });
}
export { setSectionSelection as populateSections };