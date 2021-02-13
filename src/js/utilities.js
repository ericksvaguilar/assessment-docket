export const isValidForm = (form) => {
  const nameError = document.querySelector('#name + small.form__error-message');
  const emailError = document.querySelector('#email + small.form__error-message');
  const phoneError = document.querySelector('#phone + small.form__error-message');
  const phone2Error = document.querySelector('#phone2 + small.form__error-message');

  let nameValidity = form.name.validity;
  let emailValidity = form.email.validity;
  let phoneValidity = form.phone.validity;
  let phone2Validity = form.phone2.validity;

  if (form.checkValidity()) {
    nameError.textContent = '';
    emailError.textContent = '';
    phoneError.textContent = '';
    phone2Error.textContent = '';
    return true;
  } else {
    // Validate name
    if (!nameValidity.valid) {
      if (nameValidity.valueMissing) {
        nameError.textContent = 'Por favor, insira seu nome completo';
      } else if (nameValidity.patternMismatch) {
        nameError.textContent = 'Nome inválido (apenas letras permitidas)';
      }
    } else {
      nameError.textContent = '';
    }

    // Validate email
    if (!emailValidity.valid) {
      if (emailValidity.valueMissing) {
        emailError.textContent = 'Por favor, insira seu email';
      } else if (emailValidity.typeMismatch) {
        emailError.textContent = 'Email inválido';
      }
    } else {
      emailError.textContent = '';
    }

    // Validate Phone
    if (!phoneValidity.valid) {
      if (phoneValidity.valueMissing) {
        phoneError.textContent = 'Por favor, insira seu telefone';
      } else if (phoneValidity.patternMismatch) {
        phoneError.textContent = `Precisamos de um telefone no formato: (88) 98888-8888 ou (11) 8888-8888`;
      }
    } else {
      phoneError.textContent = '';
    }

    // Validate Phone 2
    if (!phone2Validity.valid) {
      if (phone2Validity.patternMismatch) {
        phone2Error.textContent = `Precisamos de um telefone no formato: (88) 98888-8888 ou (11) 8888-8888`;
      }
    } else {
      phone2Error.textContent = '';
    }

    return false;
  }
};