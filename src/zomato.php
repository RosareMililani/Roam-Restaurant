<?php

	$restaurants = "";
	if(array_key_exists('restaurants',$_GET)){
		$restaurants = urlencode($_GET['restaurants']);
	}
	
	/* $limit="&count=$count"; */
	/* $count= "&count=$count"; */
	/* $_post['limit']="&count=$count"; */
	/* $count = "&count="+$_post['limit']; */
	/* $count = $_post['limit']; */
	$radius = "&radius=4420868";
	//$_POST['asdf']
	// 1) The URL to the web service
	$URL = "https://developers.zomato.com/api/v2.1/search?q=$restaurants";

	$opts = array('http' =>
			array(
					'method'  => 'GET',
					'header'  => array("Accept: application/json", 
					"user-key: c55fb43d5e08848c68a96fb27b01e42f")
					//'content' => $jsonToSend
			)
	);
	$context = stream_context_create($opts);


	// 6) Call the web service
	$result = file_get_contents($URL, false, $context);

	// 7) Echo results 
	header('accept:application/json'); // tell the requestor that this is JSON
	header("Access-Control-Allow-Origin: *"); // turn on CORS for that shout-client.html can use this service
	echo $result; 
?>