const getProductId = () => {
  return new URL(location.href).searchParams.get('id');
};
const orderId = getProductId();

const idConfirmation = document.querySelector('#orderId');

const btnReturnHtml = `<div class="item__content__returnButton">
<a href="./index.html"><button id="btnReturn">Retour à l'accueil</button></a></div>`;

const clearData = () => {
  idConfirmation.innerHTML = `
  <br>
  <strong>${orderId}</strong><br>
  <br>
  `;

  idConfirmation.insertAdjacentHTML('beforeend', btnReturnHtml);

  localStorage.clear();
};
clearData();
