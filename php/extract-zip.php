<?php
    if (isset($_POST['destination']) && isset($_POST['zip'])) {

    $zip = new ZipArchive;
    $zipPath = "../" . $_POST['zip'];
    $destination = "../" . $_POST['destination'];
    $scriptPath = $_SERVER['SCRIPT_NAME'];
    $deepFromRoot = substr_count($scriptPath, "/", 1);
    $destinationDeep = substr_count($destination, "../");

    if ($destinationDeep > $deepFromRoot){
        echo -2;
        return;
    }

    if (file_exists($destination)){
        if (!is_writable($destination)){
            echo -1;
            return;
        }
    }else{
        if (!mkdir($destination, 0777, true)){
            echo -1;
            return;
        }
    }

    $res = $zip->open($zipPath);

    if ($zip->open($zipPath) === TRUE) {
        $zip->extractTo($destination);
        $zip->close();
        unlink($zipPath);
        echo 0;
    } else {
        echo -3;
    }
    }

