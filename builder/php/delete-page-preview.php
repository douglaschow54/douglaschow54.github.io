<?php
if (isset($_POST["fileName"])){
  $fileName = $_POST["fileName"];
  $targetFile = "../" . $fileName;

  if (file_exists($targetFile)) {
    unlink($targetFile); 
  }

  echo json_encode(array("result" => true)); 
} 