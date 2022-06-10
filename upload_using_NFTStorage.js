import dotenv from "dotenv"
dotenv.config()
import path from "path"
import { NFTStorage } from "nft.storage"
import { filesFromPath } from "files-from-path"

const token = process.env.API_KEY

const upload = async () => {
  const dir = "./plot_metadata"
  try {
    const files = filesFromPath(dir, {
      pathPrefix: path.resolve(dir),
      hidden: true,
    })
    const storage = new NFTStorage({ token })
    console.log(`storing file(s) from ${dir}`)
    const cid = await storage.storeDirectory(files)
    console.log({ cid })
    const status = await storage.status(cid)
    console.log(status)
  } catch (error) {
    console.log("failed: ", error)
  }
}

upload()
