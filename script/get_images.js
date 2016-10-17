function timeSince(date) {
    var seconds = Math.floor((new Date().getTime() / 1000) - date);

    var interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
		if (interval > 1) {
			return interval + " years ago";
		}
        return interval + " year ago";
    }

    interval = Math.floor(seconds / 2592000);
	if (interval >= 1) {
		if (interval > 1) {
			return interval + " months ago";
		}
        return interval + " month ago";
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

function getImages() {
	ajaxPost("php/get_images.php", null, function(response) {
		var result = JSON.parse(response);
		console.log(result);
		var gallery = document.getElementById('gallery');
		gallery.innerHTML = "";
		result.forEach(function(item) {
			
		});
	});
}