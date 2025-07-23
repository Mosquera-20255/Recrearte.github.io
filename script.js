document.addEventListener('DOMContentLoaded', function () {

  // 1. Configuración inicial del mapa
  const latitud = 4.703590;
  const longitud = -74.231070;
  const zoomInicial = 15;
  const map = L.map('mapa').setView([latitud, longitud], zoomInicial);

  // 2. Añadir capa de mapa base de OpenStreetMap con alta resolución
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      detectRetina: true
  }).addTo(map);

  // 3. FUNCIÓN PARA CREAR UN ÍCONO CON TAMAÑO DINÁMICO
  function crearIconoResponsivo(size) {
    const intSize = Math.round(size);
    return L.divIcon({
      className: '',
      html: `
        <div class="marker-wrapper">
          <img class="marker-image" src="Recrearte.jpg" style="width: ${intSize}px; height: auto;">
        </div>
      `,
      iconSize: [intSize, intSize * 0.83],
      iconAnchor: [intSize / 2, intSize * 0.83],
      popupAnchor: [0, -intSize * 0.83]
    });
  }
  
  // FUNCIÓN PARA CALCULAR EL TAMAÑO IDEAL BASADO EN EL ZOOM
  function obtenerTamañoParaZoom(zoom) {
    if (zoom >= 17) {
      return 90;
    } else if (zoom >= 15) {
      return 75;
    } else {
      return 55;
    }
  }

  // 4. Crear el marcador inicial con un título
  const tamañoInicial = obtenerTamañoParaZoom(zoomInicial);
  const coliseoMarker = L.marker([latitud, longitud], {
      icon: crearIconoResponsivo(tamañoInicial),
      title: 'Coliseo Municipal de Mosquera' 
  }).addTo(map);

  // 5. El popup se abre con un clic
  coliseoMarker.bindPopup('<b>Clic para conocer toda la programacion </b>');

  // 6. EVENTO QUE SE ACTIVA AL CAMBIAR EL ZOOM
  map.on('zoomend', function() {
    let currentZoom = map.getZoom();
    let nuevoTamaño = obtenerTamañoParaZoom(currentZoom);
    coliseoMarker.setIcon(crearIconoResponsivo(nuevoTamaño));
  });
  
  // 7. NUEVO: Evento para redirigir con DOBLE CLIC
  coliseoMarker.on('dblclick', function() {
    window.open('https://www.mosquera-cundinamarca.gov.co/', '_blank');
  });

});
