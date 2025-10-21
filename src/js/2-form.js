const form = document.querySelector('.feedback-form');
const LS_KEY = 'feedback-form-state';
const formData = {
  email: '',
  message: '',
};

// Локальне сховище
const saveInLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromLS = key => {
  const savedData = localStorage.getItem(key);
  if (savedData) {
    return JSON.parse(savedData);
  }
  return null;
};
//

const loadFormData = () => {
  const savedData = getFromLS(LS_KEY);

  if (savedData) {
    formData.email = savedData.email || '';
    formData.message = savedData.message || '';

    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
  }
};

loadFormData();

form.addEventListener('input', event => {
  const emailValue = form.elements.email.value.trim();
  const descriptionValue = form.elements.message.value.trim();
  formData.email = emailValue;
  formData.message = descriptionValue;
  saveInLS(LS_KEY, formData);
});

console.log(formData);

form.addEventListener('submit', event => {
  event.preventDefault();

  const { email, message } = formData;

  if (!email || !message) {
    alert('Fill please all fields');
    return;
  }
  console.log(`Email: ${email}, Message: ${message}`);
  form.reset();
  formData.email = '';
  formData.message = '';
});
