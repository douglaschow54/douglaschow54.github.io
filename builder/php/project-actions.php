<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && !empty($_POST['action'])) {
    switch ($_POST['action']) {
        case 'loadProjectList':
            loadProjectList();
            break;
        case 'loadProjectByName':
            loadProjectByName($_POST['name']);
            break;
        case 'SaveProject':
            saveProject($_POST['project'], $_POST['mode']);
            break;
        case 'SaveProjectByParts':
            saveProjectByParts($_POST['part'], $_POST['index'], isset($_POST['lastChunk']));
            break;
        case 'getIncludedFilesContents':
            getIncludedFilesContents($_POST['files'], $_POST['dir']);
            break;
    }
}


function loadProjectList()
{
    $projects_dir = "../projects/";
    $projects     = glob($projects_dir . "*");
    $projectList  = array();
    for ($i = 0; $i < count($projects); $i++) {
        $file = $projects[$i] . '/project.json';
        if (file_exists($file)) {
            $project = file_get_contents($file);
            array_push($projectList, str_replace("../projects/", "", $projects[$i]));
        }
    }
    echo json_encode($projectList);
}


function loadProjectByName($name)
{
    $file = "../projects/" . $name . "/project.json";
    if (file_exists($file)) {
//        $project = json_decode(file_get_contents($file), true);
//        if (isset($project["pages"])) {
//            for ($i = 0; $i < count($project["pages"]); $i++) {
//                $htmlPath = "../projects/" . $name . "/" . $project["pages"][$i]["path"];
//                if (file_exists($htmlPath)) {
//                    $project["pages"][$i]["html"] = file_get_contents($htmlPath);
//                }
//            }
//        }
//        if (isset($project["presets"])) {
//            for ($i = 0; $i < count($project["presets"]); $i++) {
//                if (isset($project["presets"][$i]["path"]) && !empty($project["presets"][$i]["path"])) {
//                    $htmlPath = "../projects/" . $name . "/elements/" . $project["presets"][$i]["path"];
//                    if (file_exists($htmlPath)) {
//                        $project["presets"][$i]["html"] = file_get_contents($htmlPath);
//                    }
//                }
//            }
//        }
        var_dump(memory_get_usage());
//        echo json_encode($project);
        echo file_get_contents($file);
    } else {
        echo "-1";
    }
}


function saveProject($project, $mode)
{
    $projectObj = json_decode($project, true);
    if (isset($projectObj) && $projectObj != "null") {
        $dir = "../" . $projectObj["dir"];
        $previewMode = isset($mode) && $mode != "null" && $mode == "true";
        if ($previewMode){
            $dir .= "preview/";
        }
        if (!file_exists($dir)) {
            mkdir($dir, 0777);
        }
        $files    = scandir($dir);
        $newFiles = array();

        if (isset($projectObj["filesToDelete"])){
            for ($i = 0; $i < count($projectObj["filesToDelete"]); $i++) {
                $targetFile = $dir . $projectObj["filesToDelete"][$i];
                 if (file_exists($targetFile)) {
                   unlink($targetFile);
                 }
            }
            $projectObj["filesToDelete"] = [];
        }


        if (isset($projectObj["pages"])) {
            for ($i = 0; $i < count($projectObj["pages"]); $i++) {

                if (!$previewMode && !isset($projectObj["pages"][$i]["html"])) {
                   if (($key = array_search($projectObj["pages"][$i]["path"], $files)) !== false) {
                        unset($files[$key]);
                   }
                    continue;
                }

                if (isset($projectObj["pages"][$i]["path"]) && $projectObj["pages"][$i]["path"] === "index.html"){
                    $htmlPath = $dir . "/" . $projectObj["pages"][$i]["path"];
                    $fileName = $projectObj["pages"][$i]["path"];
                } else if (!isset($projectObj["pages"][$i]["path"])) {
                    $title       = preg_replace("/\s+/", "-", strtolower(preg_replace('/[\?|\||\\|\/|\:|\*|\>|\<|\.|\"|\,]/', "", $projectObj["pages"][$i]["title"])));
                    $newFileName = $title . ".html";
                    if (file_exists($dir . $newFileName)) {
                        $j = 1;
                        while (file_exists($dir . $title . "-" . $j . ".html")) {
                            $j++;
                        }
                        $newFileName = $title . "-" . $j . ".html";
                    }
//                    array_push($newFiles, $newFileName);
                    $projectObj["pages"][$i]["path"] = $newFileName;
                    $htmlPath                        = $dir . "/" . $newFileName;
                    $fileName                        = $newFileName;
                }else{
                    $htmlPath = $dir . "/" . $projectObj["pages"][$i]["path"];
                    $fileName = basename($projectObj["pages"][$i]["path"]);
                }

               if (($key = array_search($fileName, $files)) !== false) {
                    unset($files[$key]);
                }


                if (isset($projectObj["pages"][$i]["html"])){
                    $fp = fopen($htmlPath, "wb");
                    fwrite($fp, $projectObj["pages"][$i]["html"]);
                    fclose($fp);
                    unset($projectObj["pages"][$i]["html"]);
                }
            }
        }

        if (!$previewMode && isset($projectObj["presets"]) && file_exists($dir . "elements")) {
            $presetsDir   = $dir . "elements";
            $presetsFiles = scandir($presetsDir);
            $newFiles     = array();
            for ($i = 0; $i < count($projectObj["presets"]); $i++) {
                if (!isset($projectObj["presets"][$i]["html"])) {
                    array_push($newFiles, $projectObj["presets"][$i]["path"]);
                }
            }
            for ($i = 0; $i < count($projectObj["presets"]); $i++) {
                if (isset($projectObj["presets"][$i]["html"])) {
                    $title       = preg_replace("/\s+/", "-", strtolower(preg_replace('/[\?|\||\\|\/|\:|\*|\>|\<|\.|\"|\']/', "", $projectObj["presets"][$i]["title"])));
                    $newFileName = $title . ".html";
                    $j           = 0;
                    if (in_array($newFileName, $newFiles)) {
                        $j = 1;
                        while (in_array($title . "-" . $j . ".html", $newFiles)) {
                            $j++;
                        }
                        $newFileName = $title . "-" . $j . ".html";
                    }
                    array_push($newFiles, $newFileName);
                    $projectObj["presets"][$i]["path"] = $newFileName;
                    $htmlPath                          = $presetsDir . "/" . $newFileName;
                    $fileName                          = $newFileName;
                    if (($key = array_search($fileName, $presetsFiles)) !== false) {
                        unset($presetsFiles[$key]);
                    }
                    if (isset($projectObj["presets"][$i]["html"])) {
                        $fp = fopen($htmlPath, "wb");
                        fwrite($fp, $projectObj["presets"][$i]["html"]);
                        fclose($fp);
                    }
                    if (file_exists($dir . $projectObj["presets"][$i]["preview"])){
                        $ext     = pathinfo($dir . $projectObj["presets"][$i]["preview"]);
                        $preview = basename($dir . $projectObj["presets"][$i]["preview"], "." . $ext['extension']);
                        if (($j == 0 && $preview != $title) || ($j > 0 && $preview != $title . "-" . $j)) {
                            $ext = "." . $ext["extension"];
                            if ($j > 0) {
                                $newPreviewName = $title . "-" . $j;
                            } else {
                                $newPreviewName = $title;
                            }
                            if (file_exists($presetsDir . "/" . $newPreviewName . $ext)) {
                                $k = 1;
                                while (file_exists($presetsDir . "/" . $newPreviewName . "-" . $k . $ext)) {
                                    $k++;
                                }
                                $newPreviewName = $newPreviewName . "-" . $k;
                            }
                            rename($dir . $projectObj["presets"][$i]["preview"], $presetsDir . "/" . $newPreviewName . $ext);
                            $projectObj["presets"][$i]["preview"] = "elements/" . $newPreviewName . $ext;
                        }
                    }
                    unset($projectObj["presets"][$i]["html"]);
                }
            }
            $presetsFiles = scandir($presetsDir);
            foreach ($presetsFiles as $key => $value) {
                if (preg_match("/[^\.]\..*$/", $value)) {
                    if (preg_match('/\.html$/', $value)) {
                        if (!in_array($value, $newFiles)) {
                            $preview = $presetsDir . "/" . basename($value, ".html");
                            if (file_exists($preview . ".jpg")) {
                                unlink($preview . ".jpg");
                            } else if (file_exists($preview . ".png")) {
                                unlink($preview . ".png");
                            }
                            unlink($presetsDir . "/" . $value);
                        }
                    } else {
                        $presetFile = basename($value);
                        $removeFile = true;
                        for ($i = 0; $i < count($projectObj["presets"]); $i++) {
                            $presetPreview = basename($projectObj["presets"][$i]["preview"]);
                            if ($presetPreview == $presetFile) {
                                $removeFile = false;
                                break;
                            }
                        }
                        if ($removeFile) {
                            if (file_exists($presetsDir . "/" . $value)) {
                                unlink($presetsDir . "/" . $value);
                            }
                        }
                    }
                }
            }
        }
        if (!$previewMode){
            foreach ($files as $key => $value) {
                if (preg_match("/[^\.]\..*$/", $value) && $value != 'project.json') {
                    unlink($dir . $value);
                }
            }
        }
        if (isset($projectObj["files"])) {
            foreach ($projectObj["files"] as $key => $value) {
//                if (file_exists($dir . "/" . $key)) {
                    $fp = fopen($dir . "/" . $key, "wb");
                    fwrite($fp, $value["content"]);
                    fclose($fp);
//                }
                unset($projectObj["files"][$key]);
            }
        }
        $file       = $dir . "project.json";
        $projectStr = json_encode($projectObj);
        $fp         = fopen($file, "wb");
        fwrite($fp, $projectStr);
        fclose($fp);
        echo $projectStr;
    }
}


function saveProjectByParts($part, $index, $lastChunk)
{
    if (!$lastChunk) {
        $file = '../temp/save-' . $index . '.txt';
        if (!file_exists("../temp/")) {
            mkdir("../temp/");
        }
        if (file_exists($file)) {
            unlink($file);
        }
        file_put_contents($file, $part);
        echo "success";
    } else {
        $tmpDir      = "../temp/";
        $projectJSON = "";
        for ($i = 0; $i < $index; $i++) {
            $file = $tmpDir . "save-" . $i . ".txt";
            if (file_exists($file)) {
                $projectJSON .= file_get_contents($file);
                unlink($file);
            }
        }
        $projectJSON .= $part;
        saveProject($projectJSON, $_POST['mode']);
    }
}


function getIncludedFilesContents($files, $dir)
{
    $newObj["files"] = json_decode($files, true);
    // Get all files
    foreach ($newObj["files"] as $key => $value) {
        if (strpos($key, $dir) === false) {
            if (file_exists("../" . $dir . $key)) {
                $newObj["files"][$key] = file_get_contents("../" . $dir . $key);
            } else {
                $newObj["files"][$key] = "empty";
            }
        } else {
            if (file_exists($key)) {
                $newObj["files"][$key] = file_get_contents($key);
            } else {
                $newObj["files"][$key] = "empty";
            }
            
        }
    }
    echo json_encode($newObj);
}