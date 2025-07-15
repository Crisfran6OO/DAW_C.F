//Botón volver
const volverBtn = document.querySelector('button[id="back"]');

volverBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = "index.html";
});

const form = document.getElementById("subscription-form");

//Valdaciones
const fields = {
    nombre: (val) => val.length > 6 && val.includes(" "),
    email: (val) => /^[^@]+@[^@]+\.[a-z]{2,}$/i.test(val),
    password: (val) => /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/.test(val),
    repeatPassword: (val) => val === document.getElementById("password").value,
    edad: (val) => Number(val) >= 18,
    telefono: (val) => /^\d{7,}$/.test(val),
    direccion: (val) => /.+\s.+/.test(val) && val.length >= 5,
    ciudad: (val) => val.length >= 3,
    cp: (val) => val.length >= 3,
    dni: (val) => /^\d{7,8}$/.test(val),
};

//Errorres
const errors = {
    nombre: "Debe tener más de 6 letras y al menos un espacio.",
    email: "Debe ser un email válido.",
    password: "Al menos 8 caracteres con letras y números.",
    repeatPassword: "Las contraseñas no coinciden.",
    edad: "Debe ser mayor a 18.",
    telefono: "Mínimo 7 dígitos, sin espacios ni símbolos.",
    direccion: "Debe contener letras, números y un espacio.",
    ciudad: "Debe tener al menos 3 caracteres.",
    cp: "Debe tener al menos 3 caracteres.",
    dni: "Debe tener 7 u 8 dígitos.",
};

Object.keys(fields).forEach((id) => {
    const input = document.getElementById(id);
    const errorEl = document.getElementById("error-" + id);

    input.addEventListener("blur", () => {
    const valid = fields[id](input.value.trim());
    if (!valid) {
        errorEl.textContent = errors[id];
    }
    });

    input.addEventListener("focus", () => {
    errorEl.textContent = "";
    });
});

//Mostrar modal
function showModal(title, message) {
  const modal = document.getElementById("modal-succes");
  document.getElementById("modal-message").innerText = message;
  document.querySelector("#modal-succes .modal-content h3")?.remove();
  const h3 = document.createElement("h3");
  h3.textContent = title;
  document.querySelector("#modal-succes .modal-content").prepend(h3);
  modal.style.display = "block";
}

//Cerrar del modal
document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("modal-succes").style.display = "none";
});

//Envío del form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let isValid = true;
  Object.keys(fields).forEach((id) => {
    const input = document.getElementById(id);
    const valid = fields[id](input.value.trim());
    if (!valid) {
      document.getElementById("error-" + id).textContent = errors[id];
      isValid = false;
    }
  });
  if (!isValid) return;

  const formData = Object.fromEntries(new FormData(form));
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await resp.json();
    if (!resp.ok) throw new Error(`Status ${resp.status}: ${resp.statusText}`);

    localStorage.setItem("lastSubscription", JSON.stringify(data));
    showModal("¡Suscripción exitosa!", JSON.stringify(data, null, 2));
  } catch (err) {
    showModal("Error en suscripción", err.message);
  }
});

const nombreInput = document.getElementById("nombre");
const formTitle = document.getElementById("form-title");

nombreInput.addEventListener("keydown", () => {
    setTimeout(() => {
        formTitle.textContent = "HOLA " + nombreInput.value.trim();
    }, 0);
});


