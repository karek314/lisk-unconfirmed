<?php
error_reporting(error_reporting() & ~E_NOTICE);
$m = new Memcached();
$m->addServer('localhost', 11211);
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($m->get('pending_tx'),true);
?>