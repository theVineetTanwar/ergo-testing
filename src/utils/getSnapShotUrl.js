export const getSnapShotUrl = async () => {
  let player = threekit.player.enableApi("player");

  let scenceInstanceId = await player.api.player.getAssetInstance({
    id: player.api.instanceId,
    plug: "Proxy",
    property: "asset",
  });

  let cameraId = player.api.scene.findNode({
    from: scenceInstanceId,
    name: "SnapShot",
  });

  let base64Img = await player.api.snapshotAsync({
    cameraId: cameraId,
    size: { height: 600, width: 600 },
  });

  // Getting Blob from base64 then converting it to file
  let imgBlob = await fetch(base64Img)
    .then((res) => res.blob())
    .then((res) => {
      return res;
    });

  // Saving file to configuration

  const imgFile = new File([imgBlob], "thumbnail.png");

  let myHeaders = new Headers();
  let variant = {
    ExampleVariantField1: "ExampleValue1",
  };
  let formdata = new FormData();
  formdata.append("files", imgFile);
  formdata.append("orgId", process.env.THREEKIT_ORG_ID);
  formdata.append("productId", process.env.THREEKIT_ASSET_ID);
  formdata.append("productVersion", "snapshot1.0");
  formdata.append("variant", JSON.stringify(variant));

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  let response = await fetch(
    "https://preview.threekit.com/api/configurations?bearer_token=" + process.env.THREEKIT_AUTH_TOKEN,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      return JSON.parse(result);
    })
    .catch((error) => console.log("error", error));
  // console.log(response);

  let finalUrl =
    `https://preview.threekit.com/api/files/hash/` + response.thumbnail;
  return finalUrl;
}