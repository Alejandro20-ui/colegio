<?php
require_once __DIR__ . '/../config_db.php'; 

$input = json_decode(file_get_contents("php://input"), true);

$session_id = $input["session_id"];
$pagina     = $input["pagina"];
$evento     = $input["evento"];
$tiempo     = $input["tiempo"] ?? 0;

$stmt = $conexion->prepare(
    "INSERT INTO ia_eventos (session_id, pagina, evento, tiempo)
     VALUES (?, ?, ?, ?)"
);

$stmt->bind_param("sssi", $session_id, $pagina, $evento, $tiempo);
$stmt->execute();

echo json_encode(["ok" => true]);
