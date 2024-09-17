$(document).ready(() => {
  if (window.innerWidth <= 768) {
    let aDion = ".net-accordion__";
    document
      .querySelectorAll(`${aDion}container ${aDion}child ${aDion}title`)
      .forEach((child) => {
        child.addEventListener("click", () =>
          child.parentElement.classList.toggle("active")
        );
      });
  }
});
