const formData = {
  email: '',
  message: '',
};

const refs = {
  form: document.querySelector('.feedback-form'),
};

const storageKey = 'feedback-form-state';

const loadFormData = () => {
  try {
    const savedData = localStorage.getItem(storageKey);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';

      refs.form.elements.email.value = formData.email;
      refs.form.elements.message.value = formData.message;
    }
  } catch (error) {
    console.log('Error loading form data:', error);
  }
};

const savedFormData = () => {
  localStorage.setItem(storageKey, JSON.stringify(formData));
};

const onFormInput = event => {
  const fieldName = event.target.name;
  const fieldValue = event.target.value;

  formData[fieldName] = fieldValue;

  savedFormData();
};

const onFormSubmit = event => {
  event.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(storageKey);

  formData.email = '';
  formData.message = '';

  refs.form.reset();
};

refs.form.addEventListener('input', onFormInput);
refs.form.addEventListener('submit', onFormSubmit);

loadFormData();
