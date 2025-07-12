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

//Errores
const errors = {
    nombre: "Debe tener más de 6 letras y al menos un espacio.",
    email: "Debe ser un email válido.",
    password: "Al menos 8 caracteres con letras y números.",
    repeatPassword: "Las contraseñas no coinciden.",
    edad: "Debe ser mayor o igual a 18.",
    telefono: "Mínimo 7 dígitos, sin espacios ni símbolos.",
    direccion: "Debe contener letras, números y un espacio.",
    ciudad: "Debe tener al menos 3 caracteres.",
    cp: "Debe tener al menos 3 caracteres.",
    dni: "Debe tener 7 u 8 dígitos.",
};

Object.keys(fields).forEach((id) => {
    const input = document.getElementById(id);
    const errorEl = document.getElementById("error" + id);

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

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;
    let mensaje = "";

    Object.keys(fields).forEach((id) => {
    const input = document.getElementById(id);
    const val = input.value.trim();
    const valid = fields[id](val);
    if (!valid) {
        document.getElementById("error-" + id).textContent = errors[id];
        mensaje += `${id.toUpperCase()}: ${errors[id]}\n`;
        isValid = false;
    } else {
        mensaje += `${id.toUpperCase()}: ${val}\n`;
    }
    });

    alert(mensaje);
});

const nombreInput = document.getElementById("nombre");
const formTitle = document.getElementById("form-title");

nombreInput.addEventListener("keydown", () => {
    setTimeout(() => {
        formTitle.textContent = "HOLA " + nombreInput.value.trim();
    }, 0);
});


