var account;
const addresSwap = "0xbf13B683f00a140606143A5b268b15095cA2770F";
const AbiSwap = [
    {
        "inputs": [],
        "name": "CerrarVenta",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_percent",
                "type": "uint256"
            }
        ],
        "name": "ChangePercent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bool",
                "name": "_lock",
                "type": "bool"
            }
        ],
        "name": "LockSell",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "SafeTransfer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "newOwner",
                "type": "address"
            }
        ],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_token1",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_walletRecive",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_percent",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "criptovision",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "getAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "getTaxt",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "lock",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "percent",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "tokenSell",
        "outputs": [
            {
                "internalType": "contract IERC20",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

async function Metamask() {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    const network = await ethereum.request({ method: 'net_version' });
    if (chainId !== "0x61" && network !== "97") {
        alert("Debes cambiar de red")
        document.getElementById("addbsc").style.display = "block";
        return
    }
    account = accounts[0];
    document.getElementById("account").innerHTML = account;
    document.getElementById("btnsend").style.display = "block";
    document.getElementById("walletbtn").style.display = "none";
}


async function AddBinance() {

    await ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
            chainId: "0x61",
            chainName: "Smart Chain - Testnet",
            nativeCurrency: {
                name: "Binance Coin",
                symbol: "bnb", // 2-6 characters long
                decimals: 18,
            },
            rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org"],
            blockExplorerUrls: ["https://testnet.bscscan.com/"],
        }],
    });
    /**** Quitar comentarios si se quiere usar la MainNet ****/
    // await ethereum.request({
    //     method: 'wallet_addEthereumChain',
    //     params: [{
    //         chainId: "0x38",
    //         chainName: "Binance Smart Chain Mainnet",
    //         nativeCurrency: {
    //             name: "Binance Coin",
    //             symbol: "bnb", // 2-6 characters long
    //             decimals: 18,
    //         },
    //         rpcUrls: ["https://bsc-dataseed.binance.org"],
    //         blockExplorerUrls: ["https://bscscan.com/"],
    //     }],
    // });

    document.getElementById("addbsc").style.display = "none";
}

async function sendTrasaccion() {
    let web3 = new Web3(window.ethereum)
    let contractSend = new web3.eth.Contract(AbiSwap, addresSwap);
    let amountTranfer = document.getElementById("ValueVision").value + "00000000";
    contractSend.methods.SafeTransfer(amountTranfer).send({ from: account }).then(r => {
        // Recibe Respuesta de la blockchain, aqui se puede poner cualquier alerta
        console.log(r)
        alert(JSON.stringify(r))
    }).catch(r => alert(JSON.stringify(r)))
}


window.onload = async function () {
    if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        const network = await ethereum.request({ method: 'net_version' });
        if (chainId !== "0x61" && network !== "97") {
            alert("Debes cambiar de red")
            document.getElementById("account").innerHTML = "";
            account = "";
            document.getElementById("addbsc").style.display = "block";
            document.getElementById("walletbtn").style.display = "block";
            console.log(chainId, network)
        }
        ethereum.on('accountsChanged', (accounts) => {
            // Handle the new accounts, or lack thereof.
            // "accounts" will always be an array, but it can be empty.
            document.getElementById("account").innerHTML = accounts[0];
            account = accounts[0];
        });
        ethereum.on('chainChanged', (chainId) => {
            //chainId !== "0x38" && network !== "56"
            if (chainId !== "0x61" && network !== "97") {
                alert("Debes cambiar de red")
                document.getElementById("account").innerHTML = "";
                account = "";
                document.getElementById("addbsc").style.display = "block";
                document.getElementById("walletbtn").style.display = "none";
                return

            }
        });
    }
};
