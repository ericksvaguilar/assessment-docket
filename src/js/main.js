import {isValidForm, getURLs, generateListItem} from './utilities.js';

// HTML Elements
const formEl = document.querySelector('[data-js="form"]');
const nextImageEl = document.querySelector('[data-js="next-image"]');
const prevImageEl = document.querySelector('[data-js="previous-image"]');

// Global variables
let handleImageCount = 2;

// Event Listeners
formEl.addEventListener('submit', event => {
  event.preventDefault();
  const {
    target: form,
    target: {
      name: {value: name},
      email: {value: email},
      phone: {value: phone},
      phone2: {value: phone2},
    },
  } = event;
  handleSubmit(form, name, email, phone, phone2);
});

nextImageEl.addEventListener('click', event => {
  const {
    target: {parentElement: link},
  } = event;
  handleImage(link);
});

prevImageEl.addEventListener('click', event => {
  const {
    target: {parentElement: link},
  } = event;
  handleImage(link);
});
// Event Listeners end

// Check form validity
const handleSubmit = (form, name, email, phone, phone2) => {
  if (isValidForm(form)) {
    generateHTML(name, email, phone, phone2);

    window.alert('Candidatura enviada com sucesso!');
    form.reset();
  }
};

// Update href of carousel buttons dynamically
const handleImage = link => {
  if (link.id === 'next-image') {
    link.setAttribute('href', `#${handleImageCount + 1}`);
    handleImageCount++;
  } else {
    link.setAttribute('href', `#${handleImageCount - 1}`);
    if (handleImageCount > 1) {
      handleImageCount--;
    }
  }
};

const generateHTML = (name, email, phone, phone2) => {
  const output = document.querySelector('[data-js="output"]');
  const ul = document.createElement('ul');

  // Customize results
  name = `Nome Completo: <br/><strong>${name}</strong>`;
  email = `E-mail: <br><strong>${email}</strong>`;
  phone = `Telefone 1: <br><strong>${phone}</strong>`;
  phone2 = phone2
    ? `Telefone 2: <br><strong>${phone2}</strong>`
    : `Telefone 2: <br><strong class='null'>Não Informado</strong>`;

  ul.appendChild(generateListItem(name));
  ul.appendChild(generateListItem(email));
  ul.appendChild(generateListItem(phone));
  ul.appendChild(generateListItem(phone2));

  output.innerHTML = ul.outerHTML;
};

// Handle API response
getURLs().then(urls => insertUrlsIntoHTML(urls));

const insertUrlsIntoHTML = urls => {
  const carouselItems = document.querySelector('[data-js="carousel-items"]');
  let id = 0;

  const items = urls.map(url => {
    id++;
    return `
        <div id='${id}' class='item'>
          <img src='${url}' style="width: 200px">
        </div>
      `;
  });

  carouselItems.innerHTML = items.join('');
};
// Handle API response end
