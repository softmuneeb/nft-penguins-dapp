import {
  getContractNftStaking,
  getContractBastardPenguins,
  nftStakingAddress,
  comicsAddress,
  bastardPenguinsAddress,
  fi,
  openSeaApi,
  getContractSardinesGang,
  gasFactor,
  getContractIgloo,
  getContractComics,
} from "./smart-contract";
import { _doThis } from "./utils";
import pkg from "web3-utils";
// import empty from "../Modules/empty600px.png";
// import axios from "axios";

const { isAddress, toWei, fromWei } = pkg;
export const maxUint256 =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";
export const stakeNft = async (setLoading, nftContract, tokenId) => {
  if (!isAddress(nftContract)) {
    alert("Invalid NFT Address");
    return;
  }

  setLoading(true);
  _doThis(async (account, web3) => {
    const nftBiding = getContractNftStaking({ web3 });
    const pid = await nftBiding.methods.getPidOfToken(nftContract).call();
    console.log({ pid, tokenId });
    if (pid === maxUint256) {
      alert("Staking not available for this Nft collection");
      return;
    }
    const method = nftBiding.methods.depositMany(pid, tokenId);
    let options = {
      from: account,
      gas: "0",
      value: 0,
    };
    try {
      const expGas = await method.estimateGas(options);
      const estimateGas = Math.trunc(gasFactor * expGas);

      // const gasInfo = (
      //   await axios.get("https://ethgasstation.info/json/ethgasAPI.json")
      // ).data;
      // // console.log(gasPrice.safeLowWait, gasPrice.safeLow);

      // alert(
      //   `Expected Transaction Fee is ${
      //     expGas * gasInfo.safeLow
      //   } ETH and Expected Wait is ${gasInfo.safeLowWait} minutes.`,
      // );

      options = {
        ...options,
        gas: "" + estimateGas,
        // gasPrice: gasInfo.safeLow, // slow, fast
      };
    } catch (e) {
      let msg = null;

      try {
        console.log(e.message);
        let a = e.message;
        let objStr = a.substring(a.indexOf("{"), a.lastIndexOf("}") + 1);
        // console.log({ objStr });
        msg =
          JSON.parse(objStr).message ||
          JSON.parse(objStr).originalError.message;
        msg = msg.replace("err: ", "");
        msg = msg.replace("execution reverted: ", "");
      } catch (eiii) {}

      if (!msg || msg === undefined) {
        msg = "Insufficient funds or some data error";
      }

      // special thing
      if (msg === "you are not owner") msg = "this nft is already staked";
      if (msg === "ERC721: transfer of token that is not own")
        msg = "this nft is already staked";

      setLoading(false);
    }

    try {
      await method.send(options).on("confirmation", (i) => {
        //here
        if (i === 0) {
          setLoading(false);
          alert("done");
        }
      });
    } catch (e) {
      setLoading(false);
      alert(e.message);
    }
  });
};

export const stakeManyNft = async (setLoading, nftContract, tokenIds) => {
  if (!isAddress(nftContract)) {
    alert("Invalid NFT Address");
    return;
  }

  setLoading(true);
  _doThis(async (account, web3) => {
    const nftBiding = getContractNftStaking({ web3 });
    let pid = await nftBiding.methods.getPidOfToken(nftContract).call();

    console.log({ pid, tokenIds });
    if (pid === maxUint256) {
      alert("Staking not available for this Nft collection");
      setLoading(false);
      return;
    }
    const method = nftBiding.methods.depositMany(pid, tokenIds);
    let options = {
      from: account,
      gas: "0",
      value: 0,
    };
    try {
      const estimateGas = Math.trunc(
        gasFactor * (await method.estimateGas(options))
      );
      options = {
        ...options,
        gas: "" + estimateGas,
      };
    } catch (e) {
      let msg = null;

      try {
        console.log(e.message);
        let a = e.message;
        let objStr = a.substring(a.indexOf("{"), a.lastIndexOf("}") + 1);
        // console.log({ objStr });
        msg =
          JSON.parse(objStr).message ||
          JSON.parse(objStr).originalError.message;
        msg = msg.replace("err: ", "");
        msg = msg.replace("execution reverted: ", "");
      } catch (eiii) {}

      if (!msg || msg === undefined) {
        msg = "Insufficient funds or some data error";
      }

      // special thing
      if (msg === "you are not owner") msg = "this nft is already staked";
      if (msg === "ERC721: transfer of token that is not own")
        msg = "this nft is already staked";

      setLoading(false);
    }

    try {
      await method.send(options).on("confirmation", (i) => {
        //here
        if (i === 0) {
          setLoading(false);
          alert("done");
        }
      });
    } catch (e) {
      setLoading(false);
      alert(e.message);
    }
  });
};

export const stakeManyNftCollections = async (
  setLoading,
  arrNftContract,
  arrTokenIds
) => {
  setLoading(true);
  _doThis(async (account, web3) => {
    const nftBiding = getContractNftStaking({ web3 });

    let pids = [];
    for (let i = 0; i < arrNftContract.length; i++) {
      const nftContract = arrNftContract[i];

      if (!isAddress(nftContract)) {
        alert("Invalid NFT Address");
        setLoading(false);
        return;
      }

      let pid = await nftBiding.methods.getPidOfToken(nftContract).call();

      if (pid === maxUint256) {
        alert("Staking not available for this Nft collection");
        setLoading(false);
        return;
      }

      pids.push([pid, arrTokenIds[i]]);
    }

    const method = nftBiding.methods.depositInManyPids(pids);
    let options = {
      from: account,
      gas: "0",
      value: 0,
    };
    try {
      const estimateGas = Math.trunc(
        gasFactor * (await method.estimateGas(options))
      );
      options = {
        ...options,
        gas: "" + estimateGas,
      };
    } catch (e) {
      let msg = null;

      try {
        console.log(e.message);
        let a = e.message;
        let objStr = a.substring(a.indexOf("{"), a.lastIndexOf("}") + 1);
        // console.log({ objStr });
        msg =
          JSON.parse(objStr).message ||
          JSON.parse(objStr).originalError.message;
        msg = msg.replace("err: ", "");
        msg = msg.replace("execution reverted: ", "");
      } catch (eiii) {}

      if (!msg || msg === undefined) {
        msg = "Insufficient funds or some data error";
      }

      // special thing
      if (msg === "you are not owner") msg = "this nft is already staked";
      if (msg === "ERC721: transfer of token that is not own")
        msg = "this nft is already staked";

      setLoading(false);
    }

    try {
      await method.send(options).on("confirmation", (i) => {
        //here
        if (i === 0) {
          setLoading(false);
          alert("done");
        }
      });
    } catch (e) {
      setLoading(false);
      alert(e.message);
    }
  });
};

export const unstakeManyNftCollections = async (
  setLoading,
  arrNftContract,
  arrTokenIds
) => {
  setLoading(true);
  _doThis(async (account, web3) => {
    const nftBiding = getContractNftStaking({ web3 });

    let pids = [];
    for (let i = 0; i < arrNftContract.length; i++) {
      const nftContract = arrNftContract[i];

      if (!isAddress(nftContract)) {
        alert("Invalid NFT Address");
        return;
      }

      let pid = await nftBiding.methods.getPidOfToken(nftContract).call();

      if (pid === maxUint256) {
        alert("Staking not available for this Nft collection");
        setLoading(false);
        return;
      }

      pids.push([pid, arrTokenIds[i]]);
    }

    const method = nftBiding.methods.withdrawInManyPids(pids);
    let options = {
      from: account,
      gas: "0",
      value: 0,
    };
    try {
      const estimateGas = Math.trunc(
        gasFactor * (await method.estimateGas(options))
      );
      options = {
        ...options,
        gas: "" + estimateGas,
      };
    } catch (e) {
      let msg = null;

      try {
        console.log(e.message);
        let a = e.message;
        let objStr = a.substring(a.indexOf("{"), a.lastIndexOf("}") + 1);
        // console.log({ objStr });
        msg =
          JSON.parse(objStr).message ||
          JSON.parse(objStr).originalError.message;
        msg = msg.replace("err: ", "");
        msg = msg.replace("execution reverted: ", "");
      } catch (eiii) {}

      if (!msg || msg === undefined) {
        msg = "Insufficient funds or some data error";
      }

      // special thing
      if (msg === "you are not owner") msg = "some nft is not staked";
      if (msg === "ERC721: transfer of token that is not own")
        msg = "some nft is already staked";

      setLoading(false);
    }

    try {
      await method.send(options).on("confirmation", (i) => {
        //here
        if (i === 0) {
          setLoading(false);
          alert("done");
        }
      });
    } catch (e) {
      setLoading(false);
      alert(e.message);
    }
  });
};

export const unstakeNft = async (setLoading, tokenId, nftContract) => {
  if (!isAddress(nftContract)) {
    alert("Invalid NFT Address");

    return;
  }

  setLoading(true);
  _doThis(async (account, web3) => {
    const nftBiding = getContractNftStaking({ web3 });
    const pid = await nftBiding.methods.getPidOfToken(nftContract).call();
    console.log({ pid, tokenId });
    if (pid === maxUint256) {
      setLoading(false);
      alert("Staking not available for this Nft collection");
      return;
    }
    const method = nftBiding.methods.withdraw(pid, tokenId);
    let options = {
      from: account,
      gas: "0",
      value: 0,
    };
    try {
      const estimateGas = Math.trunc(
        gasFactor * (await method.estimateGas(options))
      );
      options = {
        ...options,
        gas: "" + estimateGas,
      };
    } catch (e) {
      let msg = null;

      try {
        console.log(e.message);
        let a = e.message;
        let objStr = a.substring(a.indexOf("{"), a.lastIndexOf("}") + 1);
        // console.log({ objStr });
        msg =
          JSON.parse(objStr).message ||
          JSON.parse(objStr).originalError.message;
        msg = msg.replace("err: ", "");
        msg = msg.replace("execution reverted: ", "");
      } catch (eiii) {}

      if (!msg || msg === undefined) {
        msg = "Insufficient funds or some data error";
      }

      // special thing
      if (msg === "you are not owner") msg = "this nft is not staked";
      if (msg === "ERC721: transfer of token that is not own")
        msg = "this nft is not staked";

      setLoading(false);
    }

    try {
      await method.send(options).on("confirmation", (i) => {
        //here
        if (i === 0) {
          setLoading(false);
          alert("done");
        }
      });
    } catch (e) {
      setLoading(false);
      alert(e.message);
    }
  });
};

export const unstakeManyNft = async (setLoading, nftContract, tokenIds) => {
  if (!isAddress(nftContract)) {
    alert("Invalid NFT Address");
    setLoading(false);
    return;
  }

  setLoading(true);
  _doThis(async (account, web3) => {
    const nftBiding = getContractNftStaking({ web3 });
    const pid = await nftBiding.methods.getPidOfToken(nftContract).call();
    console.log({ pid, tokenIds });
    if (pid === maxUint256) {
      setLoading(false);
      alert("Staking not available for this Nft collection");
      return;
    }
    const method = nftBiding.methods.withdrawMany(pid, tokenIds);
    let options = {
      from: account,
      gas: "0",
      value: 0,
    };
    try {
      const estimateGas = Math.trunc(
        gasFactor * (await method.estimateGas(options))
      );
      options = {
        ...options,
        gas: "" + estimateGas,
      };
    } catch (e) {
      let msg = null;

      try {
        console.log(e.message);
        let a = e.message;
        let objStr = a.substring(a.indexOf("{"), a.lastIndexOf("}") + 1);
        // console.log({ objStr });
        msg =
          JSON.parse(objStr).message ||
          JSON.parse(objStr).originalError.message;
        msg = msg.replace("err: ", "");
        msg = msg.replace("execution reverted: ", "");
      } catch (eiii) {}

      if (!msg || msg === undefined) {
        msg = "Insufficient funds or some data error";
      }

      // special thing
      if (msg === "you are not owner") msg = "this nft is not staked";
      if (msg === "ERC721: transfer of token that is not own")
        msg = "this nft is not staked";

      setLoading(false);
    }

    try {
      await method.send(options).on("confirmation", (i) => {
        //here
        if (i === 0) {
          setLoading(false);
          alert("done");
        }
      });
    } catch (e) {
      setLoading(false);
      alert(e.message);
    }
  });
};

export const harvestNft = async (setLoading, nftContract, tokenIds) => {
  setLoading(true);
  _doThis(async (account, web3) => {
    const nftBiding = getContractNftStaking({ web3 });
    const pid = await nftBiding.methods.getPidOfToken(nftContract).call();
    if (pid === maxUint256) {
      alert("Staking not available for this Nft collection");
      return;
    }
    const method = nftBiding.methods.claimRewards(pid, tokenIds);
    let options = {
      from: account,
      gas: "0",
      value: 0,
    };
    try {
      const estimateGas = Math.trunc(
        gasFactor * (await method.estimateGas(options))
      );
      options = {
        ...options,
        gas: "" + estimateGas,
      };
    } catch (e) {
      let msg = null;

      try {
        console.log(e.message);
        let a = e.message;
        let objStr = a.substring(a.indexOf("{"), a.lastIndexOf("}") + 1);
        // console.log({ objStr });
        msg =
          JSON.parse(objStr).message ||
          JSON.parse(objStr).originalError.message;
        msg = msg.replace("err: ", "");
        msg = msg.replace("execution reverted: ", "");
      } catch (eiii) {}

      if (!msg || msg === undefined) {
        msg = "Insufficient funds or some data error";
      }

      // special thing
      if (msg === "you are not owner") msg = "this nft is not staked";
      if (msg === "ERC721: transfer of token that is not own")
        msg = "this nft is not staked";

      setLoading(false);
    }

    try {
      await method.send(options).on("confirmation", (i) => {
        //here
        if (i === 0) {
          setLoading(false);
          alert("done");
        }
      });
    } catch (e) {
      setLoading(false);
      alert(e.message);
    }
  });
};

export const approveStakingContract = async (setLoading, nftContract) => {
  if (!isAddress(nftContract)) {
    // alert('Invalid NFT Address');
    return;
  }
  setLoading(true);
  _doThis(async (account, web3) => {
    const nft = getContractBastardPenguins(web3, nftContract);
    const method = nft.methods.setApprovalForAll(nftStakingAddress, true);
    let options = {
      from: account,
      gas: "0",
    };
    try {
      const estimateGas = Math.trunc(
        gasFactor * (await method.estimateGas(options))
      );
      options = {
        ...options,
        gas: "" + estimateGas,
      };
    } catch (e) {
      let msg = null;

      try {
        console.log(e.message);
        let a = e.message;
        let objStr = a.substring(a.indexOf("{"), a.lastIndexOf("}") + 1);
        // console.log({ objStr });
        msg =
          JSON.parse(objStr).message ||
          JSON.parse(objStr).originalError.message;
        msg = msg.replace("err: ", "");
        msg = msg.replace("execution reverted: ", "");
      } catch (eiii) {}

      if (!msg || msg === undefined) {
        msg = "Insufficient funds or some data error";
      }

      // special thing
      //   if (msg === "you are not owner") msg = "this nft is not staked";
      //   if (msg === "ERC721: transfer of token that is not own")
      //     msg = "this nft is not staked";

      setLoading(false);
    }

    try {
      await method.send(options).on("confirmation", (i) => {
        if (i === 0) {
          setLoading(false);
          alert("done");
        }
      });
    } catch (e) {
      setLoading(false);
      alert(e.message);
    }
  });
};

export const approveComicsContract = async (setLoading, nftContract) => {
  console.log(" " + "ChekingLoading" + " " + nftContract);
  if (!isAddress(nftContract)) {
    // alert('Invalid NFT Address');
    return;
  }
  setLoading(true);
  _doThis(async (account, web3) => {
    const nft = getContractIgloo(web3, nftContract);
    const method = nft.methods.approve(comicsAddress, maxUint256);
    let options = {
      from: account,
      gas: "0",
    };
    try {
      const estimateGas = Math.trunc(
        gasFactor * (await method.estimateGas(options))
      );
      options = {
        ...options,
        gas: "" + estimateGas,
      };
    } catch (e) {
      let msg = null;

      try {
        console.log(e.message);
        let a = e.message;
        let objStr = a.substring(a.indexOf("{"), a.lastIndexOf("}") + 1);
        // console.log({ objStr });
        msg =
          JSON.parse(objStr).message ||
          JSON.parse(objStr).originalError.message;
        msg = msg.replace("err: ", "");
        msg = msg.replace("execution reverted: ", "");
      } catch (eiii) {}

      if (!msg || msg === undefined) {
        msg = "Insufficient funds or some data error";
      }

      // special thing
      //   if (msg === "you are not owner") msg = "this nft is not staked";
      //   if (msg === "ERC721: transfer of token that is not own")
      //     msg = "this nft is not staked";

      setLoading(false);
    }

    try {
      await method.send(options).on("confirmation", (i) => {
        if (i === 0) {
          setLoading(false);
          alert("done");
        }
      });
    } catch (e) {
      setLoading(false);
      alert(e.message);
    }
  });
};

//Read Contract
export const getIsApprovedForAll = async () => {
  return _doThis(
    async (account, web3) =>
      await getContractBastardPenguins(web3)
        .methods.isApprovedForAll(account, nftStakingAddress)
        .call()
  );
};

//Read Contract
export const getIsApprovedForAll2 = async () => {
  return _doThis(
    async (account, web3) =>
      await getContractSardinesGang(web3)
        .methods.isApprovedForAll(account, nftStakingAddress)
        .call()
  );
};

export const getIsApprovedForAll3 = async () => {
  return _doThis(
    async (account, web3) =>
      await getContractComics(web3)
        .methods.isApprovedForAll(account, nftStakingAddress)
        .call()
  );
};

export const getIsApprovedForAllComics = async () => {
  const approved = await _doThis(
    async (account, web3) =>
      await getContractIgloo(web3)
        .methods.allowance(account, comicsAddress)
        .call()
  );
  console.log({ approved });

  console.log({ approved: approved > 0 });

  return approved > 0;
};

const nonZero = (arr) => arr.filter((i) => i !== "0");

export const getNftIdsAvailable3 = async (nft) => {
  let walletOfOwner = await _doThis(async (account, web3) => {
    return await getContractComics(web3).methods.walletOfOwner(account).call();
  });

  // resAvailable = nonZero(resAvailable);
  console.log("walletOfOwner", walletOfOwner);
  return walletOfOwner;
};

export const getNftIdsAvailable = async (nft, max = 9999) => {
  let resAvailable = await _doThis(async (account, web3) => {
    return await getContractNftStaking({ web3 })
      .methods.GetNFTsForAddress(account, nft, 1, max, 50)
      .call();
  });

  resAvailable = nonZero(resAvailable);
  // console.log("resAvailable alternate", resAvailable);
  return resAvailable;
};

// export const getNftIdsAvailableAlternate = async (nft) => {
//   let resAvailable = await _doThis(async (account, web3) => {
//     return await getContractNftStaking({ web3 })
//       .methods.GetNFTsForAddress(account, nft, await getNftIdsOf(account), 50)
//       .call();
//   });

//   resAvailable = nonZero(resAvailable);
//   console.log("resAvailable ", resAvailable);
//   return resAvailable;
// };

export const getNftIdsStaked = async (pid) => {
  let resStaked = await _doThis(async (account, web3) => {
    return await getContractNftStaking({ web3 })
      .methods.depositsOf(pid, account)
      .call();
  });

  resStaked = nonZero(resStaked);
  console.log("pid", pid, "resStaked ", resStaked);
  return resStaked;
};

// export const getNftIdsOf = async (account) => {
//   // `${openSeaApi}/api/v1/asset/${bastardPenguinsAddress}/<token_id>/?force_update=true`
//   let url = `${openSeaApi}/api/v1/assets?owner=${account}&asset_contract_address=${bastardPenguinsAddress}&order_direction=asc&offset=0&limit=50`;
//   console.log("url ", url);

//   let a = await axios.get(url);
//   let tokenIds = a.data.assets.map((b) => b.token_id);
//   return tokenIds;
// };

export const getNftStakeReward = async (tokenIds, tokenIds2) => {
  if (!tokenIds || tokenIds === undefined) {
    console.log(1);
    return 0;
  }
  if (!tokenIds2 || tokenIds2 === undefined) {
    console.log(2);
    return 0;
  }

  let reward = await _doThis(
    async (account, web3) =>
      await getContractNftStaking({ web3 })
        .methods.pendingRewardToken(0, account, tokenIds)
        .call()
  );

  // hard coded
  let reward2 = await _doThis(
    async (account, web3) =>
      await getContractNftStaking({ web3 })
        .methods.pendingRewardToken(1, account, tokenIds2)
        .call()
  );

  // test
  // let reward3 = await _doThis(
  //   async (account) =>
  //     await contract.methods
  //       .pendingRewardTokenInManyPids(account, [
  //         [0, tokenIds],
  //         [1, tokenIds2],
  //       ])
  //       .call(),
  // );
  // console.log("reward3 ", JSON.stringify(reward3, null, 4));
  // test

  reward = reward.map((r) => Number(fromWei(r)));
  reward2 = reward2.map((r) => Number(fromWei(r)));

  // Getting sum of numbers
  let sum = reward.reduce((a, b) => a + b, 0);
  let sum2 = reward2.reduce((a, b) => a + b, 0);

  return sum + sum2;
};

export const truncNum = (n) => {
  const trNum = Number(Math.trunc(n * 10 ** 8) / 10 ** 8); // Round down to 2 fraction
  return trNum;
};

export const displayNum = (n) => {
  return (Math.trunc(n * 10000) / 10000).toLocaleString(undefined, {
    minimumFractionDigits: 4,
    maximumFractionDigits: 4,
  });
};

// utils

export const getPenguinImages = async (tokenIds) => {
  // add fi to img
  const getImageLink = (tokenId) => {
    return `${window.location.origin}/Bastard_Penguins/${
      (Number(tokenId) + fi) % 9999
    }.png`;
  };

  let images = {};
  for (let i = 0; i < tokenIds.length; i++) {
    images[tokenIds[i]] = URL.createObjectURL(
      await (await fetch(getImageLink(tokenIds[i]))).blob()
    );
  }

  return images;
};

export const getSardineImages = async (tokenIds) => {
  // add fi to img
  const getImageLink = (tokenId) => {
    return `${window.location.origin}/SG_batch1/${Number(tokenId)}.png`;
  };

  let images = {};
  for (let i = 0; i < tokenIds.length; i++) {
    images[tokenIds[i]] = URL.createObjectURL(
      await (await fetch(getImageLink(tokenIds[i]))).blob()
    );
  }

  return images;
};
export const getComicsImages = async (tokenIds) => {
  // add fi to img
  const getImageLink = (tokenId) => {
    return `${window.location.origin}/bpComicsGif.gif`;
  };

  let images = {};
  for (let i = 0; i < tokenIds.length; i++) {
    images[tokenIds[i]] = URL.createObjectURL(
      await (await fetch(getImageLink(tokenIds[i]))).blob()
    );
  }

  return images;
};

export const getMetadataPenguins = async (tokenIds) => {
  // add fi to img
  const getMetadataLink = (tokenId) =>
    `${window.location.origin}/Bastard_Penguins_metadata/${
      (Number(tokenId) + fi) % 9999
    }`;

  let metadatas = {};
  for (let i = 0; i < tokenIds.length; i++)
    metadatas[tokenIds[i]] = JSON.parse(
      await (await fetch(getMetadataLink(tokenIds[i]))).text()
    ).attributes;

  // console.log(JSON.parse(metadatas[tokenIds[1]]).attributes);

  return metadatas;
};

export const mergedPenguinsSzn1 = {
  // _165: true,
  _1027: true,
  _1036: true,
  _1053: true,
  _1101: true,
  _1135: true,
  _117: true,
  _1178: true,
  _1196: true,
  _1306: true,
  _1307: true,
  _1323: true,
  _1337: true,
  _1369: true,
  _1403: true,
  _142: true,
  _1448: true,
  _1456: true,
  _1469: true,
  _1517: true,
  _1584: true,
  _1593: true,
  _1595: true,
  _162: true,
  _1670: true,
  _1718: true,
  _1721: true,
  _1734: true,
  _1846: true,
  _191: true,
  _1915: true,
  _1943: true,
  _1944: true,
  _2004: true,
  _202: true,
  _2036: true,
  _2046: true,
  _2062: true,
  _2075: true,
  _2094: true,
  _2130: true,
  _218: true,
  _2191: true,
  _2202: true,
  _2206: true,
  _2212: true,
  _2238: true,
  _2285: true,
  _2293: true,
  _23: true,
  _2305: true,
  _2329: true,
  _2382: true,
  _2400: true,
  _2429: true,
  _2469: true,
  _254: true,
  _2553: true,
  _2586: true,
  _2615: true,
  _2629: true,
  _2651: true,
  _2678: true,
  _2680: true,
  _269: true,
  _2773: true,
  _2810: true,
  _282: true,
  _2848: true,
  _2965: true,
  _2973: true,
  _2974: true,
  _300: true,
  _3224: true,
  _3242: true,
  _3334: true,
  _3338: true,
  _3340: true,
  _3367: true,
  _3372: true,
  _3375: true,
  _3377: true,
  _338: true,
  _3389: true,
  _3423: true,
  _3470: true,
  _3516: true,
  _357: true,
  _359: true,
  _3656: true,
  _3671: true,
  _3676: true,
  _3683: true,
  _369: true,
  _3728: true,
  _3739: true,
  _3965: true,
  _4033: true,
  _4053: true,
  _4057: true,
  _4104: true,
  _4269: true,
  _4284: true,
  _4294: true,
  _4314: true,
  _4409: true,
  _4510: true,
  _4547: true,
  _4552: true,
  _4553: true,
  _4622: true,
  _4625: true,
  _4637: true,
  _4662: true,
  _4778: true,
  _4788: true,
  _4887: true,
  _493: true,
  _4943: true,
  _4968: true,
  _4992: true,
  _4999: true,
  _505: true,
  _5070: true,
  _5088: true,
  _5106: true,
  _5131: true,
  _5147: true,
  _5155: true,
  _5164: true,
  _5219: true,
  _5278: true,
  _5292: true,
  _5313: true,
  _5379: true,
  _5455: true,
  _5468: true,
  _5567: true,
  _5569: true,
  _5575: true,
  _558: true,
  _564: true,
  _565: true,
  _5691: true,
  _5696: true,
  _5730: true,
  _5807: true,
  _5813: true,
  _5869: true,
  _5878: true,
  _5881: true,
  _5915: true,
  _5940: true,
  _5975: true,
  _6: true,
  _6001: true,
  _6008: true,
  _6019: true,
  _6056: true,
  _606: true,
  _6090: true,
  _6098: true,
  _6140: true,
  _6141: true,
  _62: true,
  _6281: true,
  _6310: true,
  _6432: true,
  _6455: true,
  _6527: true,
  _654: true,
  _6638: true,
  _6666: true,
  _6676: true,
  _6701: true,
  _6792: true,
  _6903: true,
  _692: true,
  _701: true,
  _7068: true,
  _7096: true,
  _711: true,
  _7158: true,
  _7159: true,
  _7200: true,
  _7242: true,
  _7255: true,
  _7423: true,
  _7458: true,
  _7476: true,
  _749: true,
  _7559: true,
  _7595: true,
  _7600: true,
  _7601: true,
  _7602: true,
  _7622: true,
  _7632: true,
  _7665: true,
  _7673: true,
  _7697: true,
  _7841: true,
  _7887: true,
  _7946: true,
  _803: true,
  _8044: true,
  _8047: true,
  _806: true,
  _8099: true,
  _8108: true,
  _8126: true,
  _8222: true,
  _825: true,
  _829: true,
  _8327: true,
  _8332: true,
  _8371: true,
  _8382: true,
  _8415: true,
  _8426: true,
  _85: true,
  _8536: true,
  _8545: true,
  _8550: true,
  _8596: true,
  _8600: true,
  _8603: true,
  _8623: true,
  _864: true,
  _8693: true,
  _8711: true,
  _8719: true,
  _8723: true,
  _8737: true,
  _8771: true,
  _8778: true,
  _8810: true,
  _8819: true,
  _8877: true,
  _8938: true,
  _8942: true,
  _9013: true,
  _908: true,
  _9091: true,
  _9105: true,
  _9114: true,
  _9125: true,
  _9196: true,
  _923: true,
  _9293: true,
  _9301: true,
  _932: true,
  _9422: true,
  _9435: true,
  _9479: true,
  _949: true,
  _950: true,
  _9568: true,
  _957: true,
  _9585: true,
  _9601: true,
  _9664: true,
  _9716: true,
  _9771: true,
  _9844: true,
  _9850: true,
  _989: true,
  _9900: true,
  _994: true,
  _1945: true,
  _1037: true,
  _1043: true,
  _1044: true,
  _1085: true,
  _1133: true,
  _1171: true,
  _1180: true,
  _1190: true,
  _1228: true,
  _1282: true,
  _1285: true,
  _1304: true,
  _1308: true,
  _1343: true,
  _1387: true,
  _1402: true,
  _1411: true,
  _1428: true,
  _1429: true,
  _1436: true,
  _144: true,
  _1468: true,
  _1473: true,
  _1506: true,
  _1515: true,
  _1580: true,
  _1614: true,
  _1657: true,
  _1675: true,
  _1785: true,
  _1786: true,
  _1802: true,
  _1816: true,
  _1848: true,
  _1866: true,
  _1882: true,
  _1927: true,
  _1935: true,
  _1948: true,
  _196: true,
  _1996: true,
  _2063: true,
  _2072: true,
  _2074: true,
  _2149: true,
  _2197: true,
  _2200: true,
  _2213: true,
  _2325: true,
  _2394: true,
  _2422: true,
  _2423: true,
  _2483: true,
  _251: true,
  _2515: true,
  _2525: true,
  _2541: true,
  _2554: true,
  _2573: true,
  _2582: true,
  _2609: true,
  _2670: true,
  _2681: true,
  _2685: true,
  _2691: true,
  _2717: true,
  _2764: true,
  _2772: true,
  _2784: true,
  _28: true,
  _2808: true,
  _2861: true,
  _2879: true,
  _2908: true,
  _2948: true,
  _3032: true,
  _3065: true,
  _3074: true,
  _3094: true,
  _3108: true,
  _3130: true,
  _3157: true,
  _3159: true,
  _324: true,
  _3252: true,
  _3289: true,
  _330: true,
  _3327: true,
  _3444: true,
  _3452: true,
  _3453: true,
  _3703: true,
  _3721: true,
  _380: true,
  _3813: true,
  _3817: true,
  _3846: true,
  _3854: true,
  _3868: true,
  _3902: true,
  _3949: true,
  _3995: true,
  _4135: true,
  _4150: true,
  _4155: true,
  _4162: true,
  _4207: true,
  _4218: true,
  _4512: true,
  _4532: true,
  _4536: true,
  _4583: true,
  _4748: true,
  _4763: true,
  _4773: true,
  _4793: true,
  _48: true,
  _485: true,
  _4888: true,
  _4989: true,
  _502: true,
  _5026: true,
  _5031: true,
  _5032: true,
  _5101: true,
  _5104: true,
  _5116: true,
  _5141: true,
  _5257: true,
  _5267: true,
  _5282: true,
  _541: true,
  _5422: true,
  _5447: true,
  _5471: true,
  _5478: true,
  _5585: true,
  _5610: true,
  _5626: true,
  _5634: true,
  _5643: true,
  _5698: true,
  _5757: true,
  _5771: true,
  _5792: true,
  _5858: true,
  _5934: true,
  _5947: true,
  _596: true,
  _6046: true,
  _6054: true,
  _6170: true,
  _6175: true,
  _6209: true,
  _621: true,
  _6286: true,
  _6292: true,
  _6348: true,
  _6357: true,
  _6360: true,
  _6394: true,
  _641: true,
  _6419: true,
  _6454: true,
  _6480: true,
  _6487: true,
  _6498: true,
  _65: true,
  _6535: true,
  _6569: true,
  _6577: true,
  _6619: true,
  _6620: true,
  _670: true,
  _6760: true,
  _6789: true,
  _681: true,
  _6911: true,
  _6934: true,
  _697: true,
  _7006: true,
  _7117: true,
  _7145: true,
  _7155: true,
  _7180: true,
  _7271: true,
  _733: true,
  _7382: true,
  _748: true,
  _7485: true,
  _7547: true,
  _761: true,
  _7637: true,
  _7638: true,
  _7679: true,
  _7721: true,
  _7734: true,
  _779: true,
  _7902: true,
  _7937: true,
  _7955: true,
  _8038: true,
  _8074: true,
  _8079: true,
  _8080: true,
  _8081: true,
  _81: true,
  _8101: true,
  _8144: true,
  _8152: true,
  _817: true,
  _8176: true,
  _8320: true,
  _836: true,
  _8366: true,
  _838: true,
  _8425: true,
  _848: true,
  _8523: true,
  _8526: true,
  _8578: true,
  _8587: true,
  _8605: true,
  _8806: true,
  _8811: true,
  _8850: true,
  _8861: true,
  _8894: true,
  _8905: true,
  _9024: true,
  _9029: true,
  _9075: true,
  _9082: true,
  _9102: true,
  _9172: true,
  _9190: true,
  _9198: true,
  _9202: true,
  _9216: true,
  _9229: true,
  _9250: true,
  _9257: true,
  _9289: true,
  _9298: true,
  _9356: true,
  _9417: true,
  _9421: true,
  _9492: true,
  _9548: true,
  _9570: true,
  _9584: true,
  _9593: true,
  _9675: true,
  _972: true,
  _9768: true,
  _9772: true,
  _9780: true,
  _984: true,
  _9901: true,
  _9914: true,
  _9958: true,
};
