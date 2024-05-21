const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
let petition = 5;

const getData = (api) => {
  const apiLocal = localStorage.getItem("pagination") ?? petition;
  console.log(apiLocal);
  fetch(`${api}?offset=${apiLocal}&limit=10`)
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      console.log(products);
      let output = products.map((product) => {
        const { title, price, image } = product;
        return `
        <article class="Card">
          <img src="${image}" alt="${title}"/>
          <h2>
            ${title}
            <small>$ ${price}</small>
          </h2>
        </article>
        `;
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
    if (entries[0].isIntersecting) {
      // aquí nos dara un true solo cuando llegemos hasta abajo y que encontremos el elemento que estamos observando.
      petition += 5;
      getData(API);
      position();
    }
  },
  {
    root: $observe,
    rootMargin: "0px 0px 100% 0px",
    threshold: 0,
  }
);

intersectionObserver.observe($observe);

const position = () => {
  localStorage.setItem("pagination", petition);
};

loadData();
