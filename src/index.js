const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
const pagination = Number(localStorage.getItem("pagination"));
let petition = 5;

window.addEventListener("load", () => {
  localStorage.removeItem("pagination");
  position();
  loadData();
  intersectionObserver.observe($observe);
  setTimeout(() => {
    $observe.style.display = "block";
  }, 2000);
});

const getData = (api) => {
  const apiLocal = pagination ?? petition;
  fetch(`${api}?offset=${apiLocal}&limit=10`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((response) => {
      let products = response;
      let output = products.map((product) => {
        const { title, price, image } = product;
        // Agregar una imagen por defecto en caso de que no haya una
        const imageDefault = "../public/assets/not_found.webp";
        return `
        <article class="Card">
          <img src="${image ?? imageDefault}" alt="${title}"/>
          <h2>
            ${title}
            <small>$ ${price}</small>
          </h2>
        </article>
        `;
      });
      let newItem = document.createElement("section");
      newItem.classList.add("Items");
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch((error) => console.log(error));
};

const loadData = async () => {
  await getData(API);
};

const position = () => {
  const stringifyPetition = JSON.stringify(petition);
  localStorage.setItem("pagination", stringifyPetition);
  console.log(localStorage.getItem("pagination"));
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

pagination !== 195
  ? intersectionObserver.observe($observe)
  : intersectionObserver.unobserve($observe);
