import rdfParser from 'rdf-parse';
  
  export function turtleTest(){
    console.log("turtleTest")
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
  
      return rdf2jsonld(turtleStr, 'text/turtle', "example.org");
  }
  
  export async function fetchURL(url){
  
      try{
          const response = await fetch(url, { 
              mode: 'cors',
              headers: {
                  'Accept': ['application/ld+json','application/n-quads','application/n-triples', 'application/rdf+xml', 'text/turtle', 'text/html']
              } 
          })

          let data = await response.text()
          let contentType = response.headers.get("Content-Type")
      
          if (contentType.includes("text/html")){
              data = $($($.parseHTML( data )).filter("script")).filter('[type="application/ld+json"]');
              contentType = "application/ld+json"
          } 

          return rdf2jsonld(data, contentType, url)

      }catch(err){
          console.log(err)
          return
      }
  }

  function rdf2jsonld(rdfStr, contType, baseURI) {

    if (rdfStr == undefined) return
    // We convert the rdf to an N-Quads string.
    return rdfParser.parse(require('streamify-string')(rdfStr), {contentType: contType, baseIRI: baseURI})
  }  