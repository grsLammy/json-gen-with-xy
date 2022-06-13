"use strict"
import fs from "fs"

const generate = async () => {
  let size = 300
  const dir = "./plot_metadata"
  try {
    if (fs.existsSync(dir)) {
      fs.rmSync(dir, { recursive: true }, (err) => {
        if (err) throw err
      })
    }
    fs.mkdirSync(dir)
    console.log("GENERATING METADATA FOR PLOT(0,0) to PLOT(299,299)...")
    for (let i = 0; i < size * size; i++) {
      const rawData = {
        description: "plot metadata for Gamespad Land",
        name: "Gamespad Land",
        attributes: [
          { trait_type: "X COORDINATE", value: (i % size).toString() },
          {
            trait_type: "Y COORDINATE",
            value: Math.floor(i / size).toString(),
          },
        ],
      }
      const dataStream = JSON.stringify(rawData, null, 2)
      fs.writeFileSync(`./plot_metadata/${i}.json`, dataStream, "utf-8")
    }
    console.log("\nMETADATA GENERATED SUCCESSFULLY")
  } catch (error) {
    console.log(error)
  }
}

generate()
