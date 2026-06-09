// Las validaciones utilizables en todos
export const esEmailValido = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const esURLValida = (url) =>
  /^https?:\/\/.+/.test(url);

export const esTelefonoValido = (tel) =>
  /^\d{10}$/.test(tel.replace(/[\s\-().]/g, ""));

export const tieneLongitudMinima = (texto, min) =>
  texto.trim().length >= min;

export const tieneLongitudMaxima = (texto, max) =>
  texto.trim().length <= max;

export const esCampoVacio = (valor) =>
  !valor.trim();

export const existeDuplicado = (lista, campo, valor, idExcluir = null) =>
  lista.some(
    (item) =>
      item[campo].toLowerCase() === valor.toLowerCase() &&
      item.id !== idExcluir
  );

// Validación de datos personales
export const validarPersonal = (form) => {
  const errores = {};

  if (esCampoVacio(form.nombre))
    errores.nombre = "El nombre es obligatorio.";
  else if (!tieneLongitudMinima(form.nombre, 3))
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";

  if (esCampoVacio(form.carrera))
    errores.carrera = "La carrera es obligatoria.";

  if (esCampoVacio(form.ciudad))
    errores.ciudad = "La ciudad es obligatoria.";

  // Teléfono opcional pero si se llena debe tener 10 dígitos
  if (form.telefono && !esTelefonoValido(form.telefono))
    errores.telefono = "El teléfono debe tener 10 dígitos.";

  if (esCampoVacio(form.email))
    errores.email = "El correo es obligatorio.";
  else if (!esEmailValido(form.email))
    errores.email = "El correo no es válido.";

  if (esCampoVacio(form.descripcion))
    errores.descripcion = "La descripción es obligatoria.";
  else if (!tieneLongitudMinima(form.descripcion, 20))
    errores.descripcion = "La descripción debe tener al menos 20 caracteres.";
  else if (!tieneLongitudMaxima(form.descripcion, 500))
    errores.descripcion = "La descripción no debe superar 500 caracteres.";

  if (!form.foto)
    errores.foto = "La foto de perfil es obligatoria.";
  else if (!form.foto.startsWith("data:") && !esURLValida(form.foto))
    errores.foto = "La URL de la foto debe iniciar con http:// o https://";

  form.enlaces.forEach((enlace) => {
    if (enlace.url && !esURLValida(enlace.url))
      errores[`enlace-${enlace.id}`] = "La URL debe iniciar con http:// o https://";
  });

  return errores;
};

// Validación habilidades
export const validarHabilidad = (form, habilidades, editandoId) => {
  const errores = {};

  if (esCampoVacio(form.nombre))
    errores.nombre = "El nombre es obligatorio.";
  else if (!tieneLongitudMinima(form.nombre, 2))
    errores.nombre = "El nombre debe tener al menos 2 caracteres.";

  if (!form.categoria)
    errores.categoria = "Selecciona una categoría.";

  if (!form.nivel)
    errores.nivel = "Selecciona un nivel.";

  if (esCampoVacio(form.descripcion))
    errores.descripcion = "La descripción es obligatoria.";
  else if (!tieneLongitudMaxima(form.descripcion, 200))
    errores.descripcion = "Máximo 200 caracteres.";

  if (existeDuplicado(habilidades, "nombre", form.nombre, editandoId))
    errores.nombre = "Ya existe una habilidad con ese nombre.";

  return errores;
};

// Validación de proyectos
export const validarProyecto = (form, proyectos, editandoId) => {
  const errores = {};

  if (esCampoVacio(form.nombre))
    errores.nombre = "El nombre es obligatorio.";
  else if (!tieneLongitudMinima(form.nombre, 3))
    errores.nombre = "El nombre debe tener al menos 3 caracteres.";

  if (esCampoVacio(form.descripcion))
    errores.descripcion = "La descripción es obligatoria.";
  else if (!tieneLongitudMinima(form.descripcion, 10))
    errores.descripcion = "La descripción debe tener al menos 10 caracteres.";
  else if (!tieneLongitudMaxima(form.descripcion, 300))
    errores.descripcion = "Máximo 300 caracteres.";

  if (esCampoVacio(form.tecnologias))
    errores.tecnologias = "Las tecnologías son obligatorias.";

  if (form.repositorio && !esURLValida(form.repositorio))
    errores.repositorio = "La URL debe iniciar con http:// o https://";

  if (form.deploy && !esURLValida(form.deploy))
    errores.deploy = "La URL debe iniciar con http:// o https://";

  if (existeDuplicado(proyectos, "nombre", form.nombre, editandoId))
    errores.nombre = "Ya existe un proyecto con ese nombre.";

  return errores;
};

// Validación educación
export const validarEducacion = (form) => {
  const errores = {};

  if (esCampoVacio(form.institucion))
    errores.institucion = "La institución es obligatoria.";
  else if (!tieneLongitudMinima(form.institucion, 3))
    errores.institucion = "Debe tener al menos 3 caracteres.";

  if (esCampoVacio(form.programa))
    errores.programa = "El nombre del programa es obligatorio.";
  else if (!tieneLongitudMinima(form.programa, 3))
    errores.programa = "Debe tener al menos 3 caracteres.";

  if (esCampoVacio(form.periodo))
    errores.periodo = "El periodo es obligatorio.";

  if (esCampoVacio(form.descripcion))
    errores.descripcion = "La descripción es obligatoria.";
  else if (!tieneLongitudMaxima(form.descripcion, 300))
    errores.descripcion = "Máximo 300 caracteres.";

  if (form.enlace && !esURLValida(form.enlace))
    errores.enlace = "La URL debe iniciar con http:// o https://";

  return errores;
};

// Validación experiencia
export const validarExperiencia = (form) => {
  const errores = {};

  if (esCampoVacio(form.puesto))
    errores.puesto = "El puesto es obligatorio.";
  else if (!tieneLongitudMinima(form.puesto, 3))
    errores.puesto = "Debe tener al menos 3 caracteres.";

  if (esCampoVacio(form.institucion))
    errores.institucion = "La institución es obligatoria.";

  if (esCampoVacio(form.periodo))
    errores.periodo = "El periodo es obligatorio.";

  if (esCampoVacio(form.descripcion))
    errores.descripcion = "La descripción es obligatoria.";
  else if (!tieneLongitudMinima(form.descripcion, 10))
    errores.descripcion = "Debe tener al menos 10 caracteres.";
  else if (!tieneLongitudMaxima(form.descripcion, 300))
    errores.descripcion = "Máximo 300 caracteres.";

  // Tecnologías obligatorias en experiencia
  if (esCampoVacio(form.tecnologias))
    errores.tecnologias = "Las tecnologías son obligatorias.";

  return errores;
};

// Validación idiomas
export const validarIdioma = (form, idiomas, editandoId) => {
  const errores = {};

  if (esCampoVacio(form.idioma))
    errores.idioma = "El idioma es obligatorio.";

  if (!form.nivel)
    errores.nivel = "Selecciona un nivel.";

  if (existeDuplicado(idiomas, "idioma", form.idioma, editandoId))
    errores.idioma = "Ya existe ese idioma.";

  return errores;
};