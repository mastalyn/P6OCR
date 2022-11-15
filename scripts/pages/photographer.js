async function getPhotographer() {
  //cherche id dans url pour l'obtenir
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    console.log(id);
  
// cela donne {photographers: {…}, media: Array(...)}
    const photographers = await fetch("./data/photographers.json").then(
      (response) => response.json()
    );

    /*
photographers:{
photographers
: 
city
: 
""
country
: 
""
id
: 
""
name
: 
""
portrait
: 
""
price
: 
''
tagline
: 
""}
 */
  // {name: '', id: '', city: '', country: '', tagline: '', …}
    photographers.photographers = photographers.photographers.filter(
      (photographer) => photographer.id == id
    )[0];
    //trouve array media puis filtre arrays media
    photographers.media = photographers.media.filter(
              //medias/id
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
  
   
   
  }
  

  
  
  init();
  