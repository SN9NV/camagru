var video;
var canvas;
var draw;
var selectedOverlay = "frame0";
var file;

function setupWebcam() {
	file = document.getElementById('upload-image');
	   file.addEventListener('change', resizeUpload, false);
    video = document.getElementById('video-webcam');
    canvas = window.canvas = document.getElementById('picture-canvas');
    var constraints = {
        audio: false,
		video: {
			width: {exact: 480},
			height: {exact: 360}
		}
    };
    canvas.width = 480;
    canvas.height = 360;
	draw = canvas.getContext('2d');
	draw.translate(canvas.width, 0);
	draw.scale(-1, 1);

    navigator.mediaDevices.getUserMedia(constraints)
        .then(handleSuccess)
        .catch(handleError);
}

function snapshot() {
	draw.drawImage(video, 0, 0, canvas.width, canvas.height);
}

function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
}

function handleError(error) {
    console.log('video error: ' + error);
}

function saveImage() {
    var send = "";
    send += "&title=" + document.getElementById('image-title').value;
    send += "&img=" + canvas.toDataURL();
	send += "&overlay=" + selectedOverlay;
    ajaxPost("php/save_image.php", send, function(response) {
		var result = JSON.parse(response);
		console.log(result);
		if (!result) {
			login();
		}
		window.history.pushState(null, null, "#");
		changePage("#");
    });
}

function selectOverlay(overlay) {
	selectedOverlay = overlay;
	document.getElementById('video-overlay').src = "img/" + overlay + ".png";
	document.getElementById('canvas-overlay').src = "img/" + overlay + ".png";
}

function resizeUpload(e) {
	var reader = new FileReader();
	reader.onload = function(event) {
		var img = new Image();
		img.onload = function() {
			var maxWidth = 480;
			var maxHeight = 360;
			var imgWidth = img.width;
			var imgHeight = img.height;
			if (imgWidth > imgHeight) {
				if (imgWidth > maxWidth) {
					imgHeight *= maxWidth / imgWidth;
					imgWidth = maxWidth;
				}
			} else {
				if (imgHeight > maxHeight) {
					imgWidth *= maxHeight / imgHeight;
					imgHeight = maxHeight;
				}
			}
			draw.setTransform(1, 0, 0, 1, 0, 0);
			draw.clearRect(0, 0, canvas.width, canvas.height);
			draw.drawImage(img, 0, 0, imgWidth, imgHeight);
		};
		img.src = event.target.result;
	};
	if (e.target.type === "image*") {
		reader.readAsDataURL(e.target.files[0]);
	} else {
		console.log("Selected file is not an image");
	}
}