export const footerForm = () => {
  const { pathname } = window.location;
  const slugInputs = document.querySelectorAll<HTMLInputElement>('input[name="slug"]');
  [...slugInputs].forEach((input) => {
    input.value = pathname;
  });
};
