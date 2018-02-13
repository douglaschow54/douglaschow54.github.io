<?php

$uploadDir = '.novi/pages/';
$result = array();

if (isset($_POST["dir"]) && isset($_FILES["file"]) && !empty($_FILES["file"])){
  $projectName = $_POST["dir"];
  $baseName = $_FILES["file"]["name"];
  $path_info = pathinfo($baseName);
  $targetName = preg_replace("/\s+/", "-", mb_convert_case($path_info["filename"], MB_CASE_LOWER, "UTF-8"));

  $ext = "." . $path_info["extension"];


  if (!file_exists("../" . $projectName . ".novi")){
   mkdir("../" . $projectName . ".novi");
  }

  if (!file_exists("../" . $projectName . $uploadDir)){
   mkdir("../" . $projectName . $uploadDir);
  }

  $tmpName = "../" . $projectName . $uploadDir . $targetName . $ext;
  $i = 0;

  while (true) {
    if (file_exists($tmpName)){
      $tmpName = "../" . $projectName . $uploadDir . $targetName . "-" . (++$i) . $ext;
    }else{
      break;
    }
  }

  if( move_uploaded_file($_FILES["file"]["tmp_name"], iconv("utf-8", "cp1251", $tmpName))){
    if ($i > 0){
$result['url'] = $uploadDir . $targetName . "-" . $i . $ext;
}else{
$result['url'] = $uploadDir . $targetName . $ext;
}
};
}

echo json_encode($result);