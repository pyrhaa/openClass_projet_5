const clearData = (confirmation) => {
  const orderId = new URL(location.href).searchParams.get('id');
  const btnReturnHtml = `<div class="item__content__returnButton">
<a href="./index.html"><button id="btnReturn">Retour à l'accueil</button></a></div>`;
  confirmation.innerHTML = `
  <br>
  <strong>${orderId}</strong><br>
  <br>
  `;

  confirmation.insertAdjacentHTML('beforeend', btnReturnHtml);

  localStorage.clear();
};
clearData(document.querySelector('#orderId'));
