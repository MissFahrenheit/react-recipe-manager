export default async function uploadFile(file: File): Promise<string> {
  const cloudName: string | undefined = import.meta.env
    .VITE_CLOUDINARY_CLOUD_NAME
  const unsignedUploadPreset: string = import.meta.env
    .VITE_CLOUDINARY_UPLOAD_PRESET
    ? import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
    : ""

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`
  const fd = new FormData()
  fd.append("upload_preset", unsignedUploadPreset)
  fd.append("tags", "browser_upload") // Optional - add tags for image admin in Cloudinary
  fd.append("file", file)

  const response = await fetch(url, { method: "POST", body: fd })
  const data = await response.json()

  const secureUrl: string = data.secure_url
  // const tokens = secureUrl.split("/")
  // tokens.splice(-3, 0, "w_150,c_scale")
  // return tokens.join("/")

  // console.log({ data })
  // console.log({ secureUrl })

  return secureUrl

  // const img = new Image()
  // img.src = tokens.join("/")
  // img.alt = data.public_id
}
