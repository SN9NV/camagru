<?php
function auth ($login, $passwd) {
	$file = '../private/passwd';
	$passwd = hash('whirlpool', $passwd);
	if ($users = file_get_contents($file)) {
		$users = unserialize($users);
		foreach ($users as $user) {
			if ($user['login'] == $login) {
				if ($user['passwd'] == $passwd)
					return true;
			}
		}
	}
	return false;
}
?>
