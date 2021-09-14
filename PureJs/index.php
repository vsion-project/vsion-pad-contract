<script src="./web3.min.js"></script>
<script src="./scripts.js"></script>
<?php
echo ("
 <input type='hidden' id='ValueVision' value='1000'/>
<button onclick='Metamask()' id='walletbtn'>Conectar Wallet</button>
<p id='account'></p>
<button id='btnsend' onclick='sendTrasaccion()' style='display:none;'>Retirar Vsion</button>
<button id='addbsc' onclick='AddBinance()' style='display:none;'>Add TesnetBSC</button>
")

?>