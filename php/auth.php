<?php
function auth ($login, $passwd) {
	include_once "../config/database.php";
	if (preg_match('/^?.*/', $login)) {
		return false;
	}
	$passwd = hash('whirlpool', $passwd);
	try {
		$conn = new PDO($DB_DSN, $DB_USER, $DB_PASSWORD);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = $conn->prepare("SELECT `id`, `firstname` FROM `users` WHERE username=? AND password=?;");
		$sql->execute([$login, $passwd]);

		if ($sql->rowCount() === 1) {
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
		error_log($e, 3, dirname(__DIR__)."/log/errors.log");
	}

	$conn = null;
}
?>