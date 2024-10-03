'use client'


import { useState } from "react";
import { approve, balanceOf } from "thirdweb/extensions/erc20";
import { TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { SVCONTRACT, TCONTRACT } from "../utils/constants";
import { prepareContractCall, toEther, toWei } from "thirdweb";

const Mint: React.FC = () => {

    const account = useActiveAccount();

    const [mintAmount, setMintAmount] = useState(100);
    const [redeemAmount, setRedeemAmount] = useState(0);
    const [mintingState, setMintingState] = useState<"init" | "approved">("init");
    const [isMinting, setIsMinting] = useState(false);
    const [isRedeeming, setIsRedeeming] = useState(false);

    const { 
        data: spUsdtBalance, 
        isLoading: loadingSpUsdtBalance,
        refetch: refetchSpUsdtBalance,
    } = useReadContract (
        balanceOf,
        {
            contract: TCONTRACT,
            address: account?.address || "",
            queryOptions: {
                enabled: !!account
            }
       
    });
    

    const { 
        data: susdBalance, 
        isLoading: loadingSusdBalance,
        refetch: refetchSusdBalance
    } = useReadContract (
        balanceOf,
        {
            contract: SVCONTRACT,
            address: account?.address || "",
            queryOptions: {
                enabled: !!account
            }
       
    });

    const { 
        data: mintPreview, 
        isLoading: loadingMintPreview,
        refetch: refetchMintPreview,
    } = useReadContract (
        
        {
            contract: SVCONTRACT,
            method: "previewDeposit",
            params: [toWei(mintAmount.toString())],
            queryOptions: {
                enabled: !!account
            }
       
    });

    const { 
        data: redeemPreview, 
        isLoading: loadingRedeemPreview,
        refetch: refetchRedeemPreview,
    } = useReadContract (
        
        {
            contract: SVCONTRACT,
            method: "previewRedeem",
            params: [toWei(redeemAmount.toString())],
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
<div>
            
                <div 
                style={{
                    backgroundColor: "#151515",
                    padding: "20px",
                    borderRadius: "10px",
                    marginTop: "40px",
                    
                }}>
                    
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center"
                    }}>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start"
                        }}>
                            <p>
                               Balance:
                        </p>
                        
                        {loadingSusdBalance ? (
          <h1>...<span style={{
            fontSize: "12px"
        }}>sUSD</span></h1>
         ) : (
          <h1>{truncate(toEther(susdBalance!),2)}<span style={{
            fontSize: "12px"
        }}>sUSD</span></h1>
         )} 
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                        }}>
                            <button style={{
                    margin: "5px",
                    padding: "10px",
                    backgroundColor: "#efefef",
                    border: "none",
                    borderRadius: "6px",
                    color: "#333",
                    fontSize: "1rem",
                    cursor: "pointer",}}
                    onClick={() => setIsMinting(true)}
                    
                    >

                                Mint sUSD
                            </button>
                            <button style={{
                    margin: "5px",
                    padding: "10px",
                    backgroundColor: "#efefef",
                    border: "none",
                    borderRadius: "6px",
                    color: "#333",
                    fontSize: "1rem",
                    cursor: "pointer",}}
                    
                    onClick={() => setIsRedeeming(true)}
                    >
                                Redeem
                            </button>
                        </div>
                    
                        {isMinting && (
                    <div 
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        
                    }}>
                        <div style={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            textAlign: "left",
                            backgroundColor: "#151515",
                            padding: "40px",
                            borderRadius: "10px",
                            maxWidth: "500px",
                        }}>
                            
                            <h1>
                                Mint sUSD
                            </h1>
                            <p>
                            To mint sUSD, you are required to deposit a specific amount of DAI in the reserves. sUSD is credited to your wallet after your deposit is confirmed.
                            </p>
                            <p style={{
                                marginTop: "20px"
                            }}>
                                Available Collateral:
                            </p>
                            <h1>
                                {truncate(toEther(spUsdtBalance!),2)}<span style={{
                                    fontSize: "10px"
                                }}>DAI</span>
                            </h1>

                            <p style={{
                                marginTop: "20px"
                            }}>
                                Available sUSD:
                            </p>
                            <h1>
                                {truncate(toEther(susdBalance!),2)}<span style={{
                                    fontSize: "10px"
                                }}>sUSD</span>
                            </h1>

                            
                            
                            {mintingState === "init" ? (
                                <>
                                <p style={{
                                    marginTop: "20px"
                                }}>Enter Amount Deposit</p>
                                <input
                                type="number"
                                placeholder="100"
                                value={mintAmount}
                                onChange={(e) => setMintAmount(Number(e.target.value))}
                                style={{
                                    marginTop: "2px",
                                    padding: "5px",
                                    borderRadius: "5px",
                                    border: "1px solid #333",
                                    width: "100%",
                                    height: "40px",
                                    fontSize: "18px"
                                }}

                                
                                
                                
                                />

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            marginTop: "10px",
                            justifyContent: "space-between",
                        }}>

                            
                        
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "left"
                            
                        }} >
                            <p style={{marginTop: "10px"}}>Mint Fee:</p>
                            
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "right"
                            
                        }} >
                            <p style={{marginTop: "10px"}}>10%</p>
                            
                        </div>
                        
                        </div>

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                        }}>

                            
                        
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "left"
                            
                        }} >
                            <p style={{marginTop: "5px"}}>You receive</p>
                            
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "right"
                            
                        }} >
                    <p style={{ marginTop: "5px"}}>{loadingMintPreview ? (
                    <p>... <span style={{
                            fontSize: "12px"
                    }}>sUSD</span></p>
         ) : (
                    <p>{truncate(toEther(mintPreview!),2).toLocaleString()} <span style={{
                    fontSize: "12px"
                    }}>sUSD</span></p>
                    )} </p>                            
                        </div>

                        
                        
                        
                        
                        </div>


                                <TransactionButton
                                transaction={() => (
                                    approve ({
                                        contract: TCONTRACT,
                                        spender: SVCONTRACT.address,
                                        amount: mintAmount,
                                    })
                                )}
                                onTransactionConfirmed={() => (
                                    setMintingState("approved")
                                )}
                                style={{
                                    width: "100%",
                                    marginTop: "10px",
                                }}
                                >Set Approval</TransactionButton>
                                
                                </>

                            ) : (
                                <>
                                <p style={{marginTop: "10px"}}>When you deposit</p>
                                <h1 style={{ marginTop: "5px"}}>{mintAmount}<span style={{fontSize: "12px"}}>DAI</span></h1>
                                <p style={{marginTop: "10px"}}>You will receive</p>
                                <h1 style={{ marginTop: "5px"}}>{loadingMintPreview ? (
          <h1>...<span style={{
            fontSize: "12px"
        }}>sUSD</span></h1>
         ) : (
          <h1>{truncate(toEther(mintPreview!),2)}<span style={{
            fontSize: "12px"
        }}>sUSD</span></h1>
         )} </h1>
         
                                <TransactionButton style={{width:"100%", marginTop:"10px",}}
                                 transaction={() => (
                                    prepareContractCall({
                                        contract: SVCONTRACT,
                                        method: "deposit",
                                        params: [toWei(mintAmount.toString()), account?.address || ""],
                                    })
                                 )}
                                 onTransactionConfirmed={() => {
                                    setMintAmount(100);
                                    setMintingState("init");
                                    refetchSpUsdtBalance;
                                    setIsMinting(false);
                                 }}
                                >
                                    Mint sUSD
                                </TransactionButton>
                                

                                
                                </>
                                
                            ) } 


                        


                            
                            
                            
                            <button style={{
                                marginTop: "5px",
                                marginBottom: "5px",
                                padding: "10px",
                                backgroundColor: "#efefef",
                                border: "none",
                                borderRadius: "6px",
                                color: "#333",
                                fontSize: "1rem",
                                cursor: "pointer",
                                width: "100%",
                                height: "42px"
                                }}
                                onClick={() => setIsMinting(false)}
                    
                                    >

                                    Close
                                    </button>
                            
                            
                        </div>
                    </div>
                )}

{isRedeeming && (
                    <div 
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        
                    }}>
                        <div style={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "start",
                            textAlign: "left",
                            backgroundColor: "#151515",
                            padding: "40px",
                            borderRadius: "10px",
                            maxWidth: "500px",
                        }}>
                            
                            <h1>
                                Redeem sUSD
                            </h1>
                            <p>
                            To redeem your sUSD, you only need to provide your sUSD and you will receive DAI tokens back at a stable exchange rate of 1:1.
                            </p>
                            
                            

                            <p style={{
                                marginTop: "20px"
                            }}>
                                Available sUSD:
                            </p>
                            <h1>
                                {truncate(toEther(susdBalance!),2)}<span style={{
                                    fontSize: "10px"
                                }}>sUSD</span>
                            </h1>

                            
                            
                            <p style={{ marginTop: "20px"}}>Redeem: </p>
                            <input
                             type="number"
                             placeholder="100"
                             value={redeemAmount}
                             onChange={(e) => setRedeemAmount(Number(e.target.value))}
                             style={{
                                marginTop: "10px",
                                padding: "5px",
                                borderRadius: "5px",
                                border: "1px solid #333",
                                width: "100%",
                                height: "40px",
                                fontSize: "18px"
                            }}
                             />
                             


<div style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            marginTop: "10px",
                            justifyContent: "space-between",
                        }}>

                            
                        
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "left"
                            
                        }} >
                            <p style={{marginTop: "10px"}}>Redemption Fee:</p>
                            
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "right"
                            
                        }} >
                            <p style={{marginTop: "10px"}}>15%</p>
                            
                        </div>
                        
                        </div>

                        <div style={{
                            display: "flex",
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                        }}>

                            
                        
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "left"
                            
                        }} >
                            <p style={{marginTop: "5px"}}>You receive</p>
                            
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            textAlign: "right"
                            
                        }} >
                    <p style={{ marginTop: "5px"}}>{loadingRedeemPreview ? (
                    <p>... <span style={{
                            fontSize: "12px"
                    }}>DAI</span></p>
         ) : (
                    <p>{truncate(toEther(redeemPreview!),2).toLocaleString()} <span style={{
                    fontSize: "12px"
                    }}>DAI</span></p>
                    )} </p>                            
                        </div>

                        
                        
                        
                        
                        </div>
                             
                            <TransactionButton style={{marginTop: "10px", width: "100%"}}
                            transaction={() => (
                                prepareContractCall({
                                    contract: SVCONTRACT,
                                    method: "redeem",
                                    params: [toWei(redeemAmount.toString()), account?.address || "", account?.address || ""] 
                                })
                            )}
                            onTransactionConfirmed={() => {
                                setRedeemAmount(0);
                                refetchSusdBalance;
                                refetchSpUsdtBalance;
                                setIsRedeeming(false);
                            }}
                            >
                                Redeem sUSD
                            </TransactionButton>
                            <button style={{
                                marginTop: "5px",
                                marginBottom: "5px",
                                padding: "10px",
                                backgroundColor: "#efefef",
                                border: "none",
                                borderRadius: "6px",
                                color: "#333",
                                fontSize: "1rem",
                                cursor: "pointer",
                                width: "100%",
                                height: "42px"
                                }}
                                onClick={() => setIsRedeeming(false)}
                    
                                    >

                                    Close
                            </button>
                        </div>
                    </div>
                )}

                        
                    </div>
                    </div>
                    </div>
                    )
                    };
                    export default Mint;
                    
