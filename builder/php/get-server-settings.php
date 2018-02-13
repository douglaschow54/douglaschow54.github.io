<?php
    $max_upload_size = return_bytes(ini_get('upload_max_filesize'));
    $response = array(
        "upload_max_filesize" => $max_upload_size
    );
    echo json_encode($response);


function return_bytes($val) {
    $val = trim($val);
    $last = strtolower($val[strlen($val)-1]);
    switch($last) {
        case 'g':
            $val *= 1024;
        case 'm':
            $val *= 1024;
        case 'k':
            $val *= 1024;
    }

    return $val;
}