"use strict"
import { create as ipfsClient } from "ipfs-client"
import dotenv from "dotenv"
dotenv.config()

const grpcAPI = process.env.GRPC_API
const httpAPI = process.env.HTTP_API

const upload = async () => {
  try {
    let ipfs
    let file
    ipfs = ipfsClient({
      grpc: grpcAPI,
      http: httpAPI,
    })
    console.log(`\nConnecting to ${grpcAPI} using ${httpAPI} as fallback`)
    const id = await ipfs.id()
    console.log(`\nDaemon active\nID: ${id.id}\n`)
    console.log("Uploading files to IPFS...")
    for await (file of ipfs.addAll(streamFiles(), {
      wrapWithDirectory: true,
    }))
      console.log(`Added file: ${file.path} ${file.cid}`)
    console.log("\nUpload successfully!")
    console.log(ipfs)

    async function* streamFiles() {
      let size = 2
      for (let i = 0; i < size * size; i++) {
        await new Promise((resolve) => {
          setTimeout(() => resolve(), 100)
        })
        const rawData = {
          x: i % size,
          y: Math.floor(i / size),
        }
        const dataStream = JSON.stringify(rawData, null, 2)
        yield {
          path: `/${i}.json`,
          content: dataStream,
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
}

upload()
