import { Store } from 'n3';

export async function feedStore(quadStream) {
  const store = new Store();
  
  await storeStream(store, quadStream)

  return store
}

function storeStream(store, quadStream) {
  return new Promise((resolve, reject) => {
    const writeStream = store.import(quadStream);
    writeStream.on("end", resolve);
    writeStream.on("error", reject);
  })
}