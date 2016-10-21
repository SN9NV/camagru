function validateEmailUsernameReset() {
    return validateInput('reset-email');
}

function resetPasswordEmail() {
	if (document.getElementById('reset-email').value !== "" && (document.getElementById('reset-yes').checked)) {
		addClass(document.getElementById('reset-form-message'), "hidden");
		var uri = window.location.href;
		var send = "value=" + document.getElementById('reset-email').value;
		console.log(send);
		ajaxPost("php/send_reset.php", send, function(response) {
			var result = JSON.parse(response);
			if (result) {
				document.getElementById('reset-message').innerText = "Email sent. If you don't get your email within the next 5 minutes, please check that you have entered in your email/username correctly.";
			} else {
				removeClass(document.getElementById('reset-form-message'), "hidden");
			}
		});
	} else {
		removeClass(document.getElementById('reset-form-message'), "hidden");
	}
}

function validatePasswordReset() {
	return validateInput('reset-password');
}

function validatePasswordReset2() {
	return validateInput('reset-password2', 'reset-password', "Passwords do not match", null, false);
}

function resetPassword() {
	var flag = false;
	if (!validatePasswordReset()) {
		flag = true;
		console.log("invalid password");
	}
	if (!validatePasswordReset2()) {
		flag = true;
		console.log("invalid password2");
	}
	if (!flag) {
		addClass(document.getElementById('reset-form-message'), "hidden");
		var uri = window.location.href;
		var send = "uri=" + uri.replace(/^.*\/#\/reset\//, '');
		send += "&passwd=" + document.getElementById('reset-password').value;
		console.log(send);
		ajaxPost("php/change_password.php", send, function(response) {
			if (JSON.parse(response)) {
				loadPartial("reset_success.html");
			} else {
				document.getElementById('reset-message').innerText = "Error changing password";
			}
		});
	} else {
		removeClass(document.getElementById('reset-form-message'), "hidden");
	}
}