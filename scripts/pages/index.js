// Récupérer les données des photographes en utilisant fetch
async function getPhotographers() {
  const { photographers } = await fetch("./data/photographers.json").then(
    (response) => response.json()
  );
  console.log(photographers);
  return { photographers };
}

// Affichage des données des photographes
async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
   /* eslint-disable-next-line no-undef*/
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}

init();
