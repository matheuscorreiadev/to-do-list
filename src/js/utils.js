export function generateId() {
  return crypto.randomUUID();
}

export function formatDate(date) {
  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      dateStyle: "short",
      timeStyle: "short"
    }
  ).format(date);
}

export function showToast(
  text,
  background = "#22c55e"
) {
  Toastify({
    text,
    duration: 2500,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background
    }
  }).showToast();
}

export function debounce(
  callback,
  delay = 300
) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      callback(...args);
    }, delay);
  };
}