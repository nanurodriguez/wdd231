//This file will contain the functions that are used to render the course title and sections to the page.

export function setTitle(course){
  document.querySelector("#courseName").textContent = course.name;
  document.querySelector("#courseCode").textContent = course.code;
}

export function renderSections(sections){
  const html = sections.map(
    (section) => `<tr>
    <td>${section.sectionNumber}</td>
    <td>${section.enrolled}</td>
    <td>${section.instructor}</td></tr>`
  );
  document.querySelector("#sections").innerHTML = html.join("");
}
setTitle(byuiCourse);
renderSections(byuiCourse.sections);