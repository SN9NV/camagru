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

function getImages(noDestroyChildren, page) {
	var pageNum = 0;
	if (page !== undefined) {
		pageNum = pahe;
	}
    ajaxPost("php/get_images.php", "offset=" + pageNum, function(response) {
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
					var bold = document.createElement('b');
					bold.innerText = item.username;
                    span.innerText = item.title;
					comment.appendChild(bold);
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
				sectionComments.classList = "comments";
				if (item.title) {
					var commentDiv = document.createElement('div');
					var commentSpan = document.createElement('span');
					var commentbold = document.createElement('b');
					commentbold.innerText = item.username;
					commentSpan.innerText = item.title;
					commentDiv.appendChild(commentbold);
					commentDiv.appendChild(commentSpan);
					sectionComments.appendChild(commentDiv);
				}
				section.appendChild(sectionComments);
				if (user) {
					var sectionComment = document.createElement('div');
					sectionComment.classList = "sectionComment";
					var textbox = document.createElement('input');
					textbox.type = "textarea";
					textbox.maxLength = "128";
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
					section.appendChild(sectionComment);
				}

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
        var comment = document.getElementById(id + 'commentTextBox');
        if (comment.value !== null) {
            send += "&comment=" + comment.value;
            ajaxPost("php/comment.php", send, function(response) {
                var result = JSON.parse(response);
                console.log(result);
                if (result) {
					var comments = document.getElementById(id + "comments");
					comments.innerText = parseInt(comments.innerText) + 1;
					comment.value = "";
					galleryGetComments(id);
                }
            });
        }
    } else {
		login();
	}

}

function galleryGetComments(id) {
	ajaxPost("php/get_comments.php", "id=" + id, function(response) {
		var result = JSON.parse(response);
		console.log(result);
		if (result) {
			console.log(result);
			sectionComments = document.getElementById(id + "comments-section-comments");
			while (sectionComments.childNodes.length > result.title) {
				sectionComments.removeChild(sectionComments.lastChild);
			}
			result.comments.forEach(function(item) {
				if (item.comment) {
					var div = document.createElement('div');
					var commentSpan = document.createElement('span');
					var bold = document.createElement('b');
					bold.innerText = item.username;
					commentSpan.innerText = item.comment;
					div.appendChild(bold);
					div.appendChild(commentSpan);
					sectionComments.appendChild(div);
				}
			});
		} else {
			console.log("error");
		}
	});
}

function galleryDelete(id) {
    console.log("Delete " + id);
	ajaxPost("php/delete.php", "id=" + id, function(response) {
		if (JSON.parse(response)) {
			document.getElementById('gallery').removeChild(document.getElementById(id));
		} else {
			console.log("Error removing image");
		}
	});
}

function closeSection(id) {
	document.getElementById(id + "comments-section").style.transform = "translateY(0px)";
}

function openSection(id) {
	galleryGetComments(id);
	document.getElementById(id + "comments-section").style.transform = "translateY(-100%)";
}

window.onscroll = function detectEnd(ev) {
	console.log("scroll");
	if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
		console.log("At the bottom");
		if (window.location.hash === "") {
			console.log("Home");
			pahe = pahe + 1;
			getImages(true, pahe);
		}
	}
};