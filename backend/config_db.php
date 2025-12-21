<?php

define('DB_HOST', 'localhost'); 

define('DB_USER', 'u307875169_coelgio'); 

define('DB_PASS', 'Sanisidro_2025'); 

define('DB_NAME', 'u307875169_colegio_db'); 

if (basename(__FILE__) == basename($_SERVER["SCRIPT_FILENAME"])) {
    header("Location: /"); 
    exit();
}
?>