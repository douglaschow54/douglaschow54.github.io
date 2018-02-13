<?php

$uploadDir = 'images/';
$result = array();

if (isset($_POST["dir"]) && isset($_FILES["file"]) && !empty($_FILES["file"])){
  $projectName = $_POST["dir"];
  $baseName = $_FILES["file"]["name"];
  $tmpName = "../" . $projectName . $uploadDir . $baseName;

  if( move_uploaded_file($_FILES["file"]["tmp_name"], $tmpName)){
    $result['url'] = $uploadDir . $baseName;
  }
}

echo json_encode($result); 