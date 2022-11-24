// Fetch ID of the product
const productId = new URL(location.href).searchParams.get('id');
// select id color
const selectColor = document.querySelector('#colors');
const selectQuantity = document.querySelector('#quantity');
// select id quantity
const cartData = JSON.parse(localStorage.getItem('cart'));

//function 1
const selectProduct = (product) => {
  // Integrate product data to the page HTML
  document.querySelector('head > title').textContent = product.name;
  document.querySelector(
    '.item__img'
  ).innerHTML += `<img src="${product.imageUrl}" alt="${product.altTxt}">`;
  document.querySelector('#title').textContent += product.name;
  document.querySelector('#price').textContent += product.price;
  document.querySelector('#description').textContent += product.description;

  // loop for colors of the product
  for (color of product.colors) {
    const option = document.createElement('option');
    option.innerHTML = `${color}`;
    option.value = `${color}`;
    selectColor.appendChild(option);
  }
};

//function 2
const registerProduct = (product) => {
  // select button add to cart
  const addToCart = document.querySelector('#addToCart');

  addToCart.addEventListener('click', (event) => {
    event.preventDefault();
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

    if (cartData) {
      checkQuantity = cartData.find(
        (item) =>
          item.id == selectedProducts.id && item.color == selectedProducts.color
      );
    }

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
      if (cartData) {
        let itemArray = cartData.find(
          (item) =>
            item.id == selectedProducts.id &&
            item.color == selectedProducts.color
        );
        const sameItemColor = selectedProducts.color;
        console.log('itemArray: ', itemArray);
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
          cartData.push(selectedProducts);
          localStorage.setItem('cart', JSON.stringify(cartData));
        }
      } else {
        let createLocalStorage = [];
        createLocalStorage.push(selectedProducts);
        localStorage.setItem('cart', JSON.stringify(createLocalStorage));
      }
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
