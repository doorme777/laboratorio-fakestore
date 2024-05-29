import { SkeletonCard } from "./template/SkeletonCard.js";
// import Card from "./template/Card.js";
const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const loading = document.querySelector(".loading");
const API = "https://api.escuelajs.co/api/v1/products";
localStorage["pagination"] = 5;
let initialState = true;

window.addEventListener("beforeunload", () => {
  localStorage.removeItem("pagination");
});

const getData = (api) => {
  fetch(api, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      if (products.length === 0) {
        intersectionObserver.disconnect();
        let newItem = document.createElement("section");
        newItem.classList.add("Items");
        newItem.innerHTML = "<h2>No hay más productos</h2>";
        $app.appendChild(newItem);
      } else {
        let output = products
          .map((product) => {
            const { title, price, images } = product;
            // Agregar una imagen por defecto en caso de que no haya una
            const imageDefault = "../public/assets/not_found.webp";
            console.log(images);
            return `
            <article class="Card">
              <img src="${images[0]}" alt="${title}"/>
              <h2>
                ${title}
                <small>$ ${price}</small>
              </h2>
            </article>`;
          })
          .join("");
        let newItem = document.createElement("section");
        newItem.classList.add("Items");
        newItem.innerHTML = output;
        $app.appendChild(newItem);
      }
    })
    .catch((error) => {
      const newItem = document.createElement("h2");
      newItem.innerHTML = "Error al cargar los productos: " + error;
      loading.style.display = "none";
      $app.appendChild(newItem);
    });
};

const loadData = async () => {
  if (initialState) {
    initialState = false;
  } else {
    position();
  }
  await getData(
    `${API}?offset=${localStorage.getItem("pagination")}&limit=10hola`
  );
};

const position = () => {
  localStorage["pagination"] =
    parseInt(localStorage.getItem("pagination")) + 10;
};

const intersectionObserver = new IntersectionObserver(
  (entries) => {
    if (entries[0].isIntersecting) {
      loadData();
    }
  },
  {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.5,
  }
);

intersectionObserver.observe($observe);
