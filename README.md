# lisk-unconfirmed

As of pre lisk core 1.0.0<br>
Needs to use modified Lisk core node
<pre>
bash lisk.sh stop
sed -i 's/maxTxsPerBlock:25/maxTxsPerBlock:100000/g' app.js
bash lisk.sh start
</pre>

Do not use this command on forging node.
