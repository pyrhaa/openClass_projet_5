// Fetch ID of the product
const getProductId = () => {
  return new URL(location.href).searchParams.get('id');
};
const productId = getProductId();
// select id color
const selectColor = document.querySelector('#colors');
// select id quantity
const selectQuantity = document.querySelector('#quantity');

// select button add to cart
const addToCart = document.querySelector('#addToCart');

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
  addToCart.addEventListener('click', (event) => {
    event.preventDefault();

    if (selectColor.value === '') {
      confirm('Veuillez sélectionner une couleur');
    } else if (selectQuantity.value === '0') {
      confirm("Nombre d'articles insuffisants");
    } else {
      const cartData = JSON.parse(localStorage.getItem('cart'));
      const selectedProducts = {
        id: product._id,
        name: product.name,
        img: product.imageUrl,
        altTxt: product.altTxt,
        description: product.description,
        color: selectColor.value,
        quantity: parseInt(selectQuantity.value, 10)
      };

      if (cartData) {
        let itemArray = cartData.find(
          (item) =>
            item.id == selectedProducts.id &&
            item.color == selectedProducts.color
        );
        const sameItemColor = selectedProducts.color;

        if (itemArray && sameItemColor === itemArray.color) {
          itemArray.quantity = itemArray.quantity + selectedProducts.quantity;
          itemArray.totalPrice += itemArray.price * selectedProducts.quantity;
          localStorage.setItem('cart', JSON.stringify(cartData));
        } else {
          cartData.push(selectedProducts);
          localStorage.setItem('cart', JSON.stringify(cartData));
        }
      } else {
        let createLocalStorage = [];
        createLocalStorage.push(selectedProducts);
        localStorage.setItem('cart', JSON.stringify(createLocalStorage));
      }
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
