var validUsername = false;

function validateFirstname() {
    return validateInput('reg-firstname', null, "Only upper and lowercase letters allowed", /[^A-Za-z]/, false);
}

function validateLastname() {
    return validateInput('reg-lastname', null, "Only upper and lowercase letters allowed", /[^A-Za-z]/, false);
}

function validateEmail() {
    var reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return validateInput('reg-email', null, "Not a valid email address", reg, true);
}

function validateEmail2() {
    return validateInput('reg-email2', 'reg-email', "Email addresses don't match", null, false);
}

function validateUsername(callback) {
    var input = document.getElementById('reg-username');
    var error = document.getElementById('reg-username-message');
    if (validateInput('reg-username', null, "Only alphanumeric, - and _ characters allowed", /[^A-Za-z0-9\-_]/, false)) {
        ajaxPost("php/exists.php", "user=" + input.value, function(response) {
            var result = JSON.parse(response);
            if (result) {
                addClass(input, "input-error");
                error.innerHTML = "Username already exists";
            }
            if (callback !== undefined) {
                callback(result);
            }
        });
    }
}

function validatePassword() {
    return validateInput('reg-password');
}

function validatePassword2() {
    return validateInput('reg-password2', 'reg-password', "Passwords do not match", null, false);
}

function validateCapcha() {
    return (document.getElementById('reg-yes').checked);
}

function validateInput(inputId, matchId, errorMessage, regex, regexFailFalse) {
    var input = document.getElementById(inputId);
    var error = document.getElementById(inputId + "-message");
    if (input.value === "") {
        addClass(input, "input-error");
        error.innerHTML = "This field is required";
        return false;
    } else if (matchId) {
        if (input.value !== document.getElementById(matchId).value) {
            addClass(input, "input-error");
            error.innerHTML = errorMessage;
            return false;
        }
    } else if (regex) {
        var regTest = (regex.test(input.value));
        if ((regTest || regexFailFalse) && !(regTest && regexFailFalse)) {
            addClass(input, "input-error");
            error.innerHTML = errorMessage;
            return false;
        }
    }
	removeClass(input, "input-error");
	error.innerHTML = "";
    return true;
}

function register() {
    var flag = false;
    if (!validateFirstname()) {
        flag = true;
        console.log("\ninvalid firstname");
    }
    if (!validateLastname()) {
        flag = true;
        console.log("invalid lastname");
    }
    if (!validateEmail()) {
        flag = true;
        console.log("invalid email");
    }
    if (!validateEmail2()) {
        flag = true;
        console.log("invalid email2");
    }
    if (!validatePassword()) {
        flag = true;
        console.log("invalid password");
    }
    if (!validatePassword2()) {
        flag = true;
        console.log("invalid password2");
    }
    if (!validateCapcha()) {
        flag = true;
        console.log("invalid capcha");
    }
    if (flag) {
        validateUsername();
        removeClass(document.getElementById('form-message'), "hidden");
    } else {
        validateUsername(function(response) {
			console.log(response);
            if (response) {
				console.log("User exists");
                removeClass(document.getElementById('form-message'), "hidden");
            } else {
                addClass(document.getElementById('form-message'), "hidden");
                var send = "";
                var username = document.getElementById('reg-username').value;
                var password = document.getElementById('reg-password').value;
                send += "first=" + document.getElementById('reg-firstname').value;
                send += "&last=" + document.getElementById('reg-lastname').value;
                send += "&user=" + username;
                send += "&passwd=" + password;
                send += "&email=" + document.getElementById('reg-email').value;
                ajaxPost("php/create.php", send, function(response) {
                    if (JSON.parse(response)) {
                        window.history.pushState(null, null, "#/confirm");
						changePage("#/confirm");
                    } else {
                        removeClass(document.getElementById('form-message'), "hidden");
                    }
                });
            }
        });
    }
}