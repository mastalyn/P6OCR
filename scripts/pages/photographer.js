async function getPhotographer() {
  // const id = window.location.search.split("id=")[1];

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  console.log(id);

  const photographers = await fetch("./data/photographers.json").then(
    (response) => response.json()
  );

  photographers.photographers = photographers.photographers.filter(
    (photographer) => photographer.id == id
  )[0];
  photographers.media = photographers.media.filter(
    (media) => media.photographerId == id
  );

  return photographers;
}

async function init() {
  // Récupère les datas des photographes
  const photographer = await getPhotographer();
  console.log(photographer);
  displayData(photographer.photographers);
  displayDataMedia(photographer.media);
}

// Fonction qui fait appraitre les photographes
function displayData(photographer) {
  const photographersSection = document.getElementById("photographeInfos");
  const profileModel = photographerFactory(photographer);
  const profiles = profileModel.getPhotographerProfil();
  photographersSection.appendChild(profiles);
}

// Fonction qui fait appraitre les médias
function displayDataMedia(medias) {
  const mediaslist = document.querySelector(".photographer_media");
  Array.from(medias).forEach((media) => {
    const mediaModel = mediaFactory(media);
    const displaymedia = mediaModel.getUserMedia();
    mediaslist.appendChild(displaymedia);
  });

  // Affichage du total des likes
  let totalLike = 0;

  const displaylikes = medias.map((media) => {
    totalLike += media.likes;
    document.querySelector("#totalLike").innerHTML = totalLike;
  });
}

// Fonction pour l'affichage des médias dans la lightbox

// Fonction pour le tri des médias
function mediasSort(type) {
  let mediaContainer = document.querySelectorAll(".media_container");
  mediaContainer = [].slice.call(mediaContainer);
  if (type === "title") {
    sortByTitle(mediaContainer);
  } else if (type === "date") {
    sortByDate(mediaContainer);
  } else {
    sortByLike(mediaContainer);
  }

  // Fonction pour l'affichage alphabétique
  function sortByTitle(mediaContainer) {
    mediaContainer.sort(function (a, b) {
      return a.dataset.title.localeCompare(b.dataset.title);
    });
  }

  // Fonction pour l'affichage par popularité
  function sortByLike(mediaContainer) {
    mediaContainer.sort(function (a, b) {
      return b.dataset.likes - a.dataset.likes;
    });
  }

  // Fonction pour l'affichage par date
  function sortByDate(mediaContainer) {
    mediaContainer.sort(function (a, b) {
      return a.dataset.date.localeCompare(b.dataset.date);
    });
  }

  const mediaslist = document.querySelector(".photographer_media");
  mediaslist.innerHTML = "";

  mediaContainer.forEach((media) => {
    mediaslist.append(media);
  });
}
init();
