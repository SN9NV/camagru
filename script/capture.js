var video;
var canvas;
var draw;
var selectedOverlay = "frame0";
var file;
var overlays = [
	'frame0',
	'crown',
	'pahe',
	'paheThought',
	'dickbuttNigel',
	'harambe',
	'emma',
	'wasted',
	'busted'
];

function setupWebcam() {
	addClass(document.getElementById('video-error'), 'hidden');
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

    navigator.mediaDevices.getUserMedia(constraints)
        .then(handleSuccess)
        .catch(handleError);

	createButtons();
}

function snapshot() {
	document.getElementById('video').style.display = "none";
	removeClass(document.getElementById('canvas'), 'hidden');
	draw.setTransform(1, 0, 0, 1, 0, 0);
	draw.clearRect(0, 0, canvas.width, canvas.height);
	draw.translate(canvas.width, 0);
	draw.scale(-1, 1);
	draw.drawImage(video, 0, 0, canvas.width, canvas.height);
	document.getElementById('save-image').disabled = false;
}

function backToVideo() {
	document.getElementById('video').style.display = "flex";
	addClass(document.getElementById('canvas'), 'hidden');
}

function handleSuccess(stream) {
    window.stream = stream;
    video.srcObject = stream;
}

function handleError(error) {
    console.log('video error: ' + error);
	document.getElementById('video').style.display = "none";
	removeClass(document.getElementById('video-error'), 'hidden');
}

function saveImage() {
    var send = "";
    send += "&title=" + document.getElementById('image-title').value;
    send += "&img=" + canvas.toDataURL();
	send += "&overlay=" + selectedOverlay;
    ajaxPost("php/save_image.php", send, function(response) {
		var result = JSON.parse(response);
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
			var ratio = Math.min(canvas.width / img.width, canvas.height / img.height);
			var centerX = (canvas.width - img.width * ratio) / 2;
			var centerY = (canvas.height - img.height * ratio) / 2;
			draw.setTransform(1, 0, 0, 1, 0, 0);
			draw.clearRect(0, 0, canvas.width, canvas.height);
			draw.drawImage(img, 0, 0, img.width, img.height, centerX, centerY, img.width * ratio, img.height * ratio);
			document.getElementById('save-image').disabled = false;
		};
		img.src = event.target.result;
	};
	if (e.target.files[0] && e.target.files[0].type.match("image.*")) {
		reader.readAsDataURL(e.target.files[0]);
		document.getElementById('upload-image-message').innerHTML = "";
	} else {
		console.log("Selected file is not an image");
		document.getElementById('upload-image-message').innerHTML = "Selected file is not an image";
	}
}

function createButtons() {
/*
	<button onclick="selectOverlay('frame0')">
		<img src="img/ic_frame0.png" />
	</button>
*/
	var parent = document.getElementById('selections');
	overlays.forEach(function(item) {
		var button = document.createElement('button');
		button.onclick = function() {
			selectOverlay(item);
		};
		var img = document.createElement('img');
		img.src = "img/ic_" + item + ".png";
		button.appendChild(img);
		parent.appendChild(button);
	});
}