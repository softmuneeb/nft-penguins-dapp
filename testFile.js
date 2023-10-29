const seeIds = (ids) => (ids.map((id) => `token_ids=${id}&`)).join('');

console.log(([1, 2, 3].includes(5)));

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
// add fi to img
export const getTraitsLink = (folderName, traitName) => {
  // console.log(window.location, "tag11");

  return `${window.location.origin}/normal_traits/${folderName}/${traitName}.png`;
};

<img
  src={b64}
  style={{
    height: "305px",
    width: "305px",
    marginTop: "10px",
    border: "7px solid black",
    borderRadius: 13,
  }}
/>;