"use strict"
import { streamFiles } from "./util/stream_files"
import { create as ipfsClient } from "ipfs-client"

const upload = async () => {
  try {
    let ipfs
    const grpcAPI = process.env.GRPC_API
    const httpAPI = process.env.HTTP_API
    ipfs = ipfsClient({
      grpc: grpcAPI,
      http: httpAPI,
    })

    console.log(`Connecting to ${grpcAPI} using ${httpAPI} as fallback`)
    const id = await ipfs.id()
    console.log(`Daemon active\nID: ${id.id}`)

    for await (const file of ipfs.addAll(streamFiles(), {
      wrapWithDirectory: true,
      // this is just to show the interleaving of uploads and progress events
      // otherwise we'd have to upload 50 files before we see any response from
      // the server. do not specify this so low in production as you'll have
      // greatly degraded import performance
      fileImportConcurrency: 1,
      progress: (bytes, file) => {
        console.log(`File progress ${file} ${bytes}`)
      },
    }))
      console.log(`Added file: ${file.path} ${file.cid}`)
    console.log("Finished!")
  } catch (error) {
    console.log(error)
  }
}

upload()
