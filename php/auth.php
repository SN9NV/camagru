<?php
function auth ($login, $passwd) {
	$passwd = hash('whirlpool', $passwd);
	try {
		$conn = new PDO("mysql:host='localhost';dbname='camagru'", "root", "sparewheel");
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = $conn->prepare("SELECT $login FROM users WHERE passwd LIKE $passwd");
		$sql->execute();
		$res = ($sql->rowCount() == 1);
		$conn = null;
		return $res;
	}
	catch(PDOException $e) {
		error_log($e, 3, "/home/angus/Documents/wtc/camagru/log/errors.log");
	}
}
?>