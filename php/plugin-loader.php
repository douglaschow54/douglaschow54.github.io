<?php
    // Load plugin content
   if (isset($_POST["path"]) && !empty($_POST["path"])){
        $path = "../" . $_POST["path"];
        $content = getContent($path);

        if (getContent($path) !== false){
            echo $content;
        }else{
            // File not Found
            echo -1;
        }
   }else{
        echo getPlugins();
   }

   function getPlugins(){
        $pluginsDir = "../plugins/";
        if (!file_exists($pluginsDir)) mkdir($pluginsDir);

        $plugins = glob($pluginsDir . "*");
        for ($i = 0; $i < count($plugins); $i++){
            $plugins[$i] = substr($plugins[$i], 3);
        }
        return json_encode($plugins);
   }

   function getContent($path){
       if (file_exists($path)){
           return file_get_contents($path);
       }

       return false;
   }

