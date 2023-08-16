// export const toBase64 = file => new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = reject;
// });

//  export const UPLOAD_IMAGE = async(image) => {
//     const data = new FormData();
//     data.append("file", image);
//     data.append("upload_preset", "ml_default");
//     data.append("cloud_name", "defgcz4oj");
//     let response;
//     response = await fetch("https://api.cloudinary.com/v1_1/defgcz4oj/image/upload", {
//         method:'POST',
//         body:data
//     });
//     const imageUrl = response?.data?.url || false;

//     return imageUrl;
// }
  
export const b64toBlob = async (base64) => 
    await fetch(`data:image/jpeg;base64,${base64}`).then(res => res.blob())
