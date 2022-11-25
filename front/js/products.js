// Récupère l'ID du product
const productId = new URL(location.href).searchParams.get('id');
// Sélectionne la couleur du product
const selectColor = document.querySelector('#colors');
// Sélectionne la quantité du product
const selectQuantity = document.querySelector('#quantity');
// Récupération de la liste d'articles dans le panier ou données du localStorage
const cartData = JSON.parse(localStorage.getItem('cart'));

// Fonction qui récupère les données de la promesse .then(product) pour injecter les valeurs dans le fichier HTML
const selectProduct = (product) => {
  // Integrate product data to the page HTML Intègre les données du product vers la page HTML
  document.querySelector('head > title').textContent = product.name;
  document.querySelector(
    '.item__img'
  ).innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.querySelector('#title').textContent += product.name;
  document.querySelector('#price').textContent += product.price;
  document.querySelector('#description').textContent += product.description;

  // Boucle intégrant les différentes couleurs du produit dans le HTML
  for (color of product.colors) {
    const option = document.createElement('option');
    option.innerHTML = `${color}`;
    option.value = `${color}`;
    selectColor.appendChild(option);
  }
};

// Fonction qui enregistre dans un objet les options de l'utilisateur au click sur le bouton ajouter au panier
const registerProduct = (product) => {
  // Sélection du bouton Ajouter au panier
  const addToCart = document.querySelector('#addToCart');
  // Écoute de l'évènement click sur le bouton ajouter
  addToCart.addEventListener('click', (event) => {
    event.preventDefault();
    // Récupération des informations du produit sélectionné
    let selectedProducts = {
      id: product._id,
      name: product.name,
      img: product.imageUrl,
      altTxt: product.altTxt,
      description: product.description,
      color: selectColor.value,
      quantity: Number(selectQuantity.value)
    };
    let checkQuantity = [];
    let resultQuantityAdd;
    // Si le localStorage existe
    if (cartData) {
      // On recherche avec la méthode find() si l'id et la couleur d'un article sont déjà présents
      checkQuantity = cartData.find(
        (item) =>
          item.id == selectedProducts.id && item.color == selectedProducts.color
      );
    }
    //Permettra de vérifier que la quantité ne dépasse pas 100
    if (checkQuantity) {
      resultQuantityAdd = checkQuantity.quantity + selectedProducts.quantity;
    }

    if (selectedProducts.color === '') {
      confirm('Veuillez sélectionner une couleur');
    } else if (selectedProducts.quantity === 0) {
      confirm("Nombre d'articles insuffisants");
    } else if (selectedProducts.quantity > 100) {
      selectedProducts.quantity = 0;
      confirm("Nombre d'articles dépasse la limite de 100");
    } else if (
      (cartData && checkQuantity && checkQuantity.quantity === 100) ||
      resultQuantityAdd > 100
    ) {
      selectedProducts.quantity = 0;
      confirm(
        'La quantité de cet article dans le panier dépasse la limite de 100'
      );
    } else {
      // Si le localStorage existe
      if (cartData) {
        // On recherche avec la méthode find() si l'id et la couleur d'un article sont déjà présents
        let itemArray = cartData.find(
          (item) =>
            item.id == selectedProducts.id &&
            item.color == selectedProducts.color
        );
        const sameItemColor = selectedProducts.color;
        // Si oui, on incrémente la nouvelle quantité et la mise à jour du prix total de l'article
        if (
          itemArray &&
          sameItemColor === itemArray.color &&
          itemArray.quantity <= 100
        ) {
          itemArray.quantity = itemArray.quantity + selectedProducts.quantity;
          itemArray.totalPrice += itemArray.price * selectedProducts.quantity;
          localStorage.setItem('cart', JSON.stringify(cartData));
        } else if (
          itemArray &&
          sameItemColor === itemArray.color &&
          itemArray.quantity >= 100
        ) {
          confirm(
            'La quantité de cet article dans le panier dépasse la limite de 100'
          );
          selectedProducts.quantity = 0;
        } else {
          // Si non, alors on push le nouvel article sélectionné
          cartData.push(selectedProducts);
          localStorage.setItem('cart', JSON.stringify(cartData));
        }
      } else {
        // Sinon création d'un tableau dans le lequel on push l'objet "selectedProduct"
        let createLocalStorage = [];
        createLocalStorage.push(selectedProducts);
        localStorage.setItem('cart', JSON.stringify(createLocalStorage));
      }
      // Refresh de la page
      location.reload();
      alert('Votre article est ajouté au panier');
    }
  });
};

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => {
    return res.json();
  })
  .then((product) => {
    selectProduct(product);
    registerProduct(product);
  })
  .catch((e) => {
    console.log('There is this following ERROR: ' + e);
  });
