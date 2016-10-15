<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_POST['first'] && $_POST['last'] && $_POST['user'] && $_POST['passwd']  && $_POST['email']) {
	try {
		$server = "localhost";
		$dbname = "camagru";

		$first = $_POST['first'];
		$last = $_POST['last'];
		$user = $_POST['user'];
		$email = $_POST['email'];
		$passwd = hash('whirlpool', $_POST['passwd']);

		$conn = new PDO("mysql:host=$server;dbname=$dbname", "root", "sparewheel");
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = $conn->prepare("INSERT INTO `users` (`id`, `firstname`, `lastname`, `username`, `password`, `email`) VALUES (NULL, '$first', '$last', '$user', '$passwd', '$email');");
		$sql->execute();

		echo json_encode(true);
	}
	catch(PDOException $e) {
		error_log($e, 3, "/home/angus/Documents/wtc/camagru/log/errors.log");
		echo json_encode(false);
	}
	$conn = null;
} else {
	echo json_encode(false);
}
?>
