<?php
try {
	$server = "localhost";
	$dbname = "camagru";
	$conn = new PDO("mysql:host=$server", "root", "sparewheel");
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	if (argc === 2 && argv[1] === "reinstall") {
		$conn->exec("DROP DATABASE IF EXISTS camagru;");
	}
	$conn->exec("CREATE DATABASE IF NOT EXISTS camagru;");

	$conn->exec("USE camagru; CREATE TABLE IF NOT EXISTS users (
		id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		firstname VARCHAR(32) NOT NULL,
		lastname VARCHAR(32) NOT NULL,
		username VARCHAR(32) NOT NULL,
		profilepic VARCHAR(13),
		password VARCHAR(128) NOT NULL,
		email VARCHAR(64) NOT NULL);");
	$conn->exec("USE camagru; CREATE TABLE IF NOT EXISTS images (
		id VARCHAR(13) PRIMARY KEY,
		userid INT(6) UNSIGNED NOT NULL,
		title VARCHAR(128),
		date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL);");
	$conn->exec("USE camagru; CREATE TABLE IF NOT EXISTS likes (
		id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		imgid TEXT NOT NULL,
		userig INT(6) NOT NULL;");
	$conn->exec("USE camagru; CREATE TABLE IF NOT EXISTS comment (
		id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		imgid VARCHAR(13) NOT NULL,
		userig INT(6) NOT NULL,
		comment VARCHAR(128) NOT NULL;");
}
catch (PDOException $e) {
	error_log($e, 3, "/home/angus/Documents/wtc/camagru/log/errors.log");
}

$conn = null;
?>
