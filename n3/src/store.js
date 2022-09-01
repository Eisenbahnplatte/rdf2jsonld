import { Store } from 'n3';
import rdfParser from 'rdf-parse';
import streamifyString from 'streamify-string';

/**
 * 
 * @param {*} rdfConf Information about rdf data to store
 * @param rdfConf.data rdf data as stream
 * @param rdfConf.contentType media-type of rdf data
 * @param rdfConf.url url rdf data to store
 * @returns n3.Store
 */
export async function feedStore(rdfConf) {
  const store = new Store();
  
  await storeStream(store, rdfConf)

  return store
}

/**
 * parse raw rdf stream and store it in n3.Store
 * 
 * @param {*} store 
 * @param {*} rdfConf 
 * @returns Promise
 */
async function storeStream(store, rdfConf) {
  let stream = rdfParser.parse(streamifyString(rdfConf.data), {contentType: rdfConf.contentType, baseIRI: rdfConf.base});

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