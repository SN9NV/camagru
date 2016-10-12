<?php
session_start();
include "auth.php";
header('Content-Type: application/json');
$user = auth($_POST['login'], $_POST['passwd']);
if ($user) {
	$_SESSION['logged_on_user'] = $user;
	echo json_encode($user, JSON_NUMERIC_CHECK);
}
else {
	$_SESSION['logged_on_user'] = null;
	echo "No no no no no";
}
?>
