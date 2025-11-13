
//import the byuiCourse object from the course module
import byuiCourse from "./course.mjs";

//import the setSectionSelection function from the sections module

import { setSectionSelection } from "./sections.mjs"; //the function is encased in squiggly brackets because it is a named export

//import the named function exports from the output file 
import {setTitle, renderSections} from "./output.mjs";



document.querySelector("#enrollStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);
  byuiCourse.changeEnrollment(sectionNum);
  renderSections(byuiCourse.sections);
});
document.querySelector("#dropStudent").addEventListener("click", function () {
  const sectionNum = Number(document.querySelector("#sectionNumber").value);
  byuiCourse.changeEnrollment(sectionNum, false);
  renderSections(byuiCourse.sections);
});

setTitle(byuiCourse);
renderSections(byuiCourse.sections);


