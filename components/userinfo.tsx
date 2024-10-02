import { useActiveAccount, useReadContract } from "thirdweb/react";
import { SVCONTRACT, TCONTRACT } from "../utils/constants";
import { balanceOf } from "thirdweb/extensions/erc20";
import { toEther } from "thirdweb";



const Userinfo: React.FC = () => {
   
    const account = useActiveAccount();

    const vaultContract = "0x56bB3b9885ea2e240F6fa36C8d211E91aD83FF3B";
    const treasuryAddress = "0xaCe09eC29819533D23199F72Cea5fE6A2C8F13C2";


    const { data: vaultTotalSupply, isLoading: loadingVaultTotalSupply} = useReadContract ({
        contract: SVCONTRACT,
        method: "totalSupply"
    });

 

    const { data: spUsdtBalance, isLoading: loadingSpUsdtBalance} = useReadContract (
        balanceOf,
        {
            contract: TCONTRACT,
            address: account?.address || "",
            queryOptions: {
                enabled: !!account
            }
       
    });

    const { data: vaultReserve, isLoading: loadingVaultReserve} = useReadContract (
        balanceOf,
        {
            contract: TCONTRACT,
            address: treasuryAddress,
            
       
    });



    const { 
        data: totalDeposit, 
        isLoading: loadingTotalDeposit,
        refetch: refetchTotalDeposit,
    } = useReadContract (
        
        {
            contract: SVCONTRACT,
            method: "totalAssets",
            
       
    });

    function truncate(vaule: string | number, decimalPlaces: number): number {
        const numericValue: number = Number(vaule);
        if (isNaN(numericValue)) {
            throw new Error('Invalid input: value must be convertible to a number');
        }
        const factor: number = Math.pow(10,decimalPlaces);
        return Math.trunc(numericValue*factor) / factor
    }
    
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            
            
            
        }}>
            <div style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                  
            }}>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  textAlign:"center",
                  borderRadius: "10px",
                  borderColor: "gray",
                  border: "solid",
                  marginTop: "20px",
                }}
                  >
                    <p>sUSD Price</p>
                    <h3>$0.99</h3>
                </div>
                
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  textAlign:"center",
                  borderRadius: "10px",
                  borderColor: "gray",
                  border: "solid",
                  marginTop: "20px",
                }}
                  >
                    <p>Total Supply</p>
                    {loadingVaultTotalSupply ? (
                
                <p>...</p>
            
                
            ) : (
                
                <h3>{truncate(toEther(vaultTotalSupply!),2).toLocaleString()}<span style={{fontSize: "8px"}}>sUSD</span></h3>
                
            )}


                    </div>

                
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  textAlign:"center",
                  borderRadius: "10px",
                  borderColor: "gray",
                  border: "solid",
                  marginTop: "20px",
                }}
                  >
                    <p>Vault Reserve</p>
                    {loadingVaultReserve ? (
                
                <p>...</p>
            
                
            ) : (
                
                <h3>{truncate(toEther(totalDeposit! + vaultReserve!),2).toLocaleString()}<span style={{fontSize: "8px"}}>DAI</span></h3>
                
            )}
                    
                </div>

                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  textAlign:"center",
                  borderRadius: "10px",
                  borderColor: "gray",
                  border: "solid",
                  marginTop: "20px",
                }}
                  >
                    <p>Exchange Rate</p>
                    <h3>1:1</h3>
                    
                </div>

                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  textAlign:"center",
                  borderRadius: "10px",
                  borderColor: "gray",
                  border: "solid",
                  marginTop: "20px",
                }}
                  >
                    <p>Mint Fee</p>
                    <h3>4-5%<span style={{fontSize: "8px"}}>(500bp)</span></h3>
                    
                </div>
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "20px",
                  textAlign:"center",
                  borderRadius: "10px",
                  borderColor: "gray",
                  border: "solid",
                  marginTop: "20px",
                }}
                  >
                    <p>Redeem Fee</p>
                    <h3>14-15%<span style={{fontSize: "8px"}}>(1500bp)</span></h3>
                    
                </div>
            </div>
        </div>
        
    )
};

export default Userinfo;