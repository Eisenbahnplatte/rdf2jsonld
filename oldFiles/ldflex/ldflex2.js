const { PathFactory } = require('ldflex');
const { default: ComunicaEngine } = require('@ldflex/comunica');
const { namedNode } = require('@rdfjs/data-model');

async function rdf2jsonld(rdfStr, contType, baseURI) {

    // The JSON-LD context for resolving properties
    const context = {
    "@context": {
        "@vocab": "http://xmlns.com/foaf/0.1/",
        "friends": "knows",
        "label": "http://www.w3.org/2000/01/rdf-schema#label",
        "rbn": "https://ruben.verborgh.org/profile/#"
    }
    };
    // The query engine and its source
    const queryEngine = new ComunicaEngine(rdfStr);
    // The object that can create new paths
    const path = new PathFactory({ context, queryEngine });

    const ruben = path.create({ subject: namedNode('https://ruben.verborgh.org/profile/#me') });
    showPerson(ruben);

    async function showPerson(person) {
    console.log(`This person is ${await person.name}`);

    console.log(`${await person.givenName} is interested in:`);
    for await (const name of person.interest.label)
        console.log(`- ${name}`);

    console.log(`${await person.givenName} is friends with:`);
    for await (const name of person.friends.givenName)
        console.log(`- ${name}`);
    }
}

async function parseJsonLD(rdfStr) {

    // We convert the rdf to an N-Quads string.
    try{
      rdfParser.parse(require('streamify-string')(rdfStr), {contentType: "application/ld+json"})
    } catch(err){
      console.log(err)
    }
  
  }
  
  function turtleTest(){
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
  
      rdf2jsonld(turtleStr, 'text/turtle', "example.org");
  }
  
  async function fetchURL(){
      let url = document.getElementById('myUrl').value
  
      try{
          const response = await fetch(url, { 
              mode: 'cors',
              headers: {
                  'Accept': ['application/n-quads','application/n-triples', 'application/rdf+xml', 'text/turtle', 'text/html']
              } 
          })
          let data = await response.text()
          let contentType = response.headers.get("Content-Type")
  
          console.log(contentType)
          console.log(data)
  
          // console.log("headers")
          // for (let pair of response.headers.entries()) {
          //     console.log(pair[0]+ ': '+ pair[1]);
          //  }
      
          if (contentType.includes("text/html")){
              data = $($($.parseHTML( data )).filter("script")).filter('[type="application/ld+json"]');
      
              console.log("jsonLDstr")
              console.log(data);
  
              parseJsonLD(data)
          } else{
  
            if(contentType==="application/ld+json"){
              console.log("handle JSonLD")
              parseJsonLD(data)
            } else {
              rdf2jsonld(url, contentType, url)
            }
          }
  
      }catch(err){
          console.log(err)
      }
  }
  
  document.getElementById('turtleTestButton').addEventListener('click', turtleTest);
  
  let button = document.getElementById('myButton'); // add id="my-button" into html
  button.addEventListener('click', fetchURL);