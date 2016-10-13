<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
if ($_SESSION['logged_on_user']) {
	echo json_encode($_SESSION['logged_on_user']);
}
else {
	echo json_encode(false);
}
?>
