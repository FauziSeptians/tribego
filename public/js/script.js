let searchBtn = document.querySelector("#search-btn");
let searchBar = document.querySelector(".search-bar-container");
let formBtn = document.querySelector("#login-btn");
let registerBtn = document.querySelector("#register-btn");
let loginForm = document.querySelector(".login-form-container");
let registerForm = document.querySelector(".register-form-container");
let formClose = document.querySelector("#form-close");
let menu = document.querySelector("#menu-bar");
let navbar = document.querySelector(".navbar");
let videoBtn = document.querySelectorAll(".vid-btn");

window.onscroll = () => {
  searchBtn.classList.remove("fa-times");
  searchBar.classList.remove("active");
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
  loginForm.classList.remove("active");
};

menu.addEventListener("click", () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
});

searchBtn.addEventListener("click", () => {
  searchBtn.classList.toggle("fa-times");
  searchBar.classList.toggle("active");
});

formBtn.addEventListener("click", () => {
  if (registerForm.classList.contains("active")) {
    registerForm.classList.remove("active");
  }
  loginForm.classList.add("active");
});

formClose.addEventListener("click", () => {
  if (loginForm.classList.contains("active")) {
    loginForm.classList.remove("active");
  }
  registerForm.classList.remove("active");
});

registerBtn.addEventListener("click", () => {
  loginForm.classList.remove("active");
  registerForm.classList.add("active");
});

videoBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".controls .active").classList.remove("active");
    btn.classList.add("active");
    let src = btn.getAttribute("data-src");
    document.querySelector("#video-slider").src = src;
  });
});

let navbarId = document.getElementById("navbar");
let navLinks = navbarId.querySelectorAll("a.link");
let currentPath = window.location.pathname;

navLinks.forEach((link) => {
  if (
    currentPath === link.getAttribute("href") ||
    currentPath.startsWith(link.getAttribute("href") + "/") ||
    (currentPath === "/" && link.getAttribute("href") === "/")
  ) {
    link.classList.add("active-navbar");
  } else {
    link.classList.remove("active-navbar");
  }
});

var swiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    640: {
      slidesPerview: 1,
    },
    768: {
      slidesPerview: 2,
    },
    1024: {
      slidesPerview: 3,
    },
  },
});

const loginBtn = document.getElementById("login-btn");
const exitBtn = document.getElementById("exit-btn");
const loginFormContainer = document.querySelector(".login-form-container");

loginBtn.addEventListener("click", () => {
  loginFormContainer.classList.add("active");
  exitBtn.classList.add("visible");
});

exitBtn.addEventListener("click", () => {
  loginFormContainer.classList.remove("active");
  exitBtn.classList.remove("visible");
});

var swiper = new Swiper(".brand-slider", {
  spaceBetween: 20,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  breakpoints: {
    450: {
      slidesPerview: 2,
    },
    768: {
      slidesPerview: 3,
    },
    991: {
      slidesPerview: 4,
    },
    1200: {
      slidesPerview: 5,
    },
  },
});
