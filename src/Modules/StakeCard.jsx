import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import {
  approveStakingContract, stakeManyNft
} from "../libs/api";

const StakeCard = ({
  tokenId,
  src,
  isApprovedForAll,
  nft,
  setStakeList,
  stakeList,
}) => {
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(false);
  return (
    <div>
      <div className={isApprovedForAll ? "adjust-img1" : "adjust-img1"}>
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
          {isApprovedForAll && (
            <button
              id={loading ? "head-button2" : "head-button1"}
              disabled={loading ? true : false}
              style={{ width: "-webkit-fill-available" }}
              onClick={() => {
                console.log("aoa");

                if (!selected) {
                  setStakeList([...stakeList, tokenId]);
                } else {
                  setStakeList(stakeList.filter((id) => id !== tokenId));
                }
                setSelected(!selected);
                // stakeManyNft(
                //   (loading) => {
                //     setLoading(loading);
                //     if (!loading) window.location.reload();
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
              &nbsp; Unstaked
            </button>
          )}
          {!isApprovedForAll && (
            <button
              id="head-button1"
              onClick={() => {
                approveStakingContract((loading) => {
                  setLoading(loading);
                  if (!loading) window.location.reload();
                }, nft);
              }}
              style={{ width: "100%" }}
            >
              {loading && (
                <Spinner animation="border" size="sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
              Approve
            </button>
          )}
        </div>

        <div style={{ marginTop: 50 }}></div>
      </div>
    </div>
  );
};

export default StakeCard;
