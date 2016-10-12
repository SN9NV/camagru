<?php
session_start();
include "auth.php";
if (auth($_GET['login'], $_GET['passwd'])) {
	$_SESSION['logged_on_user'] = $_GET['login'];
	echo "OK\n";
}
else {
	$_SESSION['logged_on_user'] = "";
	echo "ERROR\n";
}
?>
