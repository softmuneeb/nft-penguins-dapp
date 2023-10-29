import React, { useEffect, useState } from "react";
import {
  bastardPenguinsAddress,
  getContractBastardPenguins,
  getContractGetNFTs,
  getContractSardinesGang,
} from "../libs/smart-contract";
import { _doThis, _purchasePenguins } from "../libs/utils";
const PurchaseSardines = () => {
  // ........State..........................

  const maxSupply = 9999; //10
  const [mintNum, setMintNum] = useState(0);
  const [mintwidth, setMintwidth] = useState(0);
  const [nftIds, setNftIds] = useState();
  const [vall, setVal] = useState();
  const [loading, setLoading] = useState(false);
  let refreshTotal = true;

  const someWork = async () => {
    // setMintNum(
    //   Number(
    //     await getContractBastardPenguins().methods.purchasedPenguins().call()
    //   )
    // );
  };

  // .........Do at start
  useEffect(() => {}, []);

  // .........Function...............................

  const val = (e) => {
    // if (e.target.value <= 1000) {
    // console.log(e.target.value);
    setVal(e.target.value);
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
                      <b>SG&nbsp;Mint:</b>
                    </p>
                    <div className="" style={{ zIndex: "1" }}>
                      <input
                        id="mintinput"
                        onChange={val}
                        type="number"
                        name="quantity"
                        min="1"
                        max="10000"
                        value={vall}
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
                        if (!vall || isNaN(vall)) {
                          alert("Enter some sardine quantity to buy");
                          return;
                        }
                        const sardines = getContractSardinesGang(web3);
                        const price = web3.utils.fromWei(
                          await sardines.methods.itemPrice().call()
                        );
                        const _howMany = Number(vall);
                        const totalPrice = web3.utils.toWei(
                          (Number(price) * _howMany).toString()
                        );

                        // here we use code from twitter post of nft
                        const purchase = sardines.methods.purchaseTokens(vall);
                        let options = {
                          from: account,
                          gas: "0",
                          value: totalPrice,
                        };
                        try {
                          const estimateGasPrice1 = await purchase.estimateGas(
                            options
                          );
                          const estimateGasPrice2 = Math.trunc(
                            1.2 * estimateGasPrice1
                          );
                          options = { ...options, gas: "" + estimateGasPrice2 };
                        } catch (e) {
                          // alert(e.message.toString());
                          alert(e.message.split("\n")[0].split("reverted:")[1]);
                          return;
                        }

                        try {
                          setLoading(true);
                          await purchase
                            .send(options)
                            .on("confirmation", (i) => {
                              //here
                              if (i === 0) {
                                setLoading(false);
                                alert("Tokens Bought");
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
                    {loading ? "Minting..." : "Mint"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row mt-4"></div>
        </div>
      </div>
    </>
  );
};

export default PurchaseSardines;
