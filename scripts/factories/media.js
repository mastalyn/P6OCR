 
 
 function mediaFactory(mediaData) {
   const { price, likes, image, video, title, date, id } =  mediaData;
  

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

    const fancybox = Fancybox.show([
      {
        src:mediaImage,
        type: "image",
      },
      {
        src: mediaVideo,
        type: "video",
      },
    ]);
   
  console.log(fancybox)
   
  
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

 