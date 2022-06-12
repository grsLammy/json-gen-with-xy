export async function* streamFiles() {
  try {
    let size = 10
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
  } catch (error) {
    console.log(error)
  }
}
