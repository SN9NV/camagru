<?php
function auth ($login, $passwd) {
	if (preg_match('/^?.*/', $login)) {
		return false;
	}
	$passwd = hash('whirlpool', $passwd);
	try {
		$server = "localhost";
		$dbname = "camagru";
		$conn = new PDO("mysql:host=$server;dbname=$dbname", "root", "sparewheel");
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = $conn->prepare("SELECT `id`, `firstname` FROM `users` WHERE username=? AND password=?;");
		$sql->execute([$login, $passwd]);

		if ($sql->rowCount() == 1) {
			$fetch = $sql->fetch(PDO::FETCH_ASSOC);
			$res = $fetch;
		}
		else {
			$res = false;
		}
		$conn = null;
		return $res;
	}
	catch(PDOException $e) {
		error_log($e, 3, "/home/angus/Documents/wtc/camagru/log/errors.log");
	}

	$conn = null;
}
?>