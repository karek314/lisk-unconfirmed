<?php
error_reporting(error_reporting() & ~E_NOTICE);
$m = new Memcached();
$m->addServer('localhost', 11211);
echo json_encode($m->get('pending_tx'),true);
?>