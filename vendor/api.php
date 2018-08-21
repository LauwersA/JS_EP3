<?php
	// connect
	$db = new PDO('mysql:host=localhost;dbname=YTvideos;charset=utf8', 'root', '');
	// get vars
	$action = isset($_GET['action']) ? $_GET['action'] : '';

	// addcomment action
	if ($action == 'addvideo' && isset($_GET['link']) && isset($_GET['begintime']) && isset($_GET['endtime'])) {		
		// fetch conversation
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

		// add comment
		$statement = $db->prepare('INSERT INTO videos (link, begintime, endtime, favorite) VALUES(?, ?, ?, ?)');
		$statement->execute(array($link['v'], $begintime, $endtime, 0));
		ob_end_clean();
		// give notice to client
		exit(json_encode(array(				
			'status' => 200,				
			'message' => 'comment added to conversation'
		)));
	}

	// getconversation action
	if ($action == 'getvideos') {

		// fetch conversation
		$statement = $db->prepare('SELECT * FROM videos ORDER BY Favorite DESC');
		$statement->execute(array());
		$videos = $statement->fetchAll(PDO::FETCH_ASSOC);
		// error: conversation not found
		if (!$videos) {
			http_response_code(404);
			exit(json_encode(array(
				'status' => 404,				
				'message' => 'no videos found'
			)));
		}
		else{
			// give notice to client
			exit(json_encode(array(
				'status' => 200,
				'videos' => $videos,
			)));
		}		
	}	

	// invalid action
	http_response_code(400);
	exit(json_encode(array(
		'status' => 400,				
		'message' => 'invalid API call'
	)));		

