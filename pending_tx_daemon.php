<?php
error_reporting(error_reporting() & ~E_NOTICE);
require_once('lisk-php/main.php');
$m = new Memcached();
$m->addServer('localhost', 11211);
$lisk_host = $m->set('lisk_host', '127.0.0.1', 3600*365);
$lisk_port = $m->set('lisk_port', '8000', 3600*365);
$lisk_protocol = $m->set('lisk_protocol', 'http', 3600*365);

$i=0;
while (1) {
  $i++;
  //Save current pending tx
  $ptjson = GetPendingTx($server);
  $m->set('pending_tx', $ptjson, 3600*365);
  $count = $ptjson['meta']['count'];
  echo "\n[".$i."]Current tx pending: ".$count;
  csleep(1);
}



function csleep($wait_time){
  $org_wait_time = $wait_time;
  $start_time = time();
  $chr = 50;
  echo "\n";
  $chars = array();
  $wait_time = $wait_time/$chr;
  for ($i=0; $i <= $chr; $i++) {
    $chars[] = "#";
    $count = count($chars);
    $string = '[';
    $string .= implode('',$chars);
    $empty = $chr-$count;
    for ($j=0; $j <= $empty; $j++) { 
      $string .= ' ';
    }
    $precent = (double)($i/$chr)*100;
    $current_time = time();
    $diff = $current_time-$start_time;
    $left = $org_wait_time-$diff;
    echo "\rSleeping ".$left."s [".$i."/".$chr."(".$wait_time."s)] ".$string."] ".$precent."%";
    if ($wait_time > 300) {
      sleep(floor($wait_time));
    } else {
      $u_wait_time = $wait_time*1000000;
      usleep($u_wait_time);
    }
  }
}


?>
