import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { unstakeManyNft } from "../libs/api";
import { bastardPenguinsAddress } from "../libs/smart-contract";
const Unstake = ({ tokenId, src, nft, setStakeList, stakeList }) => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <>
      <div className="adjust-img1">
        <p className="tokenId1">#{tokenId}</p>
        <img src={src} className={selected ? "img-select1" : "img-select"} />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: 198,
            maxWidth: 198,
          }}
        >
          <button
            disabled={loading ? true : false}
            id={loading ? "head-button2" : "head-button3"}
            style={{ width: "-webkit-fill-available" }}
            onClick={() => {
              if (!selected) {
                setStakeList([...stakeList, tokenId]);
              } else {
                setStakeList(stakeList.filter((id) => id !== tokenId));
              }
              setSelected(!selected);
              // unstakeManyNft(
              //   (loading) => {
              //     if (!loading) {
              //       window.location.reload();
              //     }
              //     setLoading(loading);
              //   },
              //   nft,
              //   [tokenId],
              // );
            }}
          >
            {loading && (
              <Spinner animation="border" size="sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
            &nbsp; Staked
          </button>
        </div>
        <div style={{ marginTop: 50 }}></div>
      </div>
    </>
  );
};

export default Unstake;
