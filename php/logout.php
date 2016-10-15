<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
$_SESSION['logged_on_user'] = NULL;
echo json_encode(null);
?>
