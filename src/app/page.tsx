'use client'
import Logo from "../../components/SOS.png"
import Image from "next/image";
import styles from "./page.module.css";
import Login from "../../components/login"
import Userinfo from "../../components/userinfo";
import Mint from "../../components/mint";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { chain, client } from "../../utils/constants";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const account = useActiveAccount();


  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div>
      <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
      >
        <div>
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
            
          }}>
            <Image style={{height: "50px", width: "100px"}}
                  src={Logo}
                  alt='logo'/>
              <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}>
          </div>
          
          <div style={{
                display: "flex",
                flexDirection: "row",
                padding: "10px",
          
          }}>
          
          
              <Login />
              <button
              style={{
                margin: "5px",
                        padding: "10px",
                        background: "0",
                        border: "solid",
                        borderRadius: "6px",
                        color: "#FFFFFF",
                        fontSize: "1rem",
                        cursor: "pointer",}}
                        onClick={() => setOpenMenu(true)
          
              }>Menu</button>
          </div>
        </div>

{openMenu && (
                    <div 
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "black",
                        display: "flex",
                        justifyContent: "center",
                        
                        
                    }}>
                      
                      
                        <div style={{
                            position: "absolute",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            padding: "40px",
                            borderRadius: "10px",
                            minWidth: "300px",
                        }}>
                            <button style={{
                                margin: "50px",
                                padding: "10px",
                                background: "0",
                                border: "solid",
                                borderRadius: "6px",
                                color: "#FFFFFF",
                                fontSize: "1rem",
                                cursor: "pointer",}}
                            onClick={() => setOpenMenu(false)}
                            >
                                X
                            </button>
                            <h1 style={{
                              margin: "10px"
                            }}>
                                Menu
                            </h1>
                            
                              <Link style={{marginTop: "10px", }} href={"https://stake.stacksofsats.com/"}>
                                  Stake
                              </Link>
                              <Link  style={{marginTop: "10px" }} href={"https://susd.stacksofsats.com/"}>
                                  sUSD
                              </Link>
                              <Link style={{marginTop: "10px", }} href={"https://newvaults.stacksofsats.com/"}>
                                  sVaults V2
                              </Link>
                              <Link style={{marginTop: "10px", }} href={"https://svaults.stacksofsats.com/"}>
                                  sVaults V1
                              </Link>

                            

                        </div>
                    </div>
                )}

        </div>
        </div>
        <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          padding: "20px",
          height: "100vh",
        }}>
      
      
      
      
      
          <div>
      
      
            <div style={{
              padding: "10px",
              textAlign:"start",
              maxWidth: "50vh"
      
            }}>
              <h1>
            sUSD Vault
          </h1>
                    <p style={{
                      marginTop: "10px"
                    }}>
              sUSD is a decentralised, scalable and overcollateralized stablecoin that is 1:1 USD pegged. Anyone can mint sUSD using their DAI token and also stake their sUSD tokens to receive rewards.
                    </p>
            </div>
      
            <div style={{
              marginTop: "10px",
              marginBottom: "20px"
            }}>
              <Userinfo />
              
            </div>
      
            <div>
            <div style={{
            display: "flex",
            flexDirection: "column",
            
            
            
        }}>
            {account ? (
                <div style={{ textAlign: "center"}}>
                <Mint />

            
            
           
    </div>
            ) : (
                <div style={{backgroundColor: "#151515", padding: "20px", textAlign: "center", borderRadius: "10px",
                  marginTop: "40px",}}>
                <h1 style={{marginBottom: "20px"}}> Connect A Wallet </h1>
                <ConnectButton 
                client={client}
                chain={chain}/>
            </div>
            )}
            
        </div>
            </div>
          </div>
        </div>
      
    </div>
  );
}
