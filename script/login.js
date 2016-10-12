function addClass(el, className) {
	if (!el.classList.contains(className)) {
		el.classList.add(className);
	}
}

function removeClass(el, className) {
	if (el.classList.contains(className)) {
		el.classList.remove(className);
	}
}

function logIn() {
    var http = new XMLHttpRequest();
	var login = document.getElementById('username');
	var passwd = document.getElementById('password');
    //Send the proper header information along with the request
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            // Action to be performed when the document is read;
			if (!this.response) {
				addClass(login, "input-error");
				addClass(passwd, "input-error");
				alert("Incorrent username or password");
			}
			else {
				removeClass(login, "input-error");
				removeClass(passwd, "input-error");
			}
        }
    };
    http.open("POST", "php/login.php", true);
	if (login.value && passwd.value) {
		http.send("login=" + login.value + "&passwd=" + passwd.value);
	}
}