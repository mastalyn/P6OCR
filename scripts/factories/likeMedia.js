//function permettant de liker ou de disliker un élement 
mediaLikes.setAttribute("class", "media_likes");
    mediaLikes.textContent = `${likes}`;
    //
    mediaLikesButton.setAttribute("class", "media_likesbutton");
    mediaLikesButton.setAttribute("type", "button");
    //
    mediaLikesButtonImage.setAttribute("class", "media_likesbuttonimage");
    mediaLikesButtonImage.setAttribute("src", icon);

function likeMedia(elLikes, media, medias) {
    const likePhotographer = mediaLikes;
    console.log(likePhotographer)
    let mediaLike = false;
    elLikes.addEventListener("click", () => {
        if (mediaLike == false) {
            media.likes = media.likes + 1

            elLikes.firstChild.data = media.likes + (" ")
            console.log(elLikes.firstChild.data )
            console.log(media.likes)
            console.log(likePhotographer)
            mediaLike = true;
            let totalLike = 0;
            medias.forEach((media) => {
                totalLike = media.likes + totalLike
            })
            likePhotographer.textContent = totalLike
        } else {

            media.likes = media.likes - 1

            elLikes.firstChild.data = media.likes + (" ")
            console.log(media.likes)
            console.log(likePhotographer)
            mediaLike = false;
            let totalLike = 0;
            medias.forEach((media) => {
                totalLike = media.likes + totalLike
            })
            likePhotographer.textContent = totalLike
        }
    })
}

function totalLike(elHtml, medias) { // calcul le nombre total de like
    let totalLike = 0;
    medias.forEach((media) => {
        totalLike = media.likes + totalLike
    })
    elHtml.textContent = totalLike
    return totalLike
}

mediaLikesButton.addEventListener("click", likeMedia);