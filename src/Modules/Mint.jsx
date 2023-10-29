import React, { useEffect, useState } from "react";
import { fromWei } from "web3-utils";
import {
  bastardPenguinsAddress,
  gasFactor,
  getContractBastardPenguins,
  getContractComics,
  iglooAddress,
  getContractGetNFTs,
  getContractSardinesGang,
} from "../libs/smart-contract";
import { getIsApprovedForAllComics, approveComicsContract } from "../libs/api";
import { _doThis, _purchasePenguins } from "../libs/utils";
const Mint = () => {
  // ........State..........................

  const maxSupply = 9999; //10
  const [mintNum, setMintNum] = useState(0);
  const [mintwidth, setMintwidth] = useState(0);
  const [isApproved, setIsApproved] = useState(false);
  const [howMany, setVal] = useState();
  const [howManyIg, setValIg] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingIg, setLoadingIg] = useState(false);

  let refreshTotal = true;

  useEffect(() => {
    // console.log("workdng");
    getIsApprovedForAllComics().then(setIsApproved);
    console.log(isApproved + "Working on aprroved comicsAddress");
  }, []);

  const someWork = async () => {
    // setMintNum(
    //   Number(
    //     await getContractBastardPenguins().methods.purchasedPenguins().call()
    //   )
    // );
  };

  // .........Do at start
  // useEffect(() => {
  //   setInterval(() => {
  //     // console.log(': ');
  //     // refreshTotal = false;

  //     console.log("refreshTotal: ", refreshTotal);
  //     if (refreshTotal === false) {
  //       return;
  //     }

  //     _doThis(async (account, web3) => {
  //       try {
  //         const _nftIds = await getContractGetNFTs(web3)
  //           .methods.GetNFTsForAddress(account, bastardPenguinsAddress, 1, 9999)
  //           .call();
  //         console.log("_nftIds.length: ", _nftIds);
  //         setNftIds(_nftIds);
  //         refreshTotal = false;
  //         setVal(_nftIds.length);
  //       } catch (error) {
  //         refreshTotal = false;
  //       }
  //     }, false);
  //   }, 3000);
  // }, []);

  // .........Function...............................

  const val = (e) => {
    // if (e.target.value <= 1000) {
    // console.log(e.target.value);
    setVal(e.target.value);
    // }
  };
  const val1 = (e) => {
    // if (e.target.value <= 1000) {
    // console.log(e.target.value);
    setValIg(e.target.value);
    // }
  };

  // const mint = async () => {
  //   //setLoading(true);
  //   console.log(loading);
  //   await _purchasePenguins(vall, setLoading);

  //   // maybe we need to fix it later
  //   setMintNum(vall + mintNum);
  //   // maybe we need to fix it later

  //   setMintwidth(vall);
  // };

  return (
    <>
      <div className="row ">
        <div className="col-12 " id="mint-resp">
          {/* <div id='Seconddiv' style={{ width: `${mintwidth * 10}px` }}></div> */}
          <div id="Firstrow-mint" style={{}} className="">
            <div className="d-flex flex-column flex-lg-row justify-content-around align-items-center">
              <div className="">
                <div
                  id="firstDiv"
                  className="d-flex justify-content-between flex-column"
                >
                  {/* <p id='Firstpara' className='mb-0'>
                    <b>
                      {mintNum}/{maxSupply}{' '}
                      <span> ( {maxSupply - mintNum} remaining )</span>
                    </b>
                  </p> */}
                  <div className=" d-flex align-items-center" id="inppp">
                    <p className="mb-0 me-4" id="Thirdpara">
                      <b>BP&nbsp;Comics#2:</b>
                    </p>
                    <div className="" style={{ zIndex: "1" }}>
                      <input
                        id="mintinput"
                        onChange={val}
                        type="text"
                        value={howMany}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="d-flex flex-column justify-content-between  align-items-center align-items-lg-start"
                id="minntmain"
              >
                {/* <div className='d-flex'>
                  <p id='Secondpara'>
                    <b>Mint: 0.02 ETH +gas fee</b>
                  </p>
                </div> */}

                <div className="" style={{ zIndex: "1" }}>
                  <button
                    onClick={() => {
                      // setLoading(true);
                      // console.log("loading" + loading);
                      // mint();

                      _doThis(async (account, web3) => {
                        if (!howMany || isNaN(howMany)) {
                          alert("Enter some quantity to Mint");
                          return;
                        }
                        const contract = getContractComics(web3);
                        const contractPenguin =
                          getContractBastardPenguins(web3);

                        const balancePenguin = web3.utils.fromWei(
                          await contractPenguin.methods
                            .balanceOf(account)
                            .call()
                        );

                        const price = fromWei(
                          balancePenguin > 0
                            ? await contract.methods.itemPriceHolder().call()
                            : await contract.methods.itemPrice().call()
                        );

                        const totalPrice = web3.utils.toWei(
                          (Number(price) * howMany).toString()
                        );

                        // here we use code from twitter post of nft
                        const method = contract.methods.purchaseTokens(howMany);
                        let options = {
                          from: account,
                          gas: "0",
                          value: totalPrice,
                        };
                        try {
                          const estimateGasPrice1 = await method.estimateGas(
                            options
                          );
                          const estimateGasPrice2 = Math.trunc(
                            gasFactor * estimateGasPrice1
                          );
                          options = { ...options, gas: "" + estimateGasPrice2 };
                        } catch (e) {
                          let msg;
                          try {
                            let a = e.message;
                            msg = JSON.parse(
                              a.substring(
                                a.indexOf("{"),
                                a.lastIndexOf("}") + 1
                              )
                            ).message;
                            msg = msg.replace("err: ", "");
                            msg = msg.replace("execution reverted: ", "");
                          } catch (eiii) {}

                          if (!msg || msg === undefined) {
                            msg = "Insufficient funds";
                          }

                          alert(msg);

                          return;
                        }

                        try {
                          setLoading(true);
                          await method.send(options).on("confirmation", (i) => {
                            //here

                            if (i === 0) {
                              setLoading(false);
                              alert("Bastard Penguins Comics Minted");
                            }
                          });
                        } catch (e) {
                          setLoading(false);
                          alert(e.message);
                        }
                      }, false);
                    }}
                    style={{
                      backgroundColor: loading
                        ? "rgb(51 120 250)"
                        : "rgb(0, 188, 255)",
                    }}
                    id="mint-button"
                    disabled={loading ? true : false}
                  >
                    {loading ? "Minting..." : "Ether"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4"></div>
        </div>
      </div>

      <div className="row ">
        <div className="col-12 " id="mint-resp">
          {/* <div id='Seconddiv' style={{ width: `${mintwidth * 10}px` }}></div> */}
          <div id="Firstrow-mint" style={{}} className="">
            <div className="d-flex flex-column flex-lg-row justify-content-around align-items-center">
              <div className="">
                <div
                  id="firstDiv"
                  className="d-flex justify-content-between flex-column"
                >
                  {/* <p id='Firstpara' className='mb-0'>
                    <b>
                      {mintNum}/{maxSupply}{' '}
                      <span> ( {maxSupply - mintNum} remaining )</span>
                    </b>
                  </p> */}
                  <div className=" d-flex align-items-center" id="inppp">
                    <p className="mb-0 me-4" id="Thirdpara">
                      <b>BP&nbsp;Comics#2:</b>
                    </p>
                    <div className="" style={{ zIndex: "1" }}>
                      <input
                        id="mintinput"
                        onChange={val1}
                        type="text"
                        value={howManyIg}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="d-flex flex-column justify-content-between  align-items-center align-items-lg-start"
                id="minntmain"
              >
                {isApproved && (
                  <div className="" style={{ zIndex: "1" }}>
                    <button
                      onClick={() => {
                        // setLoading(true);
                        // console.log("loading" + loading);
                        // mint();

                        _doThis(async (account, web3) => {
                          if (!howManyIg || isNaN(howManyIg)) {
                            alert("Enter some quantity to Mint");
                            return;
                          }
                          console.log(howManyIg);
                          const contract = getContractComics(web3);
                          const contractPenguin =
                            getContractBastardPenguins(web3);

                          const balancePenguin = web3.utils.fromWei(
                            await contractPenguin.methods
                              .balanceOf(account)
                              .call()
                          );

                          const price = fromWei(
                            await contract.methods.itemPriceErc20().call()
                          );
                          console.log("price" + price);

                          const totalPrice = web3.utils.toWei(
                            (Number(price) * howManyIg).toString()
                          );
                          console.log("totalPrice" + totalPrice);

                          // here we use code from twitter post of nft
                          const method =
                            contract.methods.purchaseTokensErc20(howManyIg);
                          let options = {
                            from: account,
                            gas: "0",
                            // value: totalPrice,
                          };
                          try {
                            const estimateGasPrice1 = await method.estimateGas(
                              options
                            );
                            console.log(
                              "estimateGasPrice1" + estimateGasPrice1
                            );

                            const estimateGasPrice2 = Math.trunc(
                              gasFactor * estimateGasPrice1
                            );

                            console.log(
                              "estimateGasPrice2" + estimateGasPrice2
                            );
                            options = {
                              ...options,
                              gas: "" + estimateGasPrice2,
                            };
                          } catch (e) {
                            let msg;
                            try {
                              console.log(e.message);
                              let a = e.message;
                              let objStr = a.substring(
                                a.indexOf("{"),
                                a.lastIndexOf("}") + 1
                              );
                              // console.log({ objStr });
                              msg =
                                JSON.parse(objStr).message ||
                                JSON.parse(objStr).originalError.message;
                              msg = msg.replace("err: ", "");
                              msg = msg.replace("execution reverted: ", "");
                            } catch (eiii) {}

                            if (!msg || msg === undefined) {
                              msg = "Insufficient funds or data error";
                              console.log(msg);
                            }

                            alert(msg);

                            return;
                          }

                          try {
                            setLoadingIg(true);
                            await method
                              .send(options)
                              .on("confirmation", (i) => {
                                //here

                                if (i === 0) {
                                  setLoadingIg(false);
                                  alert("Bastard Penguins Comics Minted");
                                }
                              });
                          } catch (e) {
                            setLoadingIg(false);
                            alert(e.message);
                          }
                        }, false);
                      }}
                      style={{
                        backgroundColor: loadingIg
                          ? "rgb(51 120 250)"
                          : "rgb(0, 188, 255)",
                      }}
                      id="mint-button"
                      disabled={loadingIg ? true : false}
                    >
                      {loadingIg ? "Minting..." : "Igloo"}
                    </button>
                  </div>
                )}

                {!isApproved && (
                  <div className="" style={{ zIndex: "1" }}>
                    <button
                      style={{
                        backgroundColor: loadingIg
                          ? "rgb(51 120 250)"
                          : "rgb(0, 188, 255)",
                      }}
                      id="mint-button"
                      disabled={loadingIg ? true : false}
                      onClick={() => {
                        console.log("working");
                        approveComicsContract((loadingIg) => {
                          setLoadingIg(loadingIg);
                          if (!loadingIg) window.location.reload();
                        }, iglooAddress);
                      }}
                    >
                      {loadingIg ? "Approving..." : "Approve"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-4"></div>
        </div>
      </div>
    </>
  );
};

export default Mint;
