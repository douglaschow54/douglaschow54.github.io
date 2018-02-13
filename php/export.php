<?php
    include_once("Zip.php");

    if ( isset($_POST['dir']) && isset($_POST['name'])) {
        $project_dir = $_POST['dir'];
        $sourceUrl = "../" . $project_dir;
        $project_name =  preg_replace("/\s+/", "-", strtolower(preg_replace('/[\?|\||\\|\/|\:|\*|\>|\<|\.|\"|\,]/', "", $_POST['name'])));;
        $destination = '../temp/' . $project_name . '.zip';

        if (!file_exists("../temp/")) {
          mkdir("../temp/");  
        }

        if (file_exists($destination)){
          unlink($destination);
        }

        zip($sourceUrl, $destination);
    }


    function zip($source, $destination)
    {
        $ignoreDirs = array("media", "elements", "preview", ".novi");
        if (!extension_loaded('zip') || !file_exists($source)) {
            return false;
        }

//        $zip = new ZipArchive();
//        $zip = new ZipStream\ZipStream($destination);
//        if (!$zip->open($destination, ZipArchive::CREATE|ZipArchive::OVERWRITE)) {
//            return false;
//        }

        $zip = new Zip();
        $zip->setZipFile($destination);

        $source = str_replace('\\', '/', realpath($source));

        if (is_dir($source))
        {
            $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source), RecursiveIteratorIterator::SELF_FIRST);

            foreach ($files as $file)
            {
                $file = str_replace('\\', '/', $file);

                // Ignore "." and ".." folders
                if( in_array(substr($file, strrpos($file, '/')+1), array('.', '..')) )
                    continue;

                $file = str_replace('\\', '/', realpath($file));

                if (is_dir($file))
                {
                    $dirName = str_replace($source . '/', '', $file . '/');
                    $isIgnoredDir = false;

                    foreach ($ignoreDirs as $dir){
                         if (strpos($dirName, $dir . "/") !== false){
                            $isIgnoredDir = true;
                            break;
                         }
                    }

                    if (!$isIgnoredDir){
                        $zip->addDirectory($dirName);
                    }

                }
                else if (is_file($file))
                {
                    $relativeFile = str_replace($source . '/', '', $file);
                    if (!preg_match('/^[^\/]*\..*/', $relativeFile)){
                        $isFileFromIgnoredDir = false;

                        foreach ($ignoreDirs as $dir){
                             if (strpos($relativeFile, $dir . "/") !== false){
                                $isFileFromIgnoredDir = true;
                                break;
                             }
                        }

                        if (!$isFileFromIgnoredDir){
                            $zip->addFile(file_get_contents($file), $relativeFile);
                        }
                    }else if (preg_match('/^[^\/]*\.(html)$/', $relativeFile)){
                      $zip->addFile(file_get_contents($file), $relativeFile);
                    }
                }
            }
        }
        else if (is_file($source))
        {
            $zip->addFile(file_get_contents($source), basename($source));
        } 

        $zip->finalize();

        echo json_encode(array( "download_file" => "temp/" . basename($destination)));
    }

