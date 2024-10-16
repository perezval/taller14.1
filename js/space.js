// Seleccionamos los elementos del DOM
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const contenedor = document.getElementById("contenedor");

// Evento al hacer clic en el botón de búsqueda
btnBuscar.addEventListener("click", () => {
  const query = inputBuscar.value.trim(); // Obtenemos el texto de búsqueda
  if (query) {
    buscarImagenes(query);
  } else {
    alert("Por favor, ingrese un término de búsqueda.");
  }
});

// Función para hacer la solicitud a la API de la NASA
function buscarImagenes(query) {
  const url = `https://images-api.nasa.gov/search?q=${query}`;

  // Usamos fetch para hacer la solicitud
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const resultados = data.collection.items; // Accedemos a los resultados
      mostrarResultados(resultados);
    })
    .catch(error => {
      console.error("Error al realizar la solicitud", error);
      contenedor.innerHTML = "<p>Error al obtener los resultados.</p>";
    });
}

// Función para mostrar los resultados en tarjetas
function mostrarResultados(resultados) {
  contenedor.innerHTML = ""; // Limpiamos el contenedor antes de mostrar nuevos resultados

  // Iteramos sobre los resultados y creamos tarjetas para cada uno
  resultados.forEach(item => {
    // Verificamos si el resultado tiene imágenes
    const imagen = item.links ? item.links[0].href : "https://via.placeholder.com/150";
    const titulo = item.data[0].title || "Sin título";
    const descripcion = item.data[0].description || "Sin descripción disponible";
    const fecha = item.data[0].date_created || "Fecha no disponible";

    // Creamos una tarjeta con Bootstrap
    const tarjeta = `
      <div class="col-md-4">
        <div class="card mb-4">
          <img src="${imagen}" class="card-img-top" alt="${titulo}">
          <div class="card-body">
            <h5 class="card-title">${titulo}</h5>
            <p class="card-text">${descripcion}</p>
            <p class="card-text"><small class="text-muted">Fecha: ${fecha}</small></p>
          </div>
        </div>
      </div>
    `;

    // Insertamos la tarjeta en el contenedor
    contenedor.innerHTML += tarjeta;
  });
}
