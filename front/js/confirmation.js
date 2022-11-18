const orderId = new URL(location.href).searchParams.get('id');

const idConfirmation = document.querySelector('#orderId');

const btnReturnHtml = `<div class="item__content__returnButton">
<a href="./index.html"><button id="btnReturn">Retour à l'accueil</button></a></div>`;

const clearData = (confirmation) => {
  confirmation.innerHTML = `
  <br>
  <strong>${orderId}</strong><br>
  <br>
  `;

  confirmation.insertAdjacentHTML('beforeend', btnReturnHtml);

  localStorage.clear();
};
clearData(idConfirmation);
