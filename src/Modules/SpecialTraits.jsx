import React, { useEffect, useState } from "react";
import { DropdownButton, Dropdown } from "react-bootstrap";
import { mergeImage } from "./merge";

export const SpecialList = ({
  specialTraitsLimit,
  specialTraitsUsed,
  setSpecialTraitsUsed,

  list,
  setTrait,
  trait,
  traitValue,
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
  setSelectedTrait1,
  setSelectedTrait2,
  setSelectedTrait3,
  setSelectedTrait4,
  setSelectedTrait5,
  setSelectedTrait6,
  setSelectedTrait7,
  mergedPenguinObj,
  setMergedPenguinObj,
}) => {
  // const [a] = useState()

  return (
    <div>
      <h3
        style={{
          color: "black",
          lineHeight: "2rem",
          fontSize: 17,
          marginLeft: 5,
          fontFamily: "'Press Start 2P'",
        }}
      >
        {trait}
      </h3>

      <DropdownButton
        id="dropdown-basic-button"
        title={traitValue ? traitValue : "Select"}
      >
        {list.map((item) => (
          <Dropdown.Item
            onClick={() => {
              setTrait(item);

              switch (trait) {
                case "Accessories":
                  setSelectedTrait1(null);
                  break;
                case "Background":
                  setSelectedTrait2(null);
                  break;
                case "Skin":
                  setSelectedTrait7(null);
                  break;
                case "Outfit":
                  setSelectedTrait6(null);
                  break;
                case "Eyes":
                  setSelectedTrait3(null);
                  break;
                case "Mouth":
                  setSelectedTrait5(null);
                  break;
                case "Hat":
                  setSelectedTrait4(null);
                  break;
              }
              // making image on UI
              mergeImage({
                specialTraitsMerge: true,
                trait,
                traitValue: item,
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

              // managing metadata
              const copy = { ...mergedPenguinObj };
              copy[trait] = item;
              setMergedPenguinObj(copy);
            }}
          >
            {item}
          </Dropdown.Item>
          // <Dropdown.Item onClick={setTrait(p.list[0])}>
          // {p.list[0]}
          // </Dropdown.Item>
        ))}
      </DropdownButton>
      <div style={{ marginTop: 15  }}></div>
    </div>
  );
};
