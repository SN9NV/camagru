<?php
session_start();
include "auth.php";
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$user = auth($_POST['login'], $_POST['passwd']);
if ($user) {
	$_SESSION['logged_on_user'] = $user;
	echo json_encode($user);
}
else {
	$_SESSION['logged_on_user'] = null;
	echo json_encode(false);
}
?>