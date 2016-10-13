var newUser = [];

function create_user() {
	ajaxPost("create_user.html", null, function(response) {
		if (response) {
			document.getElementById('main').innerHTML = response;
		} else {
			console.log("Oh no");
		}
	});
}

function validateFirstname() {
	var input = document.getElementById('reg-firstname');
	var error = document.getElementById('reg-firstname-message');
	var value = input.value;
	var reg = /[^A-Za-z]/;
	if (reg.test(value)) {
		error.innerHTML = "Only upper and lowercase letters";
		addClass(input, "input-error");
	} else {
		error.innerHTML = "";
		removeClass(input, "input-error");
		newUser.firstname = value;
	}
}

function validateLastname() {
	var input = document.getElementById('reg-lastname');
	var error = document.getElementById('reg-lastname-message');
	var value = input.value;
	var reg = /[^A-Za-z]/;
	if (reg.test(value)) {
		error.innerHTML = "Only upper and lowercase letters";
		addClass(input, "input-error");
	} else {
		error.innerHTML = "";
		removeClass(input, "input-error");
		newUser.lastname = value;
	}
}

function validateEmail() {
	var input = document.getElementById('reg-email');
	var error = document.getElementById('reg-email-message');
	var value = input.value;
	var reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
	if (!reg.test(value)) {
		error.innerHTML = "Not a valid email address";
		addClass(input, "input-error");
	} else {
		error.innerHTML = "";
		removeClass(input, "input-error");
		newUser.email = value;
	}
}

function validateEmail2() {
	var input = document.getElementById('reg-email2');
	var error = document.getElementById('reg-email2-message');
	if (input.value !== document.getElementById('reg-email').value) {
		addClass(input, "input-error");
		error.innerHTML = "Email addresses don't match";
	} else {
		removeClass(input, "input-error");
		error.innerHTML = "";
	}
}


function validate() {

}

function resgister() {

}