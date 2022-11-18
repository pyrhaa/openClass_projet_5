const getProductId = () => {
  return new URL(location.href).searchParams.get('id');
};
const orderId = getProductId();

const idConfirmation = document.querySelector('#orderId');

const btnReturnHtml = `<button id="retourAccueil"><a href="./index.html">Retour à l'accueil</a></button>`;

const clearData = () => {
  idConfirmation.innerHTML = `
  <br>
  <strong>${orderId}</strong>. <br>
  <br>
  `;

  idConfirmation.insertAdjacentHTML('beforeend', btnReturnHtml);

  localStorage.clear();
};
clearData();
