<?php
ob_start(null, 0, PHP_OUTPUT_HANDLER_CLEANABLE);
function resizeImage($filename, $max_width, $max_height)
{
  list($orig_width, $orig_height) = getimagesize($filename);

  $width = $orig_width;
  $height = $orig_height;

  # taller
  if ($height > $max_height) {
      $width = ($max_height / $height) * $width;
      $height = $max_height;
  }

  # wider
  if ($width > $max_width) {
      $height = ($max_width / $width) * $height;
      $width = $max_width;
  }

  $image_p = imagecreatetruecolor($width, $height);

  $ext = pathinfo($filename, PATHINFO_EXTENSION );

  switch ($ext) {
    case 'jpeg':
    case 'jpg':
      $image = imagecreatefromjpeg($filename);
      break;

    case 'png':
      imagealphablending( $image_p, false );
      imagesavealpha( $image_p, true );  
      $image = imagecreatefrompng($filename);
      break;  

    case 'gif':
      imagealphablending( $image_p, false );
      imagesavealpha( $image_p, true );   
      $image = imagecreatefromgif($filename);
      break;
  }

  

  imagecopyresampled($image_p, $image, 0, 0, 0, 0, 
                                   $width, $height, $orig_width, $orig_height);

  return $image_p;
} 


if (isset($_FILES) && !empty($_FILES) && isset($_POST["dir"])){
  $mediaDir = $_POST["dir"];
  $thumbsDir = $mediaDir . "thumbs/";
  $extensions = array("jpeg", "jpg", "png", "gif");
  $video_extensions = array("mp4", "webm", "avi", "ogg");

  if (!file_exists("../" . $mediaDir)){
    mkdir("../" . $mediaDir);
  }

//  if (!file_exists("../" . $thumbsDir)){
//    mkdir("../" . $thumbsDir);
//  }

    $files = array();

  foreach ($_FILES["files"]["error"] as $key => $error) {
    if ($error == UPLOAD_ERR_OK) {
      $name = preg_replace("/\s+/", "-",  mb_convert_case($_FILES["files"]["name"][$key], MB_CASE_LOWER, "UTF-8"));
      $ext = pathinfo($name, PATHINFO_EXTENSION );
      if (in_array($ext, $extensions) || in_array($ext, $video_extensions) ){
        move_uploaded_file( $_FILES["files"]["tmp_name"][$key], "../" . $mediaDir . iconv("utf-8", "cp1251", $name));
        array_push($files, $name);
      }       
    }
  }

//  $origMedia = scandir("../" . $mediaDir);
//  $thumbMedia = scandir("../" . $thumbsDir);
//
//  foreach ($origMedia as $key => $filename) {
//    $ext = pathinfo($filename, PATHINFO_EXTENSION );
//
//    if (!in_array($filename, $thumbMedia)){
//        if (in_array($ext, $extensions)){
//            $thumb = resizeImage("../" . $mediaDir . $filename, 240, 70);
//
//            switch ($ext) {
//              case 'jpg':
//              case 'jpeg':
//                imagejpeg($thumb, "../" . $thumbsDir . $filename);
//                break;
//
//              case 'png':
//                imagepng($thumb, "../" . $thumbsDir . $filename);
//                break;
//
//              case 'gif':
//                imagegif($thumb, "../" . $thumbsDir . $filename);
//                break;
//            }
//
//            imagedestroy($thumb);
//        }else if (in_array($ext, $video_extensions)){
//
//        }
//    }
//  }
  
//  $files = array();
//  foreach ($_FILES["files"]["error"] as $key => $error) {
//    if ($error == UPLOAD_ERR_OK) {
//      $name = preg_replace("/\s+/", "-", mb_strtolower($_FILES["files"]["name"][$key]));
//      $ext = pathinfo($name, PATHINFO_EXTENSION );
//      if (in_array($ext, $extensions) || in_array($ext, $video_extensions)){
//
//        array_push($files, $name);
//      }
//    }
//  }

  ob_clean();
  echo json_encode($files);   
} 