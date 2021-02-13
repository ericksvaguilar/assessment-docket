import {isValidForm} from './utilities.js';
import {getURLs} from './apis.js';

const formElement = document.querySelector('[data-js="form"]');
const output = document.querySelector('[data-js="output"]');

const handleSubmit = ({
  target: form,
  target: {
    name: {value: name},
    email: {value: email},
    phone: {value: phone},
    phone2: {value: phone2},
  },
}) => {
  if (isValidForm(form)) {
    name = `<strong>${name}</strong>`;
    email = `<strong>${email}</strong>`;
    phone = `<strong>${phone}</strong>`;
    phone2 = phone2
      ? `<strong>${phone2}</strong>`
      : `<strong class='null'>Não Informado</strong>`;
    generateHTML({
      name,
      email,
      phone,
      phone2,
    });
    window.alert('Candidatura enviada com sucesso!');
    form.reset();
  }
};

const generateHTML = ({name, email, phone, phone2}) => {
  const ul = document.createElement('ul');

  ul.appendChild(generateListItem(`Nome Completo: <br/>${name}`));
  ul.appendChild(generateListItem(`E-mail: <br />${email}`));
  ul.appendChild(generateListItem(`Telefone 1: <br />${phone}`));
  ul.appendChild(generateListItem(`Telefone 2: <br />${phone2}`));

  output.innerHTML = ul.outerHTML;
};

const generateListItem = (listContent) => {
  let listItem = document.createElement('li');
  listItem.innerHTML = listContent;
  return listItem;
};

// API handle data
getURLs().then((urls) => insertUrlsIntoHTML(urls));

const insertUrlsIntoHTML = (urls) => {
  const carouselItems = document.querySelector('[data-js="carousel-items"');

  const items = urls.map((url) => {
    return `
        <div class='item'>
          <img src='${url}' />
        </div>
      `;
  });

  carouselItems.innerHTML = items;
};

// Event Listeners
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSubmit(e);
});
