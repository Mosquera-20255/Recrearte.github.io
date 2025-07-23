document.addEventListener('DOMContentLoaded', function () {

  const loaderContainer = document.getElementById('loader-container');
  const introVideo = document.getElementById('intro-video');
  const mainContainer = document.querySelector('.main-container');
  const themeBtn = document.getElementById('theme-toggle-btn'); // Obtener el botón

  const markersData = [
    { 
      lat: 4.703590, 
      lng: -74.231070, 
      name: 'Recrearte Principal', 
      img: 'coliseo.png' 
    },
    { 
      lat: 4.7077, 
      lng: -74.2309, 
      name: 'Punto de Información', 
      img: 'coliseo.png'
    }
  ];

  function inicializarMapa() {
    mainContainer.style.display = 'block';

    const map = L.map('mapa').setView([4.705, -74.231], 16);

    // --- 👇 Definición de las dos capas de mapa 👇 ---
    const darkLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20,
        detectRetina: true
    });

    const lightLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        detectRetina: true
    });

    // Añadir la capa oscura por defecto
    darkLayer.addTo(map);
    // --- Fin de definición de capas ---

    markersData.forEach(markerInfo => {
      const icon = L.divIcon({
        className: 'marker-wrapper', 
        html: `<img class="marker-image" src="${markerInfo.img}" style="width: 75px; height: auto;">`,
        iconSize: [75, 62],
        iconAnchor: [37, 62]
      });
      
      const marker = L.marker([markerInfo.lat, markerInfo.lng], {
          icon: icon,
          title: markerInfo.name
      }).addTo(map);

      marker.bindTooltip(markerInfo.name, {
        permanent: true,
        direction: 'top',
        offset: [0, -70], 
        className: 'permanent-label'
      }).openTooltip();
      
      marker.on('dblclick', function() {
        window.open('https://www.mosquera-cundinamarca.gov.co/', '_blank');
      });
    });
    
    // --- 👇 Lógica del botón para cambiar tema 👇 ---
    themeBtn.addEventListener('click', function() {
        if (map.hasLayer(darkLayer)) {
            map.removeLayer(darkLayer);
            lightLayer.addTo(map);
            this.innerHTML = 'Cambiar a Mapa Oscuro';
        } else {
            map.removeLayer(lightLayer);
            darkLayer.addTo(map);
            this.innerHTML = 'Cambiar a Mapa Claro';
        }
    });
    // --- Fin de la lógica del botón ---
  }

  introVideo.addEventListener('ended', function() {
    loaderContainer.style.display = 'none';
    inicializarMapa();
  });
  
  introVideo.addEventListener('error', function() {
      loaderContainer.style.display = 'none';
      inicializarMapa();
  });
});
