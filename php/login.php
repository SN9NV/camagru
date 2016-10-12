<?php
session_start();
include "auth.php";
if (auth($_POST['login'], $_POST['passwd'])) {
	$_SESSION['logged_on_user'] = $_POST['login'];
	echo true;
}
else {
	$_SESSION['logged_on_user'] = null;
	echo false;
}
?>
