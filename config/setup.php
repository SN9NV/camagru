<?php
include_once "database.php";
try {
	$conn = new PDO('mysql:host=127.0.0.1;charset=utf8', $DB_USER, $DB_PASSWORD);
	$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	if ($argc === 2 && $argv[1] == "reinstall") {
		$conn->exec("DROP DATABASE IF EXISTS camagru;");
	}
	$conn->exec("CREATE DATABASE IF NOT EXISTS camagru;");

	$conn->exec("USE camagru;
		CREATE TABLE IF NOT EXISTS users (
		id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		firstname VARCHAR(32) NOT NULL,
		lastname VARCHAR(32) NOT NULL,
		username VARCHAR(32) NOT NULL,
		profilepic VARCHAR(13),
		password VARCHAR(128) NOT NULL,
		email VARCHAR(64) NOT NULL);");
	$conn->exec("USE camagru;
		CREATE TABLE IF NOT EXISTS images (
		id VARCHAR(13) PRIMARY KEY,
		userid INT(6) UNSIGNED NOT NULL,
		title VARCHAR(128),
		date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL);");
	$conn->exec("USE camagru;
		CREATE TABLE IF NOT EXISTS likes (
		id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		imgid VARCHAR(13) NOT NULL,
		userid INT(6) NOT NULL);");
	$conn->exec("USE camagru;
		CREATE TABLE IF NOT EXISTS comments (
		id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		imgid VARCHAR(13) NOT NULL,
		userid INT(6) NOT NULL,
		comment VARCHAR(128) NOT NULL,
		date datetime DEFAULT CURRENT_TIMESTAMP NOT NULL);");
}
catch (PDOException $e) {
	error_log($e, 3, dirname(__DIR__)."/log/errors.log");
}

$conn = null;
?>
