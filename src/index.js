const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
let peticion = 5;

const getData = (api) => {
  fetch(`${api}?offset=${peticion}&limit=10`)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map((product) => {
        // template
      });
      let newItem = document.createElement("section");
      newItem.classList.add("Item");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = () => {
  getData(API);
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    // Forma de saber si el scroll llego al final de la página
    // const positionBottom =
    //   document.documentElement.scrollTop +
    //     document.documentElement.clientHeight >=
    //   document.documentElement.scrollHeight - 15;
    if (entries[0].isIntersecting) {
      peticion += 10;
      getData(API);
      position();
    }
  },
  {
    root: $observe,
    rootMargin: "0px 0px 100% 0px",
    threshold: 0.15,
  }
);

intersectionObserver.observe($observe);

const position = () => {
  localStorage.setItem("pagination", peticion);
};

loadData();
