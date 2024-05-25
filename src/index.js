// import { SkeletonCard } from "./template/SkeletonCard.mjs"; // Add this line
const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
const pagination = Number(localStorage.getItem("pagination"));
localStorage["pagination"] = 5;
let initialState = true;

// const loadingSkelleton = () => {
//   const newItem = document.createElement("section");
//   newItem.classList.add("Items-Skeleton");
//   newItem.innerHTML = SkeletonCard();
//   $app.appendChild(newItem);
// };

// const hidenSkelleton = () => {
//   const skeleton = document.querySelector(".Items-Skeleton");
//   skeleton.style.display = "none";
// };

window.addEventListener("beforeunload", () => {
  localStorage.removeItem("pagination");
});

const getData = (api) => {
  // loadingSkelleton();
  const apiLocal = pagination ?? petition;
  try {
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
              </article>`;
            })
            .join("");
          let newItem = document.createElement("section");
          newItem.classList.add("Items");
          newItem.innerHTML = output;
          $app.appendChild(newItem);
        }
      });
  } catch (error) {
    console.log(error);
  } // finally {
  //   hidenSkelleton();
  // }
};

const loadData = async () => {
  if (initialState) {
    initialState = false;
  } else {
    position();
  }
  await getData(`${API}?offset=${localStorage.getItem("pagination")}&limit=10`);
};

const position = () => {
  localStorage["pagination"] += 10;
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

intersectionObserver.observe($observe);
