//This file will contain the function that populates the section selection element on the page.
function setSectionSelection() {
  const sectionSelect = document.querySelector("#sectionNumber");
  byuiCourse.sections.forEach((section) => {
    const option = document.createElement("option");
    option.value = section.sectionNumber;
    option.textContent = `${section.sectionNumber}`;
    sectionSelect.appendChild(option);
  });
}

export function populateSections(sections) {
  byuiCourse.sections = sections;
  setSectionSelection();
}