$(document).ready(function () {
    setTimeout(()=>{

    
  // submenu and sub pages
  let burger = document.querySelector(".header__burger");
  let header = document.querySelector(".header");
  let navbarContainer = header.querySelector(".header__container");
  const desktop = window.innerWidth > 1024 ? true : false;
  function dropMenu() {
    burger.classList.toggle("header__burger--active");
    header.classList.toggle("header--fixed");
    navbarContainer.classList.toggle("header__container--active");
    document.body.classList.toggle("overflow-disabled");
  }
  function dropSubmenu(event) {
    let ul;
    let elementEvent = event.target;
    console.log("elementEvent", elementEvent.tagName);
    let li = elementEvent.closest("li._navbar__item--children");
    li.querySelector("#sub-page").classList.toggle("_navbar__btn-page--active");
    ul = li.querySelector("ul._navbar__submenu").classList.toggle("_navbar__submenu--active")

    if (elementEvent.classList.value.includes("header__container")) {
      dropMenu();
    }
    //navbarContainer.classList.toggle("header__container--active");
  }

  if (!desktop) {
    burger.addEventListener("click", () => dropMenu());
    header.addEventListener("click", (event) => dropSubmenu(event));
  }

  // active header transparent
  const headerContainer = document.querySelector("#headerTransparent");
  function transparentHeader() {
    const position = window.pageYOffset >= 5;
    position
      ? headerContainer.classList.add("header-container--transparent")
      : headerContainer.classList.remove("header-container--transparent");
  }
  if (headerContainer && desktop) {
    window.onscroll = () => transparentHeader();
  }

  //event if  click in outset the menu
  if (!desktop) {
    document.addEventListener("click", (e) => {
      if (
        document.querySelector(".header__burger--active") &&
        !e.target.className.includes("header__bar") &&
        e.target.innerHTML.includes("header__container--active")
      ) {
        document.querySelector(".header__burger").click();
      }
    });
  }

  if (!desktop) {
    const imgLogo = document.querySelector(".header__logo img");
    const headerContainerMenu = document.querySelector(".header__container");
    const newDiv = () => {
      return document.createElement("div");
    };
    const divLogo = newDiv();
    const divBurger = newDiv();
    const burger = document.querySelector(".header__burger");

    divLogo.classList.value = "header__menu header__menu--logo";
    divLogo.innerHTML = `<img id="dnn_dnnLOGO_imgLogo" src="${
      imgLogo.src || ""
    }" alt="${imgLogo.alt || ""}"/>`;
    headerContainerMenu.prepend(divLogo);
    //burger add to menu mobile
    divBurger.classList.value = "header__burger header__burger--active";
    divBurger.innerHTML = burger.innerHTML;
    divBurger.addEventListener("click", () => burger.click());
    headerContainerMenu.append(divBurger);
  }
},2000)
});
