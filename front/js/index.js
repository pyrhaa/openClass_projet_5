// Fetching data from backend
const createArticle = (data) => {
  const section = document.getElementById('items');

  data.forEach((product) => {
    section.innerHTML += `<a href="./product.html?id=${product._id}">
      <article>
           <img src="${product.imageUrl}" alt="${product.altTxt}">
           <h3 class="productName">${product.name}</h3>
           <p class="productDescription">${product.description}</p>
         </article>
       </a>`;
  });
};

const getAllProducts = () => {
  fetch('http://localhost:3000/api/products/')
    .then((res) => res.json())
    .then((products) => createArticle(products));
};

getAllProducts();
