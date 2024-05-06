// script.js

document.addEventListener('DOMContentLoaded', function() {
  const slides = ['slide1', 'slide2', 'slide3'];
  let currentSlide = 0;

  function showSlide(index) {
    for (let i = 0; i < slides.length; i++) {
      document.querySelector('#slideshow').classList.remove(slides[i]);
    }
    document.querySelector('#slideshow').classList.add(slides[index]);
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);

  setInterval(nextSlide, 5000); // Cambia slide ogni 5 secondi

  // Aggiungi event listener per lo scorrimento delle immagini al clic
  document.querySelector('#slideshow').addEventListener('click', nextSlide);

// menu a scomparsa

  menu=document.querySelector(".menu");
  menu.onclick = function(){
    navBar = document.querySelector(".nav-bar");
    navBar.classList.toggle("active");
  }

// scroll verso l'alto

const torna_su = document.querySelector(".torna_su");

window.addEventListener("scroll", function() {
    if (document.documentElement.scrollTop > 600) {
        torna_su.style.display = "block";
    } else {
        torna_su.style.display = "none";
    }
});

torna_su.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


// attributi data mostra colori


const photoList = [
  'duke_nero.jpg',
  'duke_arancione.jpg'
];

const albumView = document.querySelector('#album-view');
const modalView = document.querySelector('#modal-view');
const mostraImmagineButton = document.getElementById('mostraImmagineButton');

// Funzione per creare e aggiungere le anteprime delle immagini
function createThumbnail(src) {
  const thumbnail = document.createElement('img');
  thumbnail.src = src;
  thumbnail.classList.add('thumbnail');
  thumbnail.addEventListener('click', () => openModal(src));
  return thumbnail;
}

// Aggiungi le anteprime delle immagini alla galleria
function addThumbnails() {
  photoList.forEach(photoSrc => {
    const thumbnail = createThumbnail(photoSrc);
    albumView.appendChild(thumbnail);
  });
}

// Funzione per aprire l'immagine ingrandita
function openModal(src) {
  const image = document.createElement('img');
  image.src = src;
  modalView.innerHTML = '';
  modalView.appendChild(image);
  modalView.classList.remove('hidden');
  document.body.classList.add('no-scroll');
  modalView.addEventListener('click', closeModal);
}

// Funzione per chiudere l'immagine ingrandita
function closeModal() {
  modalView.innerHTML = '';
  modalView.classList.add('hidden');
  document.body.classList.remove('no-scroll');
  modalView.removeEventListener('click', closeModal);
}

// Gestisci il clic sul pulsante "Mostra Immagini"
mostraImmagineButton.addEventListener('click', () => {
  albumView.classList.toggle('hidden'); 
  if (!albumView.classList.contains('hidden')) {
    
    addThumbnails();
  } else {
    
    albumView.innerHTML = '';
  }
});

//maps
// Codice dipendente da Google Maps JavaScript API
window.onload = function() {
  
  let pos = { lat: 37.5104567, lng: 15.0733899 };
  let map = new google.maps.Map(document.getElementById('map'), { center: pos, zoom: 14 });
  let marker = new google.maps.Marker({
      position: { lat: 37.518227, lng: 15.096807 },
      map: map,
      title: 'negozio'
  });

  marker.addListener("click", function() {
      // Effettua una richiesta fetch per ottenere i dati JSON
      fetch('./mhw3.json')
          .then(response => response.json())
          .then(data => {
              // Estrai il contenuto desiderato dal file JSON
              let title = data.title;
              let content = data.content;
              let image1 = data.image1;
              let image2 = data.image2;

              // Costruisci il contenuto dell'infowindow
              let contentString = '<div>' +
                  '<h2>' + title + '</h2>' +
                  '<h4>' + content + '</h4>' +
                  '<img src="' + image1 + '" alt="Immagine 1" style="max-width: 300px; max-height: auto;">' +
                  '<img src="' + image2 + '" alt="Immagine 2" style="max-width: 300px; max-height: auto;">' +
                  '</div>';

              // Creazione dell'infowindow
              let infowindow = new google.maps.InfoWindow({
                  content: contentString
              });

              // Apertura dell'infowindow quando si fa clic sul marker
              infowindow.open(map, marker);
          })
          .catch(error => {
              console.error('Si è verificato un errore:', error);
          });
  });
};



// api youtube

let token;
let apiKey;

// Funzione per ottenere il token OAuth 2.0
function getToken() {
    const client_id = 'inserire client id';
    const client_secret = 'inserire client secret';

    return fetch("https://oauth2.googleapis.com/token",
        {
            method: "post",
            body: 'grant_type=client_credentials',
            headers:
            {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
            }
        }
    ).then(response => response.json())
    .then(data => {
        token = data.access_token;
        // Una volta ottenuto il token, carica i video
        loadVideos();
    })
    .catch(error => {
        console.error('Errore durante il recupero del token:', error);
    });
}

// Funzione per ottenere la chiave API di YouTube
function getApiKey() {
    apiKey = 'inserire api key';
}

// Funzione per caricare i video utilizzando la chiave API
function loadVideos() {
    fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=1&playlistId=PL_v8Ikklpx7lOjGdHoMEXEuncM2MfVP9A&key=' + apiKey)
        .then(response => response.json())
        .then(data => {
            const videoyt = document.querySelector('#videoyt');
            videoyt.innerHTML = ''; // Pulisci il contenuto precedente
            if (data.items) {
                data.items.forEach(e1 => {
                    videoyt.innerHTML += `
                        <a target="_blank" href="https://www.youtube.com/watch?v=${e1.snippet.resourceId.videoId}" class="yt-video">
                            <img src="${e1.snippet.thumbnails.maxres.url}" />
                        </a>`;
                });
                console.log(data.items[0]);
            } else {
                console.error('Nessun elemento trovato nella risposta:', data);
            }
        })
        .catch(error => console.error('Errore durante il caricamento dei video:', error));
}

// Chiamata iniziale per ottenere il token OAuth 2.0 e la chiave API
getToken();
getApiKey();








 });


  


