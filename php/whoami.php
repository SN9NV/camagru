<?php
session_start();
header('Content-Type: text/plain');
if ($_SESSION['logged_on_user']) {
	echo json_encode($_SESSION['logged_on_user']);
}
else {
	echo json_encode(false);
}
?>
