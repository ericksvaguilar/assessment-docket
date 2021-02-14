import {isValidForm} from './utilities.js';
import {getURLs} from './apis.js';

const formElement = document.querySelector('[data-js="form"]');
const nextImage = document.querySelector('#next-image');
const prevImage = document.querySelector('#previous-image');

// Object destructuring to extract the form and input values
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
    generateHTML(name, email, phone, phone2);

    window.alert('Candidatura enviada com sucesso!');
    form.reset();
  }
};

const generateHTML = (name, email, phone, phone2) => {
  const output = document.querySelector('[data-js="output"]');
  const ul = document.createElement('ul');

  // Formating values as html to hold results
  name = `<strong>${name}</strong>`;
  email = `<strong>${email}</strong>`;
  phone = `<strong>${phone}</strong>`;
  phone2 = phone2
    ? `<strong>${phone2}</strong>`
    : `<strong class='null'>Não Informado</strong>`;

  ul.appendChild(generateListItem(`Nome Completo: <br/>${name}`));
  ul.appendChild(generateListItem(`E-mail: <br>${email}`));
  ul.appendChild(generateListItem(`Telefone 1: <br>${phone}`));
  ul.appendChild(generateListItem(`Telefone 2: <br>${phone2}`));

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
  let counter = 0;

  const items = urls.map((url) => {
    counter++;
    return `
        <div id='${counter}' class='item'>
          <img src='${url}' style="width: 200px">
        </div>
      `;
  });

  carouselItems.innerHTML = items.join('');
};
// API handle data end
let counter = 2;
const nextImageHandle = ({target: link}) => {
  link.parentElement.setAttribute('href', `#${counter + 1}`);
  counter++;
};

const prevImageHandle = ({target: link}) => {
  link.parentElement.setAttribute('href', `#${counter - 1}`);
  if (counter > 1) {
    counter--;
  }
};

// Event Listeners
formElement.addEventListener('submit', (e) => {
  e.preventDefault();
  handleSubmit(e);
});

nextImage.addEventListener('click', (e) => nextImageHandle(e));
prevImage.addEventListener('click', (e) => prevImageHandle(e));
