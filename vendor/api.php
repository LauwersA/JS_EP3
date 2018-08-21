<?php
	// connect
	$db = new PDO('mysql:host=localhost;dbname=YTvideos;charset=utf8', 'root', '');
	// get vars
	$action = isset($_GET['action']) ? $_GET['action'] : '';

	if ($action == 'addvideo' && isset($_GET['link']) && isset($_GET['begintime']) && isset($_GET['endtime'])) {
		parse_str( parse_url( $_GET['link'], PHP_URL_QUERY ), $link );
		echo $link['v'];
		$begintime = explode(":", $_GET['begintime']);
		$beginminutes = $begintime[0];
		$beginseconds = $begintime[1];
		if(is_numeric($beginminutes) && is_numeric($beginseconds)) {
			$begintime = ($beginminutes * 60 + $beginseconds);
		} else {
			$begintime = 0;
		}
		$endtime = explode(":", $_GET['endtime']);
		$endminutes = $endtime[0];
		$endseconds = $endtime[1];
		if(is_numeric($endminutes) && is_numeric($endseconds)) {
			$endtime = ($endminutes * 60 + $endseconds);
		} else {
			$endtime = 0;
		}

		$statement = $db->prepare('INSERT INTO videos (link, begintime, endtime, favorite) VALUES(?, ?, ?, ?)');
		$statement->execute(array($link['v'], $begintime, $endtime, 0));
		ob_end_clean();
		exit(json_encode(array(				
			'status' => 200,				
			'message' => 'comment added to conversation'
		)));
	}

	if ($action == 'getvideos') {

		$statement = $db->prepare('SELECT * FROM videos ORDER BY Favorite DESC');
		$statement->execute(array());
		$videos = $statement->fetchAll(PDO::FETCH_ASSOC);
		if (!$videos) {
			http_response_code(404);
			exit(json_encode(array(
				'status' => 404,				
				'message' => 'no videos found'
			)));
		}
		else{
			exit(json_encode(array(
				'status' => 200,
				'videos' => $videos,
			)));
		}		
	}	

	if ($action == 'like_video') {		
		$statement = $db->prepare('UPDATE videos SET Favorite=?');
		if($_GET['favorite'] == 0){
			$statement->execute(array(1));
			exit(json_encode(array(
				'status' => 200,				
				'message' => 'video liked'
			)));
		} else {
			$statement->execute(array(0));
			exit(json_encode(array(
				'status' => 200,				
				'message' => 'video disliked'
			)));
		}	
	}	

	// invalid action
	http_response_code(400);
	exit(json_encode(array(
		'status' => 400,				
		'message' => 'invalid API call'
	)));		

