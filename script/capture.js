var video;
var canvas;

function setupWebcam() {
	video = document.getElementById('video-webcam');
	canvas = window.canvas = document.getElementById('picture-canvas');
	var constraints = {
		audio: false,
		video: true
	};
	canvas.width = 480;
	canvas.height = 360;
	console.log("variables set up");

	navigator.mediaDevices.getUserMedia(constraints)
		.then(handleSuccess)
		.catch(handleError);
}

function snapshot() {
	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
}

function handleSuccess(stream) {
	window.stream = stream;
	video.srcObject = stream;
	console.log("Video open");
}

function handleError(error) {
	console.log('video error: ' + error);
}

function closeWebcam() {
	stream.getTracks()[0].stop();
}