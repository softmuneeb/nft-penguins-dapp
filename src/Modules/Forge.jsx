import * as IPFS from "ipfs-core";
import axios from "axios";
import { useEffect, useState } from "react";
import Particles from "react-particles-js";
import ParticleConfig from "./Css/particalConfig";
import { Spinner } from "react-bootstrap";
// import { log } from 'console';
import {
  api,
  bastardPenguinsAddress,
  getContractBastardPenguins,
  getContractGetNFTs,
  openSeaApi,
  sardinesGangAddress,
} from "../libs/smart-contract";
// import { uploadIpfs } from "../libs/uploadIpfs";
// import { uploadIpfsFile, uploadIpfsText } from "../libs/uploadIpfs";
import { shortAddress, _doThis } from "../libs/utils";

import "./Css/Forge.css";
import empty from "./empty600px.png";

import { getImageLink, getMetadataLink, mergeImage } from "./merge";
import { SpecialList } from "./SpecialTraits";

import JSZip from "jszip";
import { saveAs } from "file-saver";
import {
  getMetadataPenguins,
  getNftIdsAvailable,
  getPenguinImages,
  mergedPenguinsSzn1,
} from "../libs/api";

// see array data as object for display in app
// input: metadataString:  {"attributes":[{"trait_type":"Background","value":"Aqua"},{"trait_type":"Skin","value":"Violet"},{"trait_type":"Eyes","value":"Bastard"},{"trait_type":"Mouth","value":"Terminator"},{"trait_type":"Hat","value":"BP"},{"trait_type":"Outfit","value":"Football"}], "image":"ipfs://QmQWEJcvfEZnQuGzHTRgZuF2bFcRc341Sjs7Aa99dKDexm/3974.png",}
// output: {"Background":"Aqua","Skin":"Violet","Eyes":"Bastard","Mouth":"Terminator","Hat":"BP","Outfit":"Football"}
const see = (m) => {
  // const m = JSON.parse(metadataString);
  let retObj = {};
  for (let i = 0; i < m.length; i++)
    m[i] && (retObj[m[i].trait_type] = m[i].value);
  return retObj;
};

const getCssSelectedToken = (tokenId, selectedPenguin1, selectedPenguin2) => {
  if (tokenId == selectedPenguin1 || tokenId == selectedPenguin2)
    return " tokens-list-item-selected ";
  else return " ";
};

const getCssSelectedToken2 = (tokenId, selectedPenguin1, selectedPenguin2) => {
  if (tokenId == selectedPenguin1 || tokenId == selectedPenguin2)
    return " burn-list-item-selected ";
  else return "button-trials ";
};

const someThing = async (
  trait,
  setTrait1,
  setTrait2,
  setTrait3,
  setTrait4,
  setTrait5,
  setTrait6,
  setTrait7
) => {
  switch (trait) {
    case "Accessories":
      setTrait1(null);
      break;
    case "Background":
      setTrait2(null);
      break;
    case "Skin":
      setTrait7(null);
      break;
    case "Outfit":
      setTrait6(null);
      break;
    case "Eyes":
      setTrait3(null);
      break;
    case "Mouth":
      setTrait5(null);
      break;
    case "Hat":
      setTrait4(null);
      break;
  }
};

const Forge = () => {
  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");

  const [tokenIds, setTokenIds] = useState();
  const [images, setImages] = useState();
  const [metadatas, setMetadatas] = useState();

  const [loading, setLoading] = useState(false);
  const [walletConnected, setWalletConnected] = useState(null);
  const [selectedPenguin1, setSelectedPenguin1] = useState();
  const [selectedPenguin2, setSelectedPenguin2] = useState();
  const [selectedPenguin1i, setSelectedPenguin1i] = useState();
  const [selectedPenguin2i, setSelectedPenguin2i] = useState();

  const [ipfs, setIpfs] = useState(null);

  // images
  const [background, setBackground] = useState(empty);
  const [skin, setSkin] = useState(empty);
  const [eyes, setEyes] = useState(empty);
  const [hat, setHat] = useState(empty);
  const [mouth, setMouth] = useState(empty);
  const [outfit, setOutfit] = useState(empty);
  const [accessories, setAccessories] = useState(empty);

  // special traits
  const [trait1, setTrait1] = useState();
  const [trait2, setTrait2] = useState();
  const [trait3, setTrait3] = useState();
  const [trait4, setTrait4] = useState();
  const [trait5, setTrait5] = useState();
  const [trait6, setTrait6] = useState();
  const [trait7, setTrait7] = useState();

  // normal traits
  const [selectedTrait1, setSelectedTrait1] = useState();
  const [selectedTrait2, setSelectedTrait2] = useState();
  const [selectedTrait3, setSelectedTrait3] = useState();
  const [selectedTrait4, setSelectedTrait4] = useState();
  const [selectedTrait5, setSelectedTrait5] = useState();
  const [selectedTrait6, setSelectedTrait6] = useState();
  const [selectedTrait7, setSelectedTrait7] = useState();

  // merged image
  const [b64, setB64] = useState(empty);

  const [mergedPenguinObj, setMergedPenguinObj] = useState({});
  const [metadata1, setMetadata1] = useState();
  const [metadata2, setMetadata2] = useState();

  const [tokenToBurn, setTokenToBurn] = useState();
  // Preparing for speical Trials

  const specialAccessories = ["Select", "Guts Sword", "Thinking Baloon"];

  const specialShirts = ["Select", "BladeRunner Coat", "Puffy Coat"];

  const specialBackground = ["Select", "Matrix", "Newspaper"];

  const specialHat = ["Select", "Bucket Hat", "Steampunk Glasses", ""];

  const specialEyes = ["Select", "One Eye", "The Rock"];

  const specialMouth = ["Select", "Cigar", "Cigarette"];

  const specialSkin = ["Select", "Lava", "Leopard"];

  const getMetadataFromObj = (obj) => {
    let attributes = [];
    // get each trait
    const traits = Object.keys(obj);
    traits.map((trait) => {
      if (
        trait !== "tokenId" &&
        trait !== "tokenIdBurned" &&
        obj[trait] !== undefined &&
        obj[trait] !== null
      ) {
        attributes.push({ trait_type: trait, value: obj[trait] });
      }
    });
    attributes.push({ trait_type: "Merged", value: "SZN2" });

    // remove spaces and comma at end of attributes
    const metadata = {
      tokenId: obj.tokenId,
      tokenIdBurned: obj.tokenIdBurned,
      attributes,
    };

    return JSON.stringify(metadata, null, 4);
  };

  const ButtonPair = (p) => {
    // images
    //(p.button1Text || p.button2Text) &&

    return (
      <>
        {
          <div>
            <h3
              style={{
                color: "black",
                lineHeight: "2rem",
                fontSize: 17,
                fontFamily: "'Press Start 2P'",
                marginLeft: 5,
              }}
            >
              {p.title}
            </h3>
            <button
              className={
                p.selectedTrait && p.selectedTrait === 1
                  ? "selectedButton"
                  : "button-trials"
              }
              style={{ fontWeight: "600" }}
              onClick={async () => {
                // making image on UI
                mergeImage({
                  trait: p.title,
                  traitValue: p.button1Text,
                  setB64,
                  background,
                  setBackground,
                  skin,
                  setSkin,
                  eyes,
                  setEyes,
                  hat,
                  setHat,
                  mouth,
                  setMouth,
                  outfit,
                  setOutfit,
                  accessories,
                  setAccessories,
                });
                // Make other coloumn fields to null
                someThing(
                  p.title,
                  setTrait1,
                  setTrait2,
                  setTrait3,
                  setTrait4,
                  setTrait5,
                  setTrait6,
                  setTrait7
                );
                // managing metadata
                const copy = { ...mergedPenguinObj };
                copy[p.title] = p.button1Text;
                setMergedPenguinObj(copy);
                p.setSelectedTrait(1);
              }}
            >
              {p.button1Text || "None"}
            </button>
            <button
              className={
                p.selectedTrait && p.selectedTrait === 2
                  ? "selectedButton"
                  : "button-trials"
              }
              style={{ height: "50px", width: "150px", fontWeight: "600" }}
              onClick={async () => {
                // making image on UI
                mergeImage({
                  trait: p.title,
                  traitValue: p.button2Text,
                  setB64,
                  background,
                  setBackground,
                  skin,
                  setSkin,
                  eyes,
                  setEyes,
                  hat,
                  setHat,
                  mouth,
                  setMouth,
                  outfit,
                  setOutfit,
                  accessories,
                  setAccessories,
                });
                someThing(
                  p.title,
                  setTrait1,
                  setTrait2,
                  setTrait3,
                  setTrait4,
                  setTrait5,
                  setTrait6,
                  setTrait7
                );

                // managing metadata
                const copy = { ...mergedPenguinObj };
                copy[p.title] = p.button2Text;
                setMergedPenguinObj(copy);
                p.setSelectedTrait(2);
              }}
            >
              {p.button2Text || "None"}
            </button>
            <div style={{ marginTop: 10 }}></div>
          </div>
        }
      </>
    );
  };

  const ButtonPairTokenId = (p) => {
    return (
      <>
        {(p.button1Text || p.button2Text) && (
          <div>
            <h3
              style={{
                color: "black",
                lineHeight: "2rem",
                fontSize: 17,
                fontFamily: "'Press Start 2P'",
                marginLeft: 5,
              }}
            >
              {p.title}
            </h3>
            <button
              className="button-trials"
              className={
                getCssSelectedToken2(
                  tokenToBurn,
                  p.button1Text,
                  p.button1Text
                ) + (p.button1Text || " button-hidden")
              }
              style={{ height: "50px", width: "150px", fontWeight: 600 }}
              onClick={async () => {
                const copy = { ...mergedPenguinObj };
                copy["tokenId"] = p.button2Text;
                copy["tokenIdBurned"] = p.button1Text;
                setMergedPenguinObj(copy);
                setTokenToBurn(p.button1Text);
              }}
            >
              {"Token#" + p.button1Text}
            </button>
            <button
              className="button-trials"
              className={
                getCssSelectedToken2(
                  tokenToBurn,
                  p.button2Text,
                  p.button2Text
                ) + (p.button2Text || " button-hidden")
              }
              style={{ height: "50px", width: "150px", fontWeight: 600 }}
              onClick={async () => {
                const copy = { ...mergedPenguinObj };
                copy["tokenId"] = p.button1Text;
                copy["tokenIdBurned"] = p.button2Text;

                setMergedPenguinObj(copy);
                setTokenToBurn(p.button2Text);
              }}
            >
              {"Token#" + p.button2Text}
            </button>
          </div>
        )}
      </>
    );
  };

  const checkSardinesAvailable = async (account) => {
    const sardineTokenIds = await getNftIdsAvailable(sardinesGangAddress, 2682);

    let available = false;
    let apiError = false;
    let sardineTokenIdAvailable = null;

    for (let i = 0; i < sardineTokenIds.length; i++) {
      const sardineTokenId = sardineTokenIds[i];

      try {
        available = (
          await axios.get(`${api}/is-sardine-available/${sardineTokenId}`)
        ).data.success;
      } catch (e) {
        e && console.log(e.message);
        apiError = true;
        alert("Api not running");
        break;
      }

      sardineTokenIdAvailable = sardineTokenId;
      if (available) break;
    }

    return [available, sardineTokenIdAvailable, apiError];
  };

  const refreshUI = async (account, web3) => {
    let allowedAddresses = [
      "0xe2c135274428FF8183946c3e46560Fa00353753A",
      "0xc18E78C0F67A09ee43007579018b2Db091116B4C",
      "0x903f0F7bBF9Ad74F50e58B5D32D2AcE3b358eA77",
      "0x1d5328290a2b3aE314D96c8c79f204A399206Dd7",
    ];
    if (
      allowedAddresses
        .map((a) => a.toLowerCase())
        .includes(account.toLowerCase())
    ) {
    } else {
      alert("Not allowed");
      return;
    }

    getNftIdsAvailable(bastardPenguinsAddress).then((ids) => {
      console.log("ids ", ids);

      setTokenIds(ids);
      getPenguinImages(ids).then(setImages);
      getMetadataPenguins(ids).then(setMetadatas);
    });

    setWalletConnected(true);
    setConnectButtonText(shortAddress(account));

    // const [available, sardineTokenIdAvailable, apiError] = await checkSardinesAvailable(account);
    // if (available) alert(`Congrats. Your Sardine#${sardineTokenIdAvailable} Available for Penguin Merge`);
    // else if (!available && !apiError) alert("Oops. Sardine not available for Penguin Merge");
  };

  const handleConnectWallet = async () => {
    _doThis(refreshUI, true);
  };

  useEffect(() => {
    // _doThis(refreshUI, false);
    IPFS.create().then(setIpfs);
  }, []);

  // useEffect(() => {
  //   console.log(`trait1: ${trait1}`);
  //   console.log(`trait2: ${trait2}`);
  // }, [trait1, trait2, trait3, trait4, trait5, trait6, trait7]);

  // setInterval(someWork, 2000);
  // someWork();

  return (
    <>
      {/* <div id="particles">
        <Particles params={ParticleConfig} />
      </div> */}
      <div className="Bg-forge"></div>
      <div className="screen-divider">
        <div className="screen-divider-1-by-3">
          <div className="inside-screen-divider-1-by-3">
            <h1 className="header-forge">Penguins</h1>
            <button id="head-button1" onClick={handleConnectWallet}>
              {connectButtonText}
            </button>

            <h1 className="header-forge1">
              {walletConnected
                ? tokenIds
                  ? `Your Penguins: ${tokenIds.length}`
                  : "Loading Token Ids"
                : "Connect Wallet"}
            </h1>
            {selectedPenguin1 && (
              <button
                id="head-button1"
                style={{ marginTop: "-1rem" }}
                onClick={() => {
                  setSelectedPenguin1(null);
                  setSelectedPenguin2(null);
                  setSelectedPenguin1i(null);
                  setSelectedPenguin2i(null);
                  setMetadata1(null);
                  setMetadata2(null);

                  setBackground(empty);
                  setSkin(empty);
                  setEyes(empty);
                  setHat(empty);
                  setMouth(empty);
                  setOutfit(empty);
                  setAccessories(empty);

                  setB64(empty);
                  setMergedPenguinObj(null);
                  setTokenToBurn(null);
                  setSelectedTrait1(null);
                  setSelectedTrait2(null);
                  setSelectedTrait3(null);
                  setSelectedTrait4(null);
                  setSelectedTrait5(null);
                  setSelectedTrait6(null);
                  setSelectedTrait7(null);
                  setTrait1(null);
                  setTrait2(null);
                  setTrait3(null);
                  setTrait4(null);
                  setTrait5(null);
                  setTrait6(null);
                  setTrait7(null);
                }}
              >
                Clear Selected Tokens
              </button>
            )}
            {walletConnected && (
              <div className="good-class ">
                {tokenIds &&
                  images &&
                  tokenIds.map((tokenId, i) => (
                    <img
                      key={i}
                      src={images[tokenId]}
                      className={
                        "tokens-list " +
                        getCssSelectedToken(
                          tokenId,
                          selectedPenguin1,
                          selectedPenguin2
                        )
                      }
                      onClick={async () => {
                        // do not select a penguin again
                        if (selectedPenguin1 && selectedPenguin1 === tokenId)
                          return;

                        if (selectedPenguin2) {
                          if (mergedPenguinsSzn1["_" + tokenId]) {
                            alert("Already used in SZN1");
                            return;
                          }

                          setBackground(empty);
                          setSkin(empty);
                          setEyes(empty);
                          setHat(empty);
                          setMouth(empty);
                          setOutfit(empty);
                          setAccessories(empty);

                          setB64(empty);
                          setMergedPenguinObj(null);
                          setTokenToBurn(null);
                          setSelectedTrait1(null);
                          setSelectedTrait2(null);
                          setSelectedTrait3(null);
                          setSelectedTrait4(null);
                          setSelectedTrait5(null);
                          setSelectedTrait6(null);
                          setSelectedTrait7(null);
                          setTrait1(null);
                          setTrait2(null);
                          setTrait3(null);
                          setTrait4(null);
                          setTrait5(null);
                          setTrait6(null);
                          setTrait7(null);
                        }

                        let penguinAvailable = (
                          await axios.get(
                            `${api}/is-penguin-available/${tokenId}`
                          )
                        ).data.success;

                        if (!penguinAvailable) {
                          alert(
                            "This penguin is used in Merging. Just wait for the update of metadata on OpenSea."
                          );
                          return;
                        }

                        // if token 1 is selected then get metadata for token 2
                        // if token 1 is selected then show img in 2nd cell
                        if (selectedPenguin1) {
                          if (mergedPenguinsSzn1["_" + tokenId]) {
                            alert("Already used in SZN1");
                            return;
                          }

                          setSelectedPenguin2(tokenId);
                          setSelectedPenguin2i(i);
                          setMetadata2(metadatas[tokenId]);
                        } else {
                          if (mergedPenguinsSzn1["_" + tokenId]) {
                            alert("Already used in SZN1");
                            return;
                          }

                          setSelectedPenguin1(tokenId);
                          setSelectedPenguin1i(i);
                          setMetadata1(metadatas[tokenId]);
                        }
                      }}
                    />
                  ))}
              </div>
            )}
          </div>
        </div>

        <div className="screen-divider-2-by-3">
          <div className="inside-screen-divider-2-by-3">
            <h1 className="header-forge">The Merge</h1>

            <h3 className="header-forge2">Choose Penguins Start Merge</h3>

            <div
              className="selected-img-list"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "100%",
                alignItems: "center",
              }}
            >
              {selectedPenguin1 && (
                <img src={images[selectedPenguin1]} className="chosen-image" />
              )}
              {selectedPenguin2 && (
                <img src={images[selectedPenguin2]} className="chosen-image" />
              )}
            </div>

            {selectedPenguin1 && selectedPenguin2 && (
              <img
                src={b64}
                style={{
                  height: "305px",
                  width: "305px",
                  marginTop: "10px",
                  border: "7px solid black",
                  borderRadius: 13,
                }}
              />
            )}
            {selectedPenguin2 && (
              <button
                id="head-button1"
                style={{ marginTop: 20 }}
                onClick={() => {
                  setLoading(true);
                  _doThis(async (from, web3) => {
                    // pre reqs start
                    const [success, sardineTokenIdAvailable] =
                      await checkSardinesAvailable(from);

                    // if (!success) {
                    //  setLoading(false);
                    //  alert("Oops. Sardine not available for Penguin Merge");
                    //   return;
                    //  }

                    let penguinAvailable1 = (
                      await axios.get(
                        `${api}/is-penguin-available/${selectedPenguin1}`
                      )
                    ).data.success;

                    let penguinAvailable2 = (
                      await axios.get(
                        `${api}/is-penguin-available/${selectedPenguin2}`
                      )
                    ).data.success;

                    if (!penguinAvailable1) {
                      setLoading(false);
                      alert("Oops. Left Penguin Already used for Merge");
                      return;
                    }

                    if (!penguinAvailable2) {
                      setLoading(false);
                      alert("Oops. Right Penguin Already used for Merge");
                      return;
                    }

                    if (!tokenToBurn) {
                      setLoading(false);
                      alert("Select token to burn");
                      return;
                    }

                    if (background === empty) {
                      setLoading(false);
                      alert("Select background");
                      return;
                    }
                    if (eyes === empty) {
                      setLoading(false);
                      alert("Select eyes");
                      return;
                    }
                    if (skin === empty) {
                      setLoading(false);
                      alert("Select skin");
                      return;
                    }
                    if (mouth === empty) {
                      setLoading(false);
                      alert("Select mouth");
                      return;
                    }

                    // specialTraitsUsed
                    let stu = 0;

                    trait1 !== "Select" &&
                      specialAccessories.includes(trait1) &&
                      stu++;
                    trait2 !== "Select" &&
                      specialBackground.includes(trait2) &&
                      stu++;
                    trait3 !== "Select" &&
                      specialEyes.includes(trait3) &&
                      stu++;
                    trait4 !== "Select" && specialHat.includes(trait4) && stu++;
                    trait5 !== "Select" &&
                      specialMouth.includes(trait5) &&
                      stu++;
                    trait6 !== "Select" &&
                      specialShirts.includes(trait6) &&
                      stu++;
                    trait7 !== "Select" &&
                      specialSkin.includes(trait7) &&
                      stu++;

                    const specialTraitsLimit = 2;

                    if (stu > specialTraitsLimit) {
                      setLoading(false);
                      alert(
                        `Only ${specialTraitsLimit} special traits allowed. Please select some simple traits to proceed`
                      );
                      return;
                    }
                    /*
                    trait1: Special Weapon
                    trait2: White
                    trait3: Light Eyes
                    trait4: Santa Hat
                    trait5: Red Mouth
                    trait6: Santa Suit
                    trait7: Peach
                    */
                    console.log(`trait1: ${trait1}`);
                    console.log(`trait1: ${trait2}`);
                    console.log(`trait1: ${trait3}`);
                    console.log(`trait1: ${trait4}`);
                    console.log(`trait1: ${trait5}`);
                    console.log(`trait1: ${trait6}`);
                    console.log(`trait1: ${trait7}`);
                    // }
                    // pre reqs end

                    const url = b64;
                    const res = await fetch(url);
                    const blob = await res.blob();

                    // const hash = await uploadIpfs(file, ipfs);
                    // const hash = 'abc';
                    // alert(hash);
                    const metadataStr = getMetadataFromObj(mergedPenguinObj);
                    console.log("metadataStr: ", metadataStr);
                    const meta2 = JSON.parse(metadataStr);

                    let metadata = {
                      // image: `ipfs://${hash}`,
                      ...meta2,
                      sardineTokenIdUsed: tokenToBurn,
                    };

                    // remove unwanted data
                    metadata.attributes = metadata.attributes.filter(
                      (attr) => attr.value.toLowerCase() !== "select"
                    );

                    console.log(
                      "added image metadata: ",
                      JSON.stringify(metadata, null, 4)
                    );

                    const file = new File([blob], "File name", {
                      type: "image/png",
                    });

                    // return;
                    const contract = getContractBastardPenguins(web3);
                    const method = contract.methods.burn(tokenToBurn);
                    let options = {
                      from,
                      gas: "0",
                    };
                    options = {
                      ...options,
                      gas:
                        "" +
                        Math.trunc(1.2 * (await method.estimateGas(options))),
                    };

                    try {
                      await method
                        .send(options)
                        .once("transactionHash", async () => {
                          // save data attempt 1
                          const zip = new JSZip();
                          zip.file(
                            "metadata.txt",
                            JSON.stringify(metadata, null, 4)
                          );
                          zip.file("image.png", file);
                          zip
                            .generateAsync({ type: "blob" })
                            .then((content) =>
                              saveAs(content, "Image_Metadata.zip")
                            );

                          // save data attempt 2
                          const a = await axios.post(`${api}/ninjas`, {
                            metadata,
                            JWT: process.env.REACT_APP_JWT,
                            image: b64,
                          });
                          console.log("a ", a);

                          // save data attempt 3
                          if (!a.data.success)
                            await axios.post(`${api}/error`, {
                              metadata,
                              JWT: process.env.REACT_APP_JWT,
                              image: b64,
                            });
                        })
                        .on("confirmation", (i) => {
                          if (i === 1) {
                            setLoading(false);
                            alert("Done");
                            window.location.reload();
                            // setLoading(false);
                          }
                        });
                    } catch (e) {
                      setLoading(false);
                      alert("Error");
                    }
                  });
                }}
              >
                {loading && (
                  <Spinner animation="border" size="sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                )}
                &nbsp; Merge &nbsp;
              </button>
            )}
          </div>
        </div>

        <div className="screen-divider-3-by-3">
          <div className="inside-screen-divider-3-by-3">
            <h1 className="header-forge">Personalization</h1>
            {metadata1 && metadata2 && (
              <div>
                <ButtonPair
                  title="Accessories"
                  button1Text={see(metadata1).Accessories}
                  button2Text={see(metadata2).Accessories}
                  setSelectedTrait={setSelectedTrait1}
                  selectedTrait={selectedTrait1}
                />
                <ButtonPair
                  title="Background"
                  button1Text={see(metadata1).Background}
                  button2Text={see(metadata2).Background}
                  setSelectedTrait={setSelectedTrait2}
                  selectedTrait={selectedTrait2}
                />
                <ButtonPair
                  title="Eyes"
                  button1Text={see(metadata1).Eyes}
                  button2Text={see(metadata2).Eyes}
                  setSelectedTrait={setSelectedTrait3}
                  selectedTrait={selectedTrait3}
                />
                <ButtonPair
                  title="Hat"
                  button1Text={see(metadata1).Hat}
                  button2Text={see(metadata2).Hat}
                  setSelectedTrait={setSelectedTrait4}
                  selectedTrait={selectedTrait4}
                />
                {/* <ButtonPair
                  title="Legends"
                  button1Text={see(metadata1).Legends}
                  button2Text={see(metadata2).Legends}
                /> */}
                <ButtonPair
                  title="Mouth"
                  button1Text={see(metadata1).Mouth}
                  button2Text={see(metadata2).Mouth}
                  setSelectedTrait={setSelectedTrait1}
                  selectedTrait={selectedTrait1}
                  setSelectedTrait={setSelectedTrait5}
                  selectedTrait={selectedTrait5}
                />
                <ButtonPair
                  title="Outfit"
                  button1Text={see(metadata1).Outfit}
                  button2Text={see(metadata2).Outfit}
                  setSelectedTrait={setSelectedTrait6}
                  selectedTrait={selectedTrait6}
                />
                <ButtonPair
                  title="Skin"
                  button1Text={see(metadata1).Skin}
                  button2Text={see(metadata2).Skin}
                  setSelectedTrait={setSelectedTrait7}
                  selectedTrait={selectedTrait7}
                />
                <ButtonPairTokenId
                  title="Burn"
                  button1Text={selectedPenguin1}
                  button2Text={selectedPenguin2}
                  setSelectedTrait={setSelectedTrait1}
                  selectedTrait={selectedTrait1}
                />
              </div>
            )}
          </div>
        </div>
        <div className="screen-divider-4-by-3">
          <div className="inside-screen-divider-4-by-3">
            <h1 className="header-forge">specialtraits</h1>
            <div>
              <SpecialList
                list={specialAccessories}
                setTrait={setTrait1}
                trait={"Accessories"}
                traitValue={trait1}
                setB64={setB64}
                background={background}
                setBackground={setBackground}
                skin={skin}
                setSkin={setSkin}
                eyes={eyes}
                setEyes={setEyes}
                hat={hat}
                setHat={setHat}
                mouth={mouth}
                setMouth={setMouth}
                outfit={outfit}
                setOutfit={setOutfit}
                accessories={accessories}
                setAccessories={setAccessories}
                setSelectedTrait1={setSelectedTrait1}
                setSelectedTrait2={setSelectedTrait2}
                setSelectedTrait3={setSelectedTrait3}
                setSelectedTrait4={setSelectedTrait4}
                setSelectedTrait5={setSelectedTrait5}
                setSelectedTrait6={setSelectedTrait6}
                setSelectedTrait7={setSelectedTrait7}
                setMergedPenguinObj={setMergedPenguinObj}
                mergedPenguinObj={mergedPenguinObj}
              />
              <SpecialList
                list={specialBackground}
                trait="Background"
                setTrait={setTrait2}
                traitValue={trait2}
                setB64={setB64}
                background={background}
                setBackground={setBackground}
                skin={skin}
                setSkin={setSkin}
                eyes={eyes}
                setEyes={setEyes}
                hat={hat}
                setHat={setHat}
                mouth={mouth}
                setMouth={setMouth}
                outfit={outfit}
                setOutfit={setOutfit}
                accessories={accessories}
                setAccessories={setAccessories}
                setSelectedTrait1={setSelectedTrait1}
                setSelectedTrait2={setSelectedTrait2}
                setSelectedTrait3={setSelectedTrait3}
                setSelectedTrait4={setSelectedTrait4}
                setSelectedTrait5={setSelectedTrait5}
                setSelectedTrait6={setSelectedTrait6}
                setSelectedTrait7={setSelectedTrait7}
                setMergedPenguinObj={setMergedPenguinObj}
                mergedPenguinObj={mergedPenguinObj}
              />
              <SpecialList
                list={specialEyes}
                trait="Eyes"
                setTrait={setTrait3}
                traitValue={trait3}
                setB64={setB64}
                background={background}
                setBackground={setBackground}
                skin={skin}
                setSkin={setSkin}
                eyes={eyes}
                setEyes={setEyes}
                hat={hat}
                setHat={setHat}
                mouth={mouth}
                setMouth={setMouth}
                outfit={outfit}
                setOutfit={setOutfit}
                accessories={accessories}
                setAccessories={setAccessories}
                setSelectedTrait1={setSelectedTrait1}
                setSelectedTrait2={setSelectedTrait2}
                setSelectedTrait3={setSelectedTrait3}
                setSelectedTrait4={setSelectedTrait4}
                setSelectedTrait5={setSelectedTrait5}
                setSelectedTrait6={setSelectedTrait6}
                setSelectedTrait7={setSelectedTrait7}
                setMergedPenguinObj={setMergedPenguinObj}
                mergedPenguinObj={mergedPenguinObj}
              />
              <SpecialList
                list={specialHat}
                trait="Hat"
                setTrait={setTrait4}
                traitValue={trait4}
                setB64={setB64}
                background={background}
                setBackground={setBackground}
                skin={skin}
                setSkin={setSkin}
                eyes={eyes}
                setEyes={setEyes}
                hat={hat}
                setHat={setHat}
                mouth={mouth}
                setMouth={setMouth}
                outfit={outfit}
                setOutfit={setOutfit}
                accessories={accessories}
                setAccessories={setAccessories}
                setSelectedTrait1={setSelectedTrait1}
                setSelectedTrait2={setSelectedTrait2}
                setSelectedTrait3={setSelectedTrait3}
                setSelectedTrait4={setSelectedTrait4}
                setSelectedTrait5={setSelectedTrait5}
                setSelectedTrait6={setSelectedTrait6}
                setSelectedTrait7={setSelectedTrait7}
                setMergedPenguinObj={setMergedPenguinObj}
                mergedPenguinObj={mergedPenguinObj}
              />
              <SpecialList
                list={specialMouth}
                trait="Mouth"
                setTrait={setTrait5}
                traitValue={trait5}
                setB64={setB64}
                background={background}
                setBackground={setBackground}
                skin={skin}
                setSkin={setSkin}
                eyes={eyes}
                setEyes={setEyes}
                hat={hat}
                setHat={setHat}
                mouth={mouth}
                setMouth={setMouth}
                outfit={outfit}
                setOutfit={setOutfit}
                accessories={accessories}
                setAccessories={setAccessories}
                setSelectedTrait1={setSelectedTrait1}
                setSelectedTrait2={setSelectedTrait2}
                setSelectedTrait3={setSelectedTrait3}
                setSelectedTrait4={setSelectedTrait4}
                setSelectedTrait5={setSelectedTrait5}
                setSelectedTrait6={setSelectedTrait6}
                setSelectedTrait7={setSelectedTrait7}
                setMergedPenguinObj={setMergedPenguinObj}
                mergedPenguinObj={mergedPenguinObj}
              />
              <SpecialList
                list={specialShirts}
                trait="Outfit"
                setTrait={setTrait6}
                traitValue={trait6}
                setB64={setB64}
                background={background}
                setBackground={setBackground}
                skin={skin}
                setSkin={setSkin}
                eyes={eyes}
                setEyes={setEyes}
                hat={hat}
                setHat={setHat}
                mouth={mouth}
                setMouth={setMouth}
                outfit={outfit}
                setOutfit={setOutfit}
                accessories={accessories}
                setAccessories={setAccessories}
                setSelectedTrait1={setSelectedTrait1}
                setSelectedTrait2={setSelectedTrait2}
                setSelectedTrait3={setSelectedTrait3}
                setSelectedTrait4={setSelectedTrait4}
                setSelectedTrait5={setSelectedTrait5}
                setSelectedTrait6={setSelectedTrait6}
                setSelectedTrait7={setSelectedTrait7}
                setMergedPenguinObj={setMergedPenguinObj}
                mergedPenguinObj={mergedPenguinObj}
              />
              <SpecialList
                list={specialSkin}
                trait="Skin"
                setTrait={setTrait7}
                traitValue={trait7}
                setB64={setB64}
                background={background}
                setBackground={setBackground}
                skin={skin}
                setSkin={setSkin}
                eyes={eyes}
                setEyes={setEyes}
                hat={hat}
                setHat={setHat}
                mouth={mouth}
                setMouth={setMouth}
                outfit={outfit}
                setOutfit={setOutfit}
                accessories={accessories}
                setAccessories={setAccessories}
                setSelectedTrait1={setSelectedTrait1}
                setSelectedTrait2={setSelectedTrait2}
                setSelectedTrait3={setSelectedTrait3}
                setSelectedTrait4={setSelectedTrait4}
                setSelectedTrait5={setSelectedTrait5}
                setSelectedTrait6={setSelectedTrait6}
                setSelectedTrait7={setSelectedTrait7}
                setMergedPenguinObj={setMergedPenguinObj}
                mergedPenguinObj={mergedPenguinObj}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forge;
