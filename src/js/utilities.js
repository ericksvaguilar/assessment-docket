export const isValidForm = form => {
  const nameErr = document.querySelector('#name + [data-js="error-msg"]');
  const emailErr = document.querySelector('#email + [data-js="error-msg"]');
  const phoneErr = document.querySelector('#phone + [data-js="error-msg"]');
  const phone2Err = document.querySelector('#phone2 + [data-js="error-msg"]');

  let nameValidity = form.name.validity;
  let emailValidity = form.email.validity;
  let phoneValidity = form.phone.validity;
  let phone2Validity = form.phone2.validity;

  if (form.checkValidity()) {
    nameErr.textContent = '';
    emailErr.textContent = '';
    phoneErr.textContent = '';
    phone2Err.textContent = '';
    return true;
  } else {
    // Validate name
    if (!nameValidity.valid) {
      if (nameValidity.valueMissing) {
        nameErr.textContent = 'Por favor, insira seu nome completo';
      } else if (nameValidity.patternMismatch) {
        nameErr.textContent = 'Nome inválido (apenas letras permitidas)';
      }
    } else {
      nameErr.textContent = '';
    }

    // Validate email
    if (!emailValidity.valid) {
      if (emailValidity.valueMissing) {
        emailErr.textContent = 'Por favor, insira seu email';
      } else if (emailValidity.typeMismatch) {
        emailErr.textContent = 'Email inválido';
      }
    } else {
      emailErr.textContent = '';
    }

    // Validate Phone
    if (!phoneValidity.valid) {
      if (phoneValidity.valueMissing) {
        phoneErr.textContent = 'Por favor, insira seu telefone';
      } else if (phoneValidity.patternMismatch) {
        phoneErr.textContent = `Precisamos de um telefone no formato: (88) 88888-8888 ou (88) 8888-8888`;
      }
    } else {
      phoneErr.textContent = '';
    }

    // Validate Phone 2
    if (!phone2Validity.valid) {
      if (phone2Validity.patternMismatch) {
        phone2Err.textContent = `Precisamos de um telefone no formato: (88) 88888-8888 ou (88) 8888-8888`;
      }
    } else {
      phone2Err.textContent = '';
    }

    return false;
  }
};

// API functions
const fetchData = async () => {
  try {
    const response = await fetch('https://picsum.photos/v2/list');
    return response.json();
  } catch (err) {
    console.error(err);
  }
};

export const getURLs = async () => {
  try {
    const response = await fetchData();
    return response.map(item => item.download_url);
  } catch (err) {
    console.error(err);
  }
};

// Generators
export const generateListItem = listContent =>
  Object.assign(document.createElement('li'), {innerHTML: listContent});
