var user = null;
var loginForms =
'<input id="username" type="text" placeholder="Username" tabindex="1"/>' +
'<input id="password" type="text" placeholder="Password" tabindex="2"/>' +
'<input type="submit" name="name" value="Log In" onclick="login()" tabindex="3">';
var userLogin = user.firstname + " <a href=\"#\" onclick='logout()'>LOGOUT</a>";

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

function login() {
    var http = new XMLHttpRequest();
    var login = document.getElementById('username');
    var passwd = document.getElementById('password');
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
			user = JSON.parse(http.response);
            if (!user) {
                addClass(login, "input-error");
                alert("Incorrent username or password");
            } else {
                removeClass(login, "input-error");
                document.getElementById('login').innerHTML =
            }
		}
    };
    http.open("POST", "php/login.php", true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if (login.value && passwd.value) {
        http.send("login=" + login.value + "&passwd=" + passwd.value);
    }
}

function whoami() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
	    if (http.readyState == 4 && http.status == 200) {
	        user = JSON.parse(http.response);
	        if (!user) {
				document.getElementById('login').innerHTML =

	        } else {
	            removeClass(login, "input-error");
	            document.getElementById('login').innerHTML = user.firstname + " <a href=\"#\" onclick='logout()'>LOGOUT</a>";
	        }
	    }
	};
	http.open("POST", "php/whoami.php", true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send();
}

function logout() {
	var http = new XMLHttpRequest();
	http.onreadystatechange = function() {
	    if (http.readyState == 4 && http.status == 200) {
	        if (!JSON.parse(http.response)) {
				document.getElementById('login').innerHTML =
				'<input id="username" type="text" placeholder="Username" tabindex="1"/>' +
				'<input id="password" type="text" placeholder="Password" tabindex="2"/>' +
				'<input type="submit" name="name" value="Log In" onclick="login()" tabindex="3">';
	        } else {
	            alert("Logout failed");
	        }
	    }
	};
	http.open("POST", "php/logout.php", true);
	http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	http.send();
}