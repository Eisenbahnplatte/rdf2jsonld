import rdfParser from 'rdf-parse';
import streamifyString from 'streamify-string';

  export function turtleTest(){
    let turtleStr= `@prefix schema: <http://schema.org/> .
    <http://example.com/jane>
      schema:address [
        schema:addressLocality "Seattle" ;
        schema:addressRegion "WA" ;
        schema:postalCode "98052" ;
        schema:streetAddress "20341 Whitworth Institute 405 N. Whitworth" ;
        a schema:PostalAddress
      ] ;
      schema:colleague <http://www.xyz.edu/students/alicejones.html>, <http://www.xyz.edu/students/bobsmith.html> ;
      schema:email "mailto:jane-doe@xyz.edu" ;
      schema:image <https://json-ld.org/playground/janedoe.jpg> ;
      schema:jobTitle "Professor" ;
      schema:name "Jane Doe" ;
      schema:telephone "(425) 123-4567" ;
      schema:url <http://www.janedoe.com> ;
      a schema:Person .
      `;
  
      console.log(turtleStr);
  
      return {
        "data": turtleStr,
        "contentType": 'text/turtle',
        "base": "test.org"};
  }

  export function jsonldTest(){
    let turtleStr= `{"sameAs":["http://sws.geonames.org/2950157/","http://sws.geonames.org/2950159/","http://sws.geonames.org/6547383/","http://www.wikidata.org/entity/Q64"],"@context":"https://schema.org","name":"Berlin","@id":"http://musicbrainz.org/area/c9ac1239-e832-41bc-9930-e252a1fd1105","containedIn":{"@type":"Country","@id":"http://musicbrainz.org/area/85752fda-13c4-31a3-bee5-0e5cb1f51dad","name":"Germany"},"@type":"City"}`;
  
      console.log(turtleStr);
  
      return {
        "data": turtleStr,
        "contentType": 'application/ld+json',
        "base": "https://musicbrainz.org/area/c9ac1239-e832-41bc-9930-e252a1fd1105"};
  }
  
  export async function fetchURL(url){
  
      try{
          const response = await fetch(url, { 
              mode: 'cors',
              headers: {
                  'Accept': ['text/turtle;q=0.5', 'application/n-triples;q=1', "application/ld+json;q=0.8"]
              } 
          })

          let data = await response.text()
          let contentType = response.headers.get("Content-Type")
      
          // cut charset of contentType, because rdf-parse cant handle it
          if (contentType.includes(';')) contentType = contentType.split(";")[0]

          console.log(contentType);
          console.log(data);
          
          if (contentType.includes("text/html")){
              data = $($($.parseHTML( data )).filter("script")).filter('[type="application/ld+json"]');
              contentType = "application/ld+json"
          } 

          return {
            "data": data,
            "contentType": contentType,
            "base": url};

      }catch(err){
          console.log(err)
          return
      }
  }

  function rdf2quads(rdfStr, contType, baseURI) {
    if (rdfStr == undefined) return
    // We convert the rdf to an N-Quads string.
    try{
      return rdfParser.parse(streamifyString(rdfStr), {contentType: contType, baseIRI: baseURI})
    } catch (err) {
      console.log("RDF-Parse-Error")
      console.log(err)
      return
    } 
  }  