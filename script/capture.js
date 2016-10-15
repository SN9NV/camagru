var video;
var canvas;
var draw;
var selectedOverlay = "frame0";

function setupWebcam() {
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
    console.log("variables set up");

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
    console.log("Video open");
}

function handleError(error) {
    console.log('video error: ' + error);
}

function saveImage() {
    var send = "";
    send += "id=" + user.id;
    send += "&title=" + document.getElementById('image-title').value;
    send += "&img=" + canvas.toDataURL();
	send += "&overlay=" + selectedOverlay;
    ajaxPost("php/save_image.php", send, function(result) {
		console.log(JSON.parse(result));
    });
}

function selectOverlay(overlay) {
	selectedOverlay = overlay;
	document.getElementById('video-overlay').src = "img/" + overlay + ".png";
	document.getElementById('canvas-overlay').src = "img/" + overlay + ".png";
}