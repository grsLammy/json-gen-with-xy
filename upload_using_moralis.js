import axios from "axios"
import dotenv from "dotenv"
dotenv.config()

const metadata = async () => {
  let size = 300
  let ipfsArray = []
  const apiKey = process.env.API_KEY

  for (let i = 0; i < size * size; i++) {
    ipfsArray.push({
      path: `metadata/${i}.json`,
      content: { x: i % size, y: Math.floor(i / size) },
    })
  }
  console.log("UPLOADING TO IPFS...")
  axios
    .post("https://deep-index.moralis.io/api/v2/ipfs/uploadFolder", ipfsArray, {
      headers: {
        "X-API-KEY": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((error) => {
      console.log(error)
    })
}

metadata()
