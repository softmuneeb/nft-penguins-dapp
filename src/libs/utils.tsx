import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";

import {
  bastardPenguinsAddress,
  fromBlock,
  getContractBastardPenguins,
  requiredChainId,
  requiredNetwork,
  toBlock,
} from "../libs/smart-contract";

export const _doThis = async (todo: any, prompt: any = true) => {
  const ethereum: any = await detectEthereumProvider();

  if (ethereum) {
    // copy pasted from below, improve later
    ethereum.on("accountsChanged", async (accounts: any) =>
      window.location.reload(),
    );

    if (prompt || (await ethereum.isConnected())) {
      const acc = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const chainId = await ethereum.request({
        method: "eth_chainId",
      });

      if (chainId === requiredChainId) {
        // setConnectButtonText("Connected: " + shortAddress(acc[0]));
        return todo(acc[0], new Web3(ethereum));
      } else {
        alert(
          "Please switch network to " +
            requiredNetwork +
            " current network id is " +
            chainId,
        );
        return false;
      }
    } else {
      return false;
    }
  } else {
    alert("Please install MetaMask!");
    return false;
  }
};
export const getUserAddr = async () => {
  return await _doThis(async (account: any) => account);
};
export const getBurnedIds = async () => {
  return await _doThis(async (account: any) => {
    const config = {
      fromBlock,
      toBlock,
      filter: {
        from: account,
        to: "0x0000000000000000000000000000000000000000",
      },
    };
    const selectedEvents = await getContractBastardPenguins().getPastEvents(
      "Transfer",
      config,
    );

    let idsBurned = [];
    for (let i = 0; i < selectedEvents.length && i < 20; i++) {
      const s = selectedEvents[i];
      idsBurned.push(s.returnValues.tokenId);
    }
    console.log("idsBurned ", idsBurned);
    return idsBurned;
  });
};

export const shortAddress = (_address: any) => {
  return (
    _address.substr(0, 4) +
    "****" +
    _address.substr(_address.length - 4, _address.length)
  );
};

export const _itemPrice = async () => {
  const provider: any = await detectEthereumProvider();
  if (provider) {
    const web3 = new Web3(provider);
    const acc = await provider.request({
      method: "eth_requestAccounts",
    });
    console.log("acc", acc);
    const itemPrice = getContractBastardPenguins();
    // console.log("presale", presale);

    const priceOfPenguins = await itemPrice.methods.itemPrice().call();
    console.log("priceOfPenguins", priceOfPenguins);
    //getContractPenguinsV2
    // const priceWei = await web3.utils.toWei(priceOfPenguins);
    // console.log('priceOfPenguins', priceWei);
    // console.log("listAddress", listAddress);
    return priceOfPenguins;
  }
};

export const _purchasePenguins = async (_howMany: any, setLoading: any) => {
  console.log("_howMany", _howMany);
  const provider: any = await detectEthereumProvider();
  if (provider) {
    const web3 = new Web3(provider);
    const acc = await provider.request({
      method: "eth_requestAccounts",
    });
    console.log("acc", acc);
    const priceOfPenguins = web3.utils.fromWei(await _itemPrice());
    // console.log('priceOfPenguins', web3.utils.fromWei(priceOfPenguins));

    const totalPrice = web3.utils.toWei(
      (Number(priceOfPenguins) * _howMany).toString(),
    );
    console.log("totalPrice", totalPrice);
    const penguinsContract = getContractBastardPenguins(web3);
    try {
      await penguinsContract.methods
        .purchaseGoats(_howMany)
        .send({
          from: (await web3.eth.getAccounts())[0],
          gas: 66859,
          gasPrice: web3.utils.toWei("0.00000001"),
          value: totalPrice,
        })
        .on("confirmation", (i: any) => {
          if (i === 0) {
            alert("Approved");
            setLoading(false);
          }
        });
    } catch (e: any) {
      // console.log(e.message);
      alert(e.message);
      setLoading(false);
    }
  }
};

const seeIds = (ids: any) =>
  ids.map((id: any) => `token_ids=${id}&`).join("");

// export const getNftInfoUrl = (ids: any) =>
//   `${openSeaApi}/api/v1/assets?asset_contract_address=${bastardPenguinsAddress}&order_direction=asc&${seeIds(
//     ids,
//   )}`;


