import mergeImages from "merge-images";
import { fi } from "../libs/smart-contract";
import empty from "./empty600px.png";

const explorer = "https://gateway.pinata.cloud/ipfs/";
// const explorer = 'https://goatz.mypinata.cloud/ipfs/';
// const explorer = 'https://ipfs.io/ipfs/';

export const mergeImage = async ({
  specialTraitsMerge = false,
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
}) => {
  const img = specialTraitsMerge
    ? await getSpecialImage(trait, traitValue)
    : await getImage(trait, traitValue);

  switch (trait) {
    case "Accessories":
      setAccessories(img);
      setB64(
        await mergeImages([background, skin, eyes, mouth, hat, outfit, img])
      );
      break;
    case "Background":
      setBackground(img);
      setB64(
        await mergeImages([img, skin, eyes, mouth, hat, outfit, accessories])
      );
      break;
    case "Skin":
      setSkin(img);
      setB64(
        await mergeImages([
          background,
          img,
          eyes,
          mouth,
          hat,
          outfit,
          accessories,
        ])
      );
      break;
    case "Outfit":
      setOutfit(img);
      setB64(
        await mergeImages([
          background,
          skin,
          eyes,
          mouth,
          hat,
          img,
          accessories,
        ])
      );
      break;
    case "Eyes":
      setEyes(img);
      setB64(
        await mergeImages([
          background,
          skin,
          img,
          mouth,
          hat,
          outfit,
          accessories,
        ])
      );
      break;
    case "Mouth":
      setMouth(img);
      setB64(
        await mergeImages([
          background,
          skin,
          eyes,
          img,
          hat,
          outfit,
          accessories,
        ])
      );
      break;
    case "Hat":
      setHat(img);
      setB64(
        await mergeImages([
          background,
          skin,
          eyes,
          mouth,
          img,
          outfit,
          accessories,
        ])
      );
      break;
  }
};

export const getTraitsLink = (folderName, traitName) => {
  // console.log(window.location, "tag11");

  return `${window.location.origin}/normal_traits/${folderName}/${traitName}.png`;
};

export const getSpecialTraitsLink = (folderName, traitName) => {
  // console.log(window.location, "tag12");
  return `${window.location.origin}/SZN2_traits/${folderName}/${traitName}.png`;
};

export const getSpecialImage = async (folder, file) => {
  if (file.toLowerCase() === "select") return empty;

  try {
    const laser = await fetch(getSpecialTraitsLink(folder, file));
    const img = URL.createObjectURL(await laser.blob());
    return img;
  } catch (e) {
    return empty;
  }
};
export const getImage = async (folder, file) => {
  if (!file || file === undefined || file.toLowerCase() === "select")
    return empty;

  try {
    const laser = await fetch(getTraitsLink(folder, file));
    const img = URL.createObjectURL(await laser.blob());
    return img;
  } catch (e) {
    return empty;
  }
};

export const getImageLink = (tokenId) =>
  tokenId
    ? `${explorer}QmQWEJcvfEZnQuGzHTRgZuF2bFcRc341Sjs7Aa99dKDexm/${
        Number(tokenId) + fi
      }.png`
    : " ";

export const getMetadataLink = (tokenId) =>
  `${explorer}QmRuumBjcTpFoSChmHyqeXm7NTLg6Y9awBHxTZyjjMmnjb/${
    Number(tokenId) + fi
  }`;
