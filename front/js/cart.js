let cartData = JSON.parse(localStorage.getItem('cart'));

let products = [];

let orderId = '';

console.log(cartData);

const contact = {
  firstName: document.querySelector('#firstName').value,
  lastName: document.querySelector('#lastName').value,
  address: document.querySelector('#address').value,
  city: document.querySelector('#city').value,
  email: document.querySelector('#email').value
};

const getProductById = (productId) => {
  const result = fetch('http://localhost:3000/api/products/' + productId)
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      return res;
    })
    .catch((e) => {
      console.log(console.log('There is this following ERROR: ' + e));
    });
  return result;
};

const changeQuantity = () => {
  const quantityInputs = document.querySelectorAll('.itemQuantity');
  quantityInputs.forEach((quantityInput) => {
    quantityInput.addEventListener('change', (event) => {
      event.preventDefault();
      const inputValue = event.target.value;
      const dataId = event.target.getAttribute('data-id');
      const dataColor = event.target.getAttribute('data-color');
      let cart = localStorage.getItem('cart');
      let items = JSON.parse(cart);

      items = items.map((item, index) => {
        if (item.id === dataId && item.color === dataColor) {
          item.quantity = inputValue;
        }
        return item;
      });

      let itemsStr = JSON.stringify(items);
      localStorage.setItem('cart', itemsStr);

      location.reload();
    });
  });
};

const deleteItem = () => {
  const deleteButtons = document.querySelectorAll('.deleteItem');
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      const deleteId = event.target.getAttribute('data-id');
      const deleteColor = event.target.getAttribute('data-color');
      cart = cart.filter(
        (element) => !(element.id == deleteId && element.color == deleteColor)
      );
      console.log(cart);

      localStorage.setItem('cart', JSON.stringify(cart));

      location.reload();
      alert('Article supprimé du panier.');
    });
  });
};

const displayCart = async () => {
  let cartArray = [];
  let totalQuantity = 0;
  let totalPrice = 0;
  let i;
  const parser = new DOMParser();
  const positionEmptyCart = document.getElementById('cart__items');

  if (cartData === null || cartData === 0) {
    positionEmptyCart.textContent = 'Votre panier est vide';
  } else {
    console.log('Des produits sont présents dans le panier');
  }

  for (let i = 0; i < cartData.length; i++) {
    const product = await getProductById(cartData[i].id);
    const totalPriceItem = (product.price *= cartData[i].quantity);
    cartArray += `<article class="cart__item" data-id="${cartData[i].id}" data-color="${cartData[i].color}">
                  <div class="cart__item__img">
                      <img src="${product.imageUrl}" alt="${product.altTxt}">
                  </div>
                  <div class="cart__item__content">
                      <div class="cart__item__content__description">
                          <h2>${product.name}</h2>
                          <p>${cartData[i].color}</p>
                          <p>Prix unitaire: ${product.price}€</p>
                      </div>
                      <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p id="quantité">
                              Qté : <input data-id= ${cartData[i].id} data-color= ${cartData[i].color} type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${cartData[i].quantity}>
                            </p>
                            <p id="sousTotal">Prix total pour cet article: ${totalPriceItem}€</p>
                        </div>
                        <div class="cart__item__content__settings__delete">
                          <p data-id= ${cartData[i].id} data-color= ${cartData[i].color} class="deleteItem">Supprimer</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  </article>`;
  }

  for (let i = 0; i < cartData.length; i++) {
    const article = await getProductById(cartData[i].id);
    totalQuantity += parseInt(cartData[i].quantity);
    totalPrice += parseInt(article.price * cartData[i].quantity);
  }

  document.getElementById('totalQuantity').innerHTML = totalQuantity;
  document.getElementById('totalPrice').innerHTML = totalPrice;

  if (i === cartData.length) {
    const displayBasket = parser.parseFromString(cartArray, 'text/html');
    positionEmptyCart.appendChild(displayBasket.body);
    changeQuantity();
    deleteItem();
  }
};

displayCart();

/* LE FORMULAIRE */

// bouton valider
const btnValidate = document.querySelector('#order');

// validation par click
btnValidate.addEventListener('click', (event) => {
  event.preventDefault();

  // Regex champs Prénom, Nom et Ville
  const regexPNV = (value) => {
    return /^[A-Z][A-Za-z\é\è\ê\-]+$/.test(value);
  };

  // Regex champ Adresse
  const regexAddress = (value) => {
    return /^[a-zA-Z0-9.,-_ ]{5,50}[ ]{0,2}$/.test(value);
  };

  // Regex champ Email
  const regexMail = (value) => {
    return /^[_a-z0-9-]+(.[_a-z0-9-]+)*@[a-z0-9-]+(.[a-z0-9-]+)*(.[a-z]{2,4})$/.test(
      value
    );
  };

  // Fonction contrôle champ Prénom:
  const firstNameControl = () => {
    const prenom = contact.firstName;
    let inputFirstName = document.querySelector('#firstName');
    if (regexPNV(prenom)) {
      inputFirstName.style.backgroundColor = 'green';

      document.querySelector('#firstNameErrorMsg').textContent = '';
      return true;
    } else {
      inputFirstName.style.backgroundColor = '#FF6F61';

      document.querySelector('#firstNameErrorMsg').textContent =
        'le Prenom doit commencer par une majuscule';
      return false;
    }
  };

  // Fonction contrôle champ Nom:
  const lastNameControl = () => {
    const nom = contact.lastName;
    let inputLastName = document.querySelector('#lastName');
    if (regexPNV(nom)) {
      inputLastName.style.backgroundColor = 'green';

      document.querySelector('#lastNameErrorMsg').textContent = '';
      return true;
    } else {
      inputLastName.style.backgroundColor = '#FF6F61';

      document.querySelector('#lastNameErrorMsg').textContent =
        'le Nom doit commencer par une majuscule';
      return false;
    }
  };

  // Fonction contrôle champ Adresse:
  const addressControl = () => {
    const adresse = contact.address;
    let inputAddress = document.querySelector('#address');
    if (regexAddress(adresse)) {
      inputAddress.style.backgroundColor = 'green';

      document.querySelector('#addressErrorMsg').textContent = '';
      return true;
    } else {
      inputAddress.style.backgroundColor = '#FF6F61';

      document.querySelector('#addressErrorMsg').textContent =
        'Entrez une adresse valide par exemple: 50 rue de la paix';
      return false;
    }
  };

  // Fonction contrôle champ Ville:
  const cityControl = () => {
    const ville = contact.city;
    let inputCity = document.querySelector('#city');
    if (regexPNV(ville)) {
      inputCity.style.backgroundColor = 'green';

      document.querySelector('#cityErrorMsg').textContent = '';
      return true;
    } else {
      inputCity.style.backgroundColor = '#FF6F61';

      document.querySelector('#cityErrorMsg').textContent =
        'la Ville doit commencer par une majuscule';
      return false;
    }
  };

  // Fonction contrôle champ Mail:
  const mailControl = () => {
    const courriel = contact.email;
    let inputMail = document.querySelector('#email');
    if (regexMail(courriel)) {
      inputMail.style.backgroundColor = 'green';

      document.querySelector('#emailErrorMsg').textContent = '';
      return true;
    } else {
      inputMail.style.backgroundColor = '#FF6F61';

      document.querySelector('#emailErrorMsg').textContent =
        'Entrez une adresse mail valide par exemple: example@monMail.com';
      return false;
    }
  };

  // Contrôle validité formulaire avant l'envoi dans le local storage
  if (
    firstNameControl() &&
    lastNameControl() &&
    addressControl() &&
    cityControl() &&
    mailControl()
  ) {
    // Enregistre le formulaire dans le local storage
    localStorage.setItem('contact', JSON.stringify(contact));

    document.querySelector('#order').value =
      'Articles et formulaire validés ! Commande effectuée';
    // sendToServer();
  } else {
    alert('Veuillez remplir correctement le formulaire');
  }

  /* FIN GESTION DU FORMULAIRE */
});
