const doc = {
    "http://schema.org/name": "Manu Sporny",
    "http://schema.org/url": {"@id": "http://manu.sporny.org/"},
    "http://schema.org/image": {"@id": "http://manu.sporny.org/images/manu.png"}
};
const context = {
    "name": "http://schema.org/name",
    "homepage": {"@id": "http://schema.org/url", "@type": "@id"},
    "image": {"@id": "http://schema.org/image", "@type": "@id"}
};





async function serializeJsonLD(jsonData){
    const compacted = await jsonld.flatten(jsonData);
    console.log(JSON.stringify(compacted, null, 2));
}

async function rdfToJson(nquads){
    return await jsonld.fromRDF(nquads, {format: 'application/n-quads'})
}

async function readData(url){

    const response = await fetch(url, { headers: {'Accept': ['application/n-triples', 'application/rdf+xml', 'text/turtle']} })
   
    const data = await response.text()
    const contentType = response.headers.get("Content-Type")

    console.log(data)
    console.log(contentType)

    const jsonld = await rdfToJson(data)

    console.log(jsonld)
    
}

readData("http://dbpedia.org/resource/Berlin")
// serializeJsonLD()

