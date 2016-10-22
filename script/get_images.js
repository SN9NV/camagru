function timeSince(date) {
    var seconds = Math.floor((new Date().getTime() / 1000) - date);
    var month = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
        var d = new Date(seconds * 1000);
        return month[d.getMonth()] + " " + d.getFullYear();
    }

    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        var dd = new Date(seconds * 1000);
        return dd.getDate() + " " + month[dd.getMonth()];
    }

    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        if (interval > 1) {
            return interval + " days ago";
        }
        return interval + " day ago";
    }

    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        if (interval > 1) {
            return interval + " hours ago";
        }
        return interval + " hour ago";
    }

    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        if (interval > 1) {
            return interval + " minutes ago";
        }
        return interval + " minute ago";
    }

    if (seconds === 1) {
        return Math.floor(seconds) + " second ago";
    }
    return Math.floor(seconds) + " seconds ago";
}

function getImages(noDestroyChildren) {
    ajaxPost("php/get_images.php", null, function(response) {
        var result = JSON.parse(response);
        console.log(result);
        if (result !== "Database error") {
            var gallery = document.getElementById('gallery');
			if (!noDestroyChildren) {
				while (gallery.hasChildNodes()) {
	                gallery.removeChild(gallery.lastChild);
	            }
			}
            result.forEach(function(item) {
                //create article
                var article = document.createElement('article');
                article.id = item.id;
				article.classList = "article-image";

                /*	create header
                	<header>
                		<div><img src="images/580385e77903c.png"/></div>
                		<h4>asdf</h4>
                		<span>5 hours ago</span>
                	</header>
                */
                var header = document.createElement('header');
                var div = document.createElement('div');
                var profilepic = document.createElement('img');
                if (item.userpic) {
                    profilepic.src = "images/" + item.userpic + ".png";
                } else {
                    profilepic.style.backgroundColor = "#FFF";
                }
                var h4 = document.createElement('h4');
                h4.classList = "h4";
                h4.innerText = item.username;
                var timeago = document.createElement('span');
                timeago.innerText = timeSince(item.date);
                div.appendChild(profilepic);
                header.appendChild(div);
                header.appendChild(h4);
                header.appendChild(timeago);

                /*	create main image
                	<img src="images/5803826410e37.png"/>
                */
                var img = document.createElement('img');
                img.src = "images/" + item.id + ".png";
				img.onclick = function() {
					openSection(item.id);
				};

                /*	create footer
                	<footer>
                		<div class="actions">
                			<button onclick="galleryFavourite(id)">
                				<i class="material-icons">favorite</i>
                			</button>
                			<button onclick="galleryComment(id)">
                				<i class="material-icons">comment</i>
                			</button>
                			<button onclick="galleryDelete(id)">
                				<i class="material-icons">delete</i>
                			</button>
                		</div>
                		<div class="comment">
                			<b>asdf</b>&nbspSometimes I look to the left
                		</div>
                	</footer>
                */
                var footer = document.createElement('footer');

                //actions
                var actions = document.createElement('div');
                actions.classList = "actions";
                var favouriteButton = document.createElement('button');
                favouriteButton.onclick = function() {
                    galleryFavourite(item.id);
                };
				var likes = document.createElement("span");
				likes.id = item.id + "likes";
				likes.innerText = item.likes;
				favouriteButton.appendChild(likes);
                var favouriteIcon = document.createElement('i');
                favouriteIcon.classList = "material-icons";
                favouriteIcon.innerText = "favorite";
                favouriteIcon.id = item.id + "favourite";
				if (item.liked) {
					favouriteIcon.style.color = "#F44336";
				}
                favouriteButton.appendChild(favouriteIcon);
                var commentButton = document.createElement('button');
                commentButton.onclick = function() {
                    galleryComment(item.id);
                };
				var comments = document.createElement("span");
				comments.id = item.id + "comments";
				comments.innerText = item.comments;
				commentButton.appendChild(comments);
                var commentIcon = document.createElement('i');
                commentIcon.classList = "material-icons";
                commentIcon.innerText = "comment";
                commentButton.appendChild(commentIcon);
                actions.appendChild(favouriteButton);
                actions.appendChild(commentButton);
                if (item.creator) {
                    var deleteButton = document.createElement('button');
                    deleteButton.onclick = function() {
                        galleryDelete(item.id);
                    };
                    var deleteIcon = document.createElement('i');
                    deleteIcon.classList = "material-icons";
                    deleteIcon.innerText = "delete";
                    deleteButton.appendChild(deleteIcon);
                    actions.appendChild(deleteButton);
                }

                //comment
                var comment = document.createElement('div');
                comment.classList = "comment";
                if (item.title) {
                    var span = document.createElement('span');
                    span.innerHTML = "<b>" + item.username + "</b> " + item.title;
                    comment.appendChild(span);
                }


				//comments section
				var section = document.createElement('div');
				section.classList = "comments-section";
				section.id = item.id + "comments-section";
				var sectionClose = document.createElement('button');
				sectionClose.innerText = "close";
				sectionClose.onclick = function() {
					closeSection(item.id);
				};
				section.appendChild(sectionClose);
				var sectionComments = document.createElement('div');
				sectionComments.id = item.id + "comments-section-comments";
				if (item.title) {
					var commentSpan = document.createElement('span');
					commentSpan.innerHTML = "<b>" + item.username + "</b> " + item.title;
					sectionComments.appendChild(commentSpan);
				}
				var sectionComment = document.createElement('div');
				sectionComment.classList = "sectionComment";
				var textbox = document.createElement('input');
				textbox.type = "textarea";
				textbox.placeholder = "Comment";
				textbox.id = item.id + "commentTextBox";
				textbox.classList = "input-box";
				sectionComment.appendChild(textbox);
				var commentSendButton = document.createElement('button');
				commentSendButton.innerText = "send";
				commentSendButton.onclick = function() {
					galleryComment(item.id);
				};
				sectionComment.appendChild(commentSendButton);
				section.appendChild(sectionComments);
				section.appendChild(sectionComment);


                //append children to footer
                footer.appendChild(actions);
                footer.appendChild(comment);

                //append all the children
                article.appendChild(header);
                article.appendChild(img);
                article.appendChild(footer);
				article.appendChild(section);

                //append article to gallery
                gallery.appendChild(article);
            });
        }
    });
}

function galleryFavourite(id) {
    console.log("Favourite " + id);
    if (user) {
        ajaxPost("php/like.php", "imgid=" + id, function(response) {
            var result = JSON.parse(response);
            console.log(result);
            if (result) {
				var fav = document.getElementById(id + "favourite");
                fav.style.color = "red";
				var likes = document.getElementById(id + "likes");
				likes.innerText = parseInt(likes.innerText) + 1;
            }
        });
    } else {
        login();
    }
}

function galleryComment(id) {
    console.log("Comment " + id);
    if (user) {
        var send = "imgid=" + id;
        var comment = document.getElementById(id + 'commentTextBox').value;
        if (comment !== null) {
            send += "&comment=" + comment;
            ajaxPost("php/comment.php", send, function(response) {
                var result = JSON.parse(response);
                console.log(result);
                if (result) {
					var comments = document.getElementById(id + "comments");
					comments.innerText = parseInt(comments.innerText) + 1;
					galleryGetComments(id);
                }
            });
        }
    } else {
		login();
	}

}

function galleryGetComments(id) {

}

function galleryDelete(id) {
    console.log("Delete " + id);
}

function closeSection(id) {
	document.getElementById(id + "comments-section").style.transform = "translateY(0px)";
}

function openSection(id) {
	galleryGetComments(id);
	document.getElementById(id + "comments-section").style.transform = "translateY(-100%)";
}