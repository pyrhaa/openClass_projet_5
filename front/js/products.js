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

const selectedProduct = (product) => {
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

fetch(`http://localhost:3000/api/products/${productId}`)
  .then((res) => {
    return res.json();
  })
  .then((product) => {
    selectedProduct(product);
  })
  .catch((e) => {
    console.log(console.log('There is this following ERROR: ' + e));
  });
