document.addEventListener('DOMContentLoaded', function () {

  const loaderContainer = document.getElementById('loader-container');
  const introVideo = document.getElementById('intro-video');
  const mainContainer = document.querySelector('.main-container');
  const themeBtn = document.getElementById('theme-toggle-btn');
  const skipBtn = document.getElementById('skip-video-btn');

  const markersData = [
    { 
      lat: 4.703543, 
      lng: -74.231127, 
      name: 'Coliseo Municipal', 
      img: 'marcador.jpg' 
    },
    { 
      lat: 4.710113, 
      lng: -74.225712, 
      name: 'Biblioteca municipal', 
      img: 'marcador.jpg'
    }
  ];

  function irAlMapa() {
    if (loaderContainer.style.display === 'none') return;
    document.body.style.overflow = 'auto';
    loaderContainer.style.display = 'none';
    inicializarMapa();
  }

  function inicializarMapa() {
    mainContainer.style.display = 'block';

    const map = L.map('mapa').setView([4.705, -74.231], 16);

    // Añadir el control de pantalla completa al mapa
    map.addControl(new L.Control.Fullscreen());

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

    // Mapa claro añadido por defecto
    lightLayer.addTo(map);

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
      
      marker.on('click', function() {
        window.open('https://www.mosquera-cundinamarca.gov.co/', '_blank');
      });
    });
    
    // Lógica del botón para cambiar tema
    themeBtn.addEventListener('click', function() {
        if (map.hasLayer(lightLayer)) {
            map.removeLayer(lightLayer);
            darkLayer.addTo(map);
            this.innerHTML = 'Cambiar a Mapa Claro';
        } else {
            map.removeLayer(darkLayer);
            lightLayer.addTo(map);
            this.innerHTML = 'Cambiar a Mapa Oscuro';
        }
    });
  }

  // Eventos que activan el paso al mapa
  introVideo.addEventListener('ended', irAlMapa);
  introVideo.addEventListener('error', irAlMapa);
  skipBtn.addEventListener('click', irAlMapa);

});
 mostrarMensajesIntroductorios();
  }

  // --- 👇 Nueva Función para los Mensajes 👇 ---
  function mostrarMensajesIntroductorios() {
    // Esperamos un momento para que los controles del mapa se dibujen
    setTimeout(() => {
        // Crear tooltip para el zoom
        const zoomControl = document.querySelector('.leaflet-control-zoom');
        if (zoomControl) {
            const rect = zoomControl.getBoundingClientRect();
            const tooltipZoom = document.createElement('div');
            tooltipZoom.className = 'intro-tooltip right';
            tooltipZoom.innerHTML = 'Usa esto para acercar o alejar';
            document.body.appendChild(tooltipZoom);
            tooltipZoom.style.left = `${rect.right + 15}px`;
            tooltipZoom.style.top = `${rect.top + rect.height / 2 - tooltipZoom.offsetHeight / 2}px`;
            
            // Desvanecer después de un tiempo
            setTimeout(() => {
                tooltipZoom.classList.add('fade-out');
                setTimeout(() => tooltipZoom.remove(), 1500); // Limpiar del DOM
            }, 3000);
        }

        // Crear tooltip para pantalla completa
        const fullscreenControl = document.querySelector('.leaflet-control-fullscreen');
        if (fullscreenControl) {
            const rect = fullscreenControl.getBoundingClientRect();
            const tooltipFullscreen = document.createElement('div');
            tooltipFullscreen.className = 'intro-tooltip right';
            tooltipFullscreen.innerHTML = 'Úsalo para ver en pantalla completa';
            document.body.appendChild(tooltipFullscreen);
            tooltipFullscreen.style.left = `${rect.right + 15}px`;
            tooltipFullscreen.style.top = `${rect.top + rect.height / 2 - tooltipFullscreen.offsetHeight / 2}px`;

            // Desvanecer después de un tiempo
            setTimeout(() => {
                tooltipFullscreen.classList.add('fade-out');
                setTimeout(() => tooltipFullscreen.remove(), 1500); // Limpiar del DOM
            }, 3000);
        }
    }, 500);
  }

  introVideo.addEventListener('ended', irAlMapa);
  introVideo.addEventListener('error', irAlMapa);
  skipBtn.addEventListener('click', irAlMapa);

});
