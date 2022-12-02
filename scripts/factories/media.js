function mediaFactory(mediaData) {
  const { price, likes, image, video, title, date, id } = mediaData;
  

  const mediaImage = `assets/photographers/medias/${image}`;
  const mediaVideo = `assets/photographers/medias/${video}`;
  const like = `${likes}`;
  const dates = `${date}`;
  const titles = `${title}`;
  const mediaId = `${id}`;

  function getUserMedia() {
    const mediaContainer = document.createElement("div");
    const mediaDescription = document.createElement("p");
    const mediaTitle = document.createElement("h2");
    const mediaLikes = document.createElement("h3");
    const mediaPrice = document.createElement("h4");
    const mediaLikesButton = document.createElement("button");
    const mediaLikesButtonImage = document.createElement("img");
    const icon = `assets/icons/heart.svg`;
    const mediaLikesContainer = document.createElement("div");
    const mediaLink = document.createElement("a");

    mediaContainer.setAttribute("class", "media_container");
    mediaContainer.setAttribute("data-likes", like);
    mediaContainer.setAttribute("data-date", dates);
    mediaContainer.setAttribute("data-title", titles);

    // Pop method for media
    // In MP4 case
    if (mediaVideo.split(".").pop() == "mp4") {
      const video = document.createElement("video");
      video.setAttribute("controls", "");
      video.setAttribute("class", "media_image");
      video.setAttribute("src", mediaVideo);
      video.setAttribute("tabindex", 6);
      video.controls = true;
      video.setAttribute("alt", `${title}`);
      const source = document.createElement("source");
      source.setAttribute("src", mediaVideo);
      source.setAttribute("type", "video/mp4");

      mediaContainer.append(mediaLink, video, mediaDescription);
      video.appendChild(source);
      mediaLink.append(video);
    }
    // In JPG case
    if (mediaImage.split(".").pop() == "jpg") {
      const image = document.createElement("img");
      image.setAttribute("class", "media_image");
      image.setAttribute("src", mediaImage);
      image.setAttribute("media-id", mediaId);
      image.setAttribute("alt", `${title}`);

      mediaContainer.append(mediaLink, image, mediaDescription);
      mediaLink.append(image);
    }

    // keyboard accessiblity
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        video.paused ? video.play() : video.pause();
      }
    });

    // Lightbox
    const lightbox = document.getElementById("lightbox");
    const mediaLightbox = document.createElement("div");
    const closeBtn = document.querySelector("#close");
    const mediaImg = document.createElement("img");
    const mediaVid = document.createElement("video");
    const previousBtn = document.querySelector(".gauche");
    const nextBtn = document.querySelector(".droite");
    const modalBg = document.getElementById("contact_modal");

    mediaVid.setAttribute("controls", "");

    mediaImg.setAttribute("src", mediaImage);
    mediaImg.setAttribute("class", "medias");
    mediaImg.setAttribute("media-id", mediaId);
    mediaVid.setAttribute("src", mediaVideo);

    mediaLightbox.setAttribute("id", "mediaLightbox");

    mediaLink.onclick = function () {
      if (!mediaImage.includes("undefined")) {
        openLightbox(mediaImg);
      } else {
        openLightbox(mediaVid);
      }
    };

    closeBtn.onclick = function () {
      closeLightbox();
    };

    function openLightbox(media) {
      lightbox.style.display = "block";
      lightbox.append(media);
    }

    function closeLightbox() {
      lightbox.style.display = "none";
      lightbox.innerHTML = "";
    }

    document.onkeyup = (e) => {
      switch (e.key) {
        case "Escape":
          // Close contactForm & lightbox
          document.querySelectorAll(".modal").forEach(() => {
            modalBg.style.display = "none";
            document.getElementById("lightbox").style.display = "none";
            lightbox.innerHTML = "";
          });
          break;
      }
    };

    // left & right arrows keys
    function checkKey(e) {
      e = e || window.event;

      if (e.keyCode === 37 && lightbox.style.display == "flex") {
        e.preventDefault();
        document.getElementById("leftarrow").click();
        // left arrow
      } else if (e.keyCode === 39 && lightbox.style.display == "flex") {
        document.getElementById("rightarrow").click();
        // right arrow
      }
    }

    // Next and previous button
    previousBtn.onclick = (event) => {
      const media = event.target.previousElementSibling.querySelector("[media-id]");
      console.log(media);
      const actualMediaIndex = window.photographers.mediaData.findIndex(
        ({ id }) => id === media.getAttribute("media-id")
      );
      console.log(actualMediaIndex);
      let previousMediaIndex = actualMediaIndex - 1;
      if (previousMediaIndex < 0)
        previousMediaIndex = window.photographers.media.length - 1;
    };

    // right arrow event : next media onclick
    nextBtn.onclick = (event) => {
      const media = event.target.nextElementSibling.querySelector("[media-id]");
      const actualMediaIndex = window.photographer.mediaData.findIndex(
        ({ id }) => id === media.getAttribute("media-id")
      );

      let nextMediaIndex = actualMediaIndex + 1;
      if (nextMediaIndex >= window.photographer.medias.length)
        nextMediaIndex = 0;
    };

    // let i = 0; // Current image index

    // previousBtn.addEventListener("click", () => {
    //   if (i <= 0) i = mediaImage.length;
    //   i--;
    //   return setImg();
    // });

    // nextBtn.addEventListener("click", () => {
    //   if (i >= mediaImage.length - 1) i = -1;
    //   i++;
    //   return setImg();
    // });

    // function setImg() {
    //   return mediaImg.setAttribute("src", "mediaImg" + mediaImg[i]);
    // }

    mediaDescription.setAttribute("class", "media_description");
    //
    mediaTitle.setAttribute("class", "media_title");
    mediaTitle.textContent = `${title}`;
    //
    mediaLikesContainer.setAttribute("class", "media_likescontainer");
    //
    mediaLikes.setAttribute("class", "media_likes");
    mediaLikes.textContent = `${likes}`;
    //
    mediaLikesButton.setAttribute("class", "media_likesbutton");
    mediaLikesButton.setAttribute("type", "button");
    //
    mediaLikesButtonImage.setAttribute("class", "media_likesbuttonimage");
    mediaLikesButtonImage.setAttribute("src", icon);
    //
    mediaPrice.setAttribute("class", "media_price");
    mediaPrice.textContent = `${price}€/jour`;

    //
    mediaDescription.append(mediaTitle, mediaLikes, mediaLikesContainer);
    mediaLikesContainer.append(
      mediaLikes,
      mediaLikesButton,
      mediaLikesButtonImage
    );
    mediaLikesButton.appendChild(mediaLikesButtonImage);

    
   
  
    function toggle(){
      let count= like;
      let elementHasBeenClicked = false;
      
      
      mediaLikesButton.addEventListener('click', function handleClick() {
       count++;
        mediaLikes.innerText=count;
         // mediaLikes.innerText =parseInt(mediaLikes.innerText) +1;
          console.log(mediaLikes.innerText)
        totalLike.innerText = parseInt(totalLike.innerText) +1; // Ajout d'un like dans la bannière totale
          
          console.log('element clicked');
          if (elementHasBeenClicked) {
          
        
        
            console.log('button has already been clicked before');
            count--;
            mediaLikes.innerText=count;
            
            //mediaLikes.innerText =parseInt(mediaLikes.innerText)-1 ;
            console.log(mediaLikes.innerText)
            totalLike.innerText = parseInt(totalLike.innerText)-1 ;
            console.log(totalLike.innerText)
            
          
            
            
          }
        
          
        
          elementHasBeenClicked = true;
          return count;
        
        
     
      
       
        
        

      });
   

  }
  toggle();
    
 

    return mediaContainer;
  }

  return { getUserMedia };
}

