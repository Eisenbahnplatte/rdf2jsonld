var store = new $rdf.graph();
var timeout = undefined; // 5000 ms timeout
var fetcher = new $rdf.Fetcher(store, timeout)

// fetch('https://global.dbpedia.org/same-thing/lookup/?uri=http://www.wikidata.org/entity/Q64')
//   .then((response) => response.json())
//   .then((data) => console.log(data));

async function httpGetJson(url){

  let jsonResponse
  
  await fetch(url)
  .then((response) => response.json())
  .then(json => jsonResponse = json)

  return jsonResponse
}

async function loadData(url){
  let globalJson = await httpGetJson(url)

  console.log(globalJson)

  for (let i = 50; i < 100; i++) {
    console.log(globalJson.locals[i])
    try{
      await fetcher.load(globalJson.locals[i])
    }
    catch(error){
      console.log(error)
    }
  } 

  // let i = 0
  // globalJson.locals.forEach(element => {
  //   console.log(element)
  //   fetcher.load(element)
  //   i += 1
  //   // fetch(element).then((response) => console.log(response))
  // });

  // await fetcher.load(url)
  // $rdf.parse(data, store, null, 'application/n-quads');
}

async function loadData2(url){
  const options = {
    headers: {"Accept": ["application/ld+json", "application/rdf+xml", "application/n-triples", "text/turtle"]}
  }

  await fetch(url,options)
    .then((response) => {
      $rdf.parse(response.text(), store, url, 'application/rdf+xml');
      nquads = $rdf.serialize(undefined, this.store, undefined, 'application/n-quads');
      console.log(nquads)
    })
  // let globalJson = await httpGetJson(url)

  // console.log(globalJson)

  // for (let i = 50; i < 100; i++) {
  //   console.log(globalJson.locals[i])
  //   try{
  //     await fetcher.load(globalJson.locals[i])
  //   }
  //   catch(error){
  //     console.log(error)
  //   }
  // } 

  // let i = 0
  // globalJson.locals.forEach(element => {
  //   console.log(element)
  //   fetcher.load(element)
  //   i += 1
  //   // fetch(element).then((response) => console.log(response))
  // });

  // await fetcher.load(url)
  
}

function showData(){
  var stmts = store.statementsMatching(undefined, undefined, undefined);
  for (var i=0; i<stmts.length;i++) {
    // if (!(predicates.includes(stmts[i].predicate.value))) {
    //   predicates.push(stmts[i].predicate.value)
    // }

    
    if(stmts[i].graph.termType=='NamedNode'){
      console.log(stmts[i]);
      jsonldStr = $rdf.serialize(stmts[i].graph, this.store, null, 'application/n-quads');
      // console.log("JSONLD STRING");
      // console.log(jsonldStr);

      if (results[stmts[i].graph.value]==undefined) {
        results[stmts[i].graph.value] = {}
        results[stmts[i].graph.value]["status"] = 200;
      }
      
      results[stmts[i].graph.value]["turtle"] = jsonldStr;
    }
  }
}

function parseRDF(url){
  fetch(url).then((response) => console.log(response))
}

// parseRDF("http://de.dbpedia.org/data/West-Berlin.ntriples")

async function loadAndShow(){
  // await loadData2("https://wiki.ontologi.es/parkhotel")
  await loadData2("https://sws.geonames.org/2879139/about.rdf")
  // await loadData("https://global.dbpedia.org/same-thing/lookup/?uri=http://www.wikidata.org/entity/Q64");

  console.log("FERTSCH")
  showData()
}

loadAndShow()

// loadData("http://fr.dbpedia.org/resource/Berlin-Ouest");

// parseRDF("http://fr.dbpedia.org/resource/Berlin-Ouest")


// https://www.wikidata.org/wiki/Q56036  http://de.dbpedia.org/data/West-Berlin.ntriples
