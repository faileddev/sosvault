import { useActiveAccount, useReadContract } from "thirdweb/react";
import { SVCONTRACT, TCONTRACT } from "../utils/constants";
import { balanceOf } from "thirdweb/extensions/erc20";
import { toEther } from "thirdweb";



const Userinfo: React.FC = () => {
   
    const account = useActiveAccount();

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

    const { 
        data: totalDeposit, 
        isLoading: loadingTotalDeposit,
        refetch: refetchTotalDeposit,
    } = useReadContract (
        
        {
            contract: SVCONTRACT,
            method: "totalAssets",
            queryOptions: {
                enabled: !!account
            }
       
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
                
                <h3>{truncate(toEther(vaultTotalSupply!),2)}<span style={{fontSize: "8px"}}>sUSD</span></h3>
                
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
            </div>
        </div>
        
    )
};

export default Userinfo;