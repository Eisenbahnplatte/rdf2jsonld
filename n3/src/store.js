import { Store } from 'n3';
import rdfParser from 'rdf-parse';
import streamifyString from 'streamify-string';

export async function feedStore(rdfStr) {
  const store = new Store();
  
  await storeStream(store, rdfStr)

  return store
}

async function storeStream(store, rdfStr) {
  let stream = rdfParser.parse(streamifyString(rdfStr.data), {contentType: rdfStr.contentType, baseIRI: rdfStr.base});

  return new Promise((resolve, reject) => {
      stream.on('data', (quad) => {
        store.add(quad)
      });
      stream.on('error', (error) => {
        console.error(error)
        reject(error)
      });
      stream.on('end', () => {
        console.log('All done!')
        resolve()
      });
  })
}