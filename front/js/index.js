// Création d'une liste des produits à partir des données de l'API et intégration des différents produits dans la page d'accueil
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

// Récupération des données de l'API
const getAllProducts = () => {
  fetch('http://localhost:3000/api/products/')
    .then((res) => res.json())
    .then((products) => createArticle(products));
};

getAllProducts();
