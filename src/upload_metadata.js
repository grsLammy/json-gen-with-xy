import fs from "fs"
import FormData from "form-data"
import rfs from "recursive-fs"
import basePathConverter from "base-path-converter"
import got from "got"
import dotenv from "dotenv"
dotenv.config()

const jwt = process.env.PINATA_JWT
const pinataApiKey = process.env.PINATA_API_KEY
const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY

async function pinDirectoryToPinata() {
  const url = "https://api.pinata.cloud/pinning/pinFileToIPFS"
  const src = "./plot_metadata"
  var status = 0
  try {
    const { dirs, files } = await rfs.read(src)
    let data = new FormData()
    for (const file of files) {
      data.append(`file`, fs.readFileSync(file), {
        filepath: basePathConverter(src, file),
      })
    }
    const response = await got(url, {
      method: "POST",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
        pinata_api_key: pinataApiKey,
        pinata_secret_api_key: pinataSecretApiKey,
      },
      body: data,
    })
    // .on("uploadProgress", (progress) => {
    //   console.log("progress: ", progress)
    // })

    console.log("response: ", JSON.parse(response.body))
  } catch (error) {
    console.log(error)
  }
}

pinDirectoryToPinata()
