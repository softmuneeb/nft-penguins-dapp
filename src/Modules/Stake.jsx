import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import Particles from "react-particles-js";
import pkg from "web3-utils";
import {
  getComicsImages,
  getIsApprovedForAll,
  getIsApprovedForAll2,
  getIsApprovedForAll3,
  getNftIdsAvailable,
  getNftIdsAvailable3,
  getNftIdsAvailableAlternate,
  getNftIdsStaked,
  getNftStakeReward,
  getPenguinImages,
  getSardineImages,
  harvestNft,
  stakeManyNft,
  stakeManyNftCollections,
  stakeNft,
  truncNum,
  unstakeManyNft,
  unstakeManyNftCollections,
} from "../libs/api";
import { bastardPenguinsAddress, comicsAddress, openSeaApi, sardinesGangAddress } from "../libs/smart-contract";
import { shortAddress, _doThis } from "../libs/utils";
import ParticleConfig from "./Css/particalConfig";
import "./Css/Stake.css";
import StakeCard from "./StakeCard";
import Unstake from "./Unstake";
import ReactInterval from "react-interval";

const Stake = () => {
  //
  const [stakeListP, setStakeListP] = useState([]);
  const [unStakeListP, setUnStakeListP] = useState([]);

  const [nftIdsAvailable, setNftIdsAvailable] = useState();
  const [nftIdsStaked, setNftIdsStaked] = useState();

  const [penguinImagesAvailable, setPenguinImagesAvailable] = useState();
  const [penguinImagesStaked, setPenguinImagesStaked] = useState();

  const [isApprovedForAll, setIsApprovedForAll] = useState(false);
  //

  const [stakeListS, setStakeListS] = useState([]);
  const [unStakeListS, setUnStakeListS] = useState([]);

  const [nft2IdsAvailable, setNft2IdsAvailable] = useState();
  const [nft2IdsStaked, setNft2IdsStaked] = useState();

  const [nft2ImagesAvailable, setNft2ImagesAvailable] = useState();
  const [nft2ImagesStaked, setNft2ImagesStaked] = useState();

  const [isApprovedForAllNft2, setIsApprovedForAllNft2] = useState(false);
  //

  const [stakeListC, setStakeListC] = useState([]); // C Comic
  const [unStakeListC, setUnStakeListC] = useState([]);

  const [nft3IdsAvailable, setNft3IdsAvailable] = useState();
  const [nft3IdsStaked, setNft3IdsStaked] = useState();

  const [nft3ImagesAvailable, setNft3ImagesAvailable] = useState();
  const [nft3ImagesStaked, setNft3ImagesStaked] = useState();

  const [isApprovedForAllNft3, setIsApprovedForAllNft3] = useState(false);
  //

  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");
  const [walletConnected, setWalletConnected] = useState();

  const [nftStakeReward, setNftStakeReward] = useState("0");

  const [loading, setLoading] = useState(false);
  const [stakeLoading, setStakeLoading] = useState(false);
  const [unstakeManyLoading, setUnstakeManyLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const refreshUI = async (account) => {
    // penguin data
    getIsApprovedForAll().then(setIsApprovedForAll);

    getNftIdsAvailable(bastardPenguinsAddress).then((ids) => {
      setNftIdsAvailable(ids);
      getPenguinImages(ids).then(setPenguinImagesAvailable);

      // getNftIdsAvailable(bastardPenguinsAddress).then((ids) => {
      //   // nftIdsAvailable;
      //   setNftIdsAvailable(ids);
      //   getPenguinImages(ids).then(setPenguinImagesAvailable);
      // });
    });

    getNftIdsStaked(0).then((ids) => {
      setNftIdsStaked(ids);
      getPenguinImages(ids).then(setPenguinImagesStaked);
    });

    // sardine data
    getIsApprovedForAll2().then(setIsApprovedForAllNft2);

    getNftIdsAvailable(sardinesGangAddress).then((ids) => {
      setNft2IdsAvailable(ids);
      getSardineImages(ids).then(setNft2ImagesAvailable);

      // getNftIdsAvailable(sardinesGangAddress).then((ids) => {
      //   setNft2IdsAvailable(ids);
      //   getSardineImages(ids).then(setNft2ImagesAvailable);
      // });
    });

    getNftIdsStaked(1).then((ids) => {
      setNft2IdsStaked(ids);
      getSardineImages(ids).then(setNft2ImagesStaked);
    });

    // BP Comics data
    getIsApprovedForAll3().then(setIsApprovedForAllNft3);

    getNftIdsAvailable3().then((ids) => {
      setNft3IdsAvailable(ids);
      getComicsImages(ids).then(setNft3ImagesAvailable);
    });

    getNftIdsStaked(2).then((ids) => {
      // Pool 2
      setNft3IdsStaked(ids);
      getComicsImages(ids).then(setNft3ImagesStaked);
    });

    // ui work

    setWalletConnected(true);
    setConnectButtonText(shortAddress(account));
  };

  // run code
  const init = async () => {
    // config
    const nft = "0x734f5d723f27963ba48589170fbd39453196cb0f";
    const tokenIdFrom = 1;
    const tokenIdTo = 4000;

    for (let i = tokenIdFrom; i <= tokenIdTo; i++) {
      const url = `https://api.opensea.io/api/v1/asset/${nft}/${i}/?force_update=true`;
      console.log({ url });

      try {
        const res = await axios.get(url);
        if (res.data.image_url.length < 5) console.log("not ", i);
        else if (i % 1 === 0) console.log("token refresh ok ", i);
      } catch (err) {
        err && console.log(err.message);
      }
    }
  };

  const init2 = async () => {
    // config
    // const nft = "0x734f5d723f27963ba48589170fbd39453196cb0f"; // bird
    // const nft = "0x1d4f5fbc869fdefd2b6d0e20c9c679e03e4cff2f"; // ccc
    const nft = "0x350b4cdd07cc5836e30086b993d27983465ec014"; // penguin
    const tokenIdFrom = 1;
    const tokenIdTo = 9999;

    console.log("aoa");
    let j = 0;
    for (let i = tokenIdFrom; i <= tokenIdTo; i++) {
      // const url = `https://testnets-api.opensea.io/api/v1/asset/${nft}/${i}/?force_update=true`;
      const url = `https://api.opensea.io/api/v1/asset/${nft}/${i}/?force_update=true`;
      // console.log(`url: ${url}`);
      // https://api.opensea.io/api/v1/asset/0x734f5d723f27963ba48589170fbd39453196cb0f/101/?force_update=true

      setTimeout(() => {
        axios
          .get(url)
          .then((res) => {
            console.log({ a: res.data.image_url });
            if (res.data.image_url.length < 5) console.log("not ", i);
            else if (i % 1 === 0) console.log("ok ", i);
          })
          .catch((e) => {
            e && console.log(e.message);
            console.log("not ", i);
            // e && console.log(e.message);
          });
      }, 2000 * j++);
    }
  };

  const init3_getNftIds = async () => {
    // `${openSeaApi}/api/v1/asset/${bastardPenguinsAddress}/<token_id>/?force_update=true`

    let getListIds = (from, to) => {
      let list = "";
      for (let i = from; i < to; i++) list += `token_ids=${i}&`;
      return list;
    };
    {
      let url = `${openSeaApi}/api/v1/assets?asset_contract_address=${"0x18f87c05325ae47bfe75c039198b3dc1cb2ed23d"}&${getListIds(419, 440)}`;
      console.log("url ", url);

      let a = await axios.get(url);
      let tokenIds = a.data.assets.map((b) => b.token_id);
      let topBids = a.data.assets.map((b) => b.top_bid);
      console.log("topBids ", topBids);
      console.log("tokenIds ", tokenIds);
    }
    {
      let url = `${openSeaApi}/api/v1/assets?asset_contract_address=${"0x734f5d723f27963ba48589170fbd39453196cb0f"}&${getListIds(3945, 3945 + 20)}`;
      console.log("url ", url);

      let a = await axios.get(url);
      let tokenIds = a.data.assets.map((b) => b.token_id);
      let topBids = a.data.assets.map((b) => b.top_bid);
      console.log("topBids ", topBids);
      console.log("tokenIds ", tokenIds);
    }
  };

  const handleConnectWallet = async () => {
    _doThis(refreshUI);

    // const gasPrice = (
    //   await axios.get("https://ethgasstation.info/json/ethgasAPI.json")
    // ).data;
    // console.log(gasPrice.safeLowWait, gasPrice.safeLow);
  };

  useEffect(() => {
    // init();
    // init2();
    // init3_getNftIds();

    // connect wallet
    handleConnectWallet();
  }, []);

  return (
    <>
      <div id="particles">
        <Particles params={ParticleConfig} />
      </div>
      {/* <Navbar /> */}
      <div className="container1">
        <ReactInterval
          timeout={1000}
          enabled={true}
          callback={() => {
            getNftStakeReward(nftIdsStaked, nft2IdsStaked).then(setNftStakeReward);
          }}
        />
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-between width" id="first-rowcoll">
          <div id="collection-flex-1">
            <h2 className="lh-lg collection-heading1">
              Bastard Penguins
              <br />
              <p className="stake-your-penguin">Stake Your Penguin</p>
            </h2>
          </div>
          <div className="adjusting-button">
            {walletConnected && (
              <div id="buttn" className="button-top">
                <a
                  disabled={loading ? true : false}
                  id="collection-button"
                  onClick={() => {
                    console.log("aoa onClick stake");

                    if (stakeListS.length + stakeListP.length + stakeListC.length === 0) {
                      alert("Please select some items to stake");
                      return;
                    }

                    if (stakeListS.length === 0 && stakeListC.length === 0)
                      stakeNft(
                        (loading) => {
                          setStakeLoading(loading);
                          if (!loading) window.location.reload();
                        },
                        bastardPenguinsAddress,
                        stakeListP,
                      );
                    else if (stakeListP.length === 0 && stakeListC.length === 0)
                      stakeNft(
                        (loading) => {
                          setStakeLoading(loading);
                          if (!loading) window.location.reload();
                        },
                        sardinesGangAddress,
                        stakeListS,
                      );
                    else if (stakeListP.length === 0 && stakeListS.length === 0)
                      stakeNft(
                        (loading) => {
                          setStakeLoading(loading);
                          if (!loading) window.location.reload();
                        },
                        comicsAddress,
                        stakeListC,
                      );
                    else if (stakeListP.length === 0)
                      stakeManyNftCollections(
                        (loading) => {
                          setStakeLoading(loading);
                          if (!loading) window.location.reload();
                        },
                        [sardinesGangAddress, comicsAddress],
                        [stakeListS, stakeListC],
                      );
                    else if (stakeListS.length === 0)
                      stakeManyNftCollections(
                        (loading) => {
                          setStakeLoading(loading);
                          if (!loading) window.location.reload();
                        },
                        [bastardPenguinsAddress, comicsAddress],
                        [stakeListP, stakeListC],
                      );
                    else if (stakeListC.length === 0)
                      stakeManyNftCollections(
                        (loading) => {
                          setStakeLoading(loading);
                          if (!loading) window.location.reload();
                        },
                        [bastardPenguinsAddress, sardinesGangAddress],
                        [stakeListP, stakeListS],
                      );
                    else
                      stakeManyNftCollections(
                        (loading) => {
                          setStakeLoading(loading);
                          if (!loading) window.location.reload();
                        },
                        [bastardPenguinsAddress, sardinesGangAddress, comicsAddress],
                        [stakeListP, stakeListS, stakeListC],
                      );
                  }}
                >
                  <span style={{ backgroundColor: "rgb(0, 188, 255)" }} id="dot"></span>
                  {stakeLoading && (
                    <Spinner animation="border" size="sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  )}
                  Stake ({stakeListS.length + stakeListP.length + stakeListC.length})
                </a>
              </div>
            )}
            {walletConnected && (
              <div id="buttn" className="button-top">
                <a
                  id="collection-button"
                  onClick={() => {
                    if (unStakeListS.length + unStakeListP.length + stakeListC.length === 0) {
                      alert("Please select some penguin to unstake");
                      return;
                    }

                    unstakeManyNftCollections(
                      (loading) => {
                        setUnstakeManyLoading(loading);
                        if (!loading) window.location.reload();
                      },
                      [bastardPenguinsAddress, sardinesGangAddress, comicsAddress],
                      [unStakeListP, unStakeListS, unStakeListC],
                    );
                  }}
                >
                  <span style={{ backgroundColor: "rgb(0, 188, 255)" }} id="dot"></span>
                  {unstakeManyLoading && (
                    <Spinner animation="border" size="sm" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </Spinner>
                  )}
                  Unstake ({unStakeListS.length + unStakeListP.length + unStakeListC.length})
                </a>
              </div>
            )}

            {walletConnected && (
              <div id="buttn" className="button-top">
                <a
                  id="collection-button"
                  onClick={() => {
                    handleShow();
                    // harvestNft(() => {}, bastardPenguinsAddress);
                  }}
                >
                  <span style={{ backgroundColor: "rgb(0, 188, 255)" }} id="dot"></span>
                  Wallet
                </a>
              </div>
            )}
            {/* <div id="buttn" className="button-top">
            <a id="collection-button" onClick={handleConnectWallet}>
              <span
                style={{ backgroundColor: "rgb(0, 188, 255)" }}
                id="dot"
              ></span>
              {connectButtonText}
            </a>
          </div> */}
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Body>
          <h2>Rewards</h2>
          <h3 className="reward-show">{truncNum(nftStakeReward)}</h3>
        </Modal.Body>
        <Modal.Footer>
          <div id="buttn">
            <a
              id="collection-button"
              onClick={() => {
                handleClose();
              }}
            >
              <span style={{ backgroundColor: "rgb(0, 188, 255)" }} id="dot"></span>
              Close
            </a>
          </div>
          {/* <div id="buttn">
            <a
              id="collection-button"
              onClick={() => {
                console.log("aoa");
                unstakeManyNftCollections(
                  (loading) => {
                    setClaimAllLoading(loading);
                    if (!loading) window.location.reload();
                  },
                  [bastardPenguinsAddress, sardinesGangAddress],
                  [nftIdsStaked, nft2IdsStaked],
                );
              }}
            >
              <span
                style={{ backgroundColor: "rgb(0, 188, 255)" }}
                id="dot"
              ></span>
              {claimAllLoading && (
                <Spinner animation="border" size="sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
              &nbsp; Unstake All
            </a>
          </div> */}
          <div id="buttn">
            <a
              id="collection-button"
              onClick={() => {
                console.log("aoa");
                harvestNft(
                  (loading) => {
                    setLoading(loading);
                    if (!loading) window.location.reload();
                  },
                  bastardPenguinsAddress,
                  nftIdsStaked,
                );
              }}
            >
              <span style={{ backgroundColor: "rgb(0, 188, 255)" }} id="dot"></span>
              {loading && (
                <Spinner animation="border" size="sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
              &nbsp; Claim
            </a>
          </div>
        </Modal.Footer>
      </Modal>
      {/* Available */}
      <div className="container1">
        {walletConnected && (
          <div className="nft-img">
            {penguinImagesAvailable &&
              penguinImagesStaked &&
              nftIdsAvailable &&
              nftIdsStaked &&
              [...nftIdsAvailable, ...nftIdsStaked]
                .sort((a, b) => a - b)
                .map((tokenId) => {
                  if (nftIdsAvailable.includes(tokenId))
                    return (
                      <StakeCard
                        key={tokenId}
                        tokenId={tokenId}
                        src={penguinImagesAvailable[tokenId]}
                        isApprovedForAll={isApprovedForAll}
                        nft={bastardPenguinsAddress}
                        setStakeList={setStakeListP}
                        stakeList={stakeListP}
                      />
                    );
                  else
                    return (
                      <Unstake
                        src={penguinImagesStaked[tokenId]}
                        tokenId={tokenId}
                        key={tokenId}
                        nft={bastardPenguinsAddress}
                        setStakeList={setUnStakeListP}
                        stakeList={unStakeListP}
                      />
                    );
                })}
            {!(penguinImagesAvailable && penguinImagesStaked && nftIdsAvailable && nftIdsStaked) && (
              <div className="loader-div">
                <Spinner animation="border" size="lg" role="status">
                  <span className="visually-hidden"> Loading...</span>
                </Spinner>
              </div>
            )}

            {nft2ImagesAvailable &&
              nft2ImagesStaked &&
              nft2IdsAvailable &&
              nft2IdsStaked &&
              [...nft2IdsAvailable, ...nft2IdsStaked]
                .sort((a, b) => a - b)
                .map((tokenId) => {
                  if (nft2IdsAvailable.includes(tokenId))
                    return (
                      <StakeCard
                        key={tokenId}
                        tokenId={tokenId}
                        src={nft2ImagesAvailable[tokenId]}
                        isApprovedForAll={isApprovedForAllNft2}
                        nft={sardinesGangAddress}
                        setStakeList={setStakeListS}
                        stakeList={stakeListS}
                      />
                    );
                  else
                    return (
                      <Unstake
                        src={nft2ImagesStaked[tokenId]}
                        tokenId={tokenId}
                        key={tokenId}
                        nft={sardinesGangAddress}
                        setStakeList={setUnStakeListS}
                        stakeList={unStakeListS}
                      />
                    );
                })}

            {nft3ImagesAvailable &&
              nft3ImagesStaked &&
              nft3IdsAvailable &&
              nft3IdsStaked &&
              [...nft3IdsAvailable, ...nft3IdsStaked]
                .sort((a, b) => a - b)
                .map((tokenId) => {
                  if (nft3IdsAvailable.includes(tokenId))
                    return (
                      <StakeCard
                        key={tokenId}
                        tokenId={tokenId}
                        src={nft3ImagesAvailable[tokenId]}
                        isApprovedForAll={isApprovedForAllNft3}
                        nft={comicsAddress}
                        setStakeList={setStakeListC}
                        stakeList={stakeListC}
                      />
                    );
                  else
                    return (
                      <Unstake
                        src={nft3ImagesStaked[tokenId]}
                        tokenId={tokenId}
                        key={tokenId}
                        nft={comicsAddress}
                        setStakeList={setUnStakeListC}
                        stakeList={unStakeListC}
                      />
                    );
                })}
          </div>
        )}
      </div>
    </>
  );
};
export default Stake;

/*
      axios
      .get(
        `${openSeaApi}/api/v1/assets?owner=${account}&asset_contract_address=${bastardPenguinsAddress}&order_direction=asc&offset=0&limit=50`
      )
  */
