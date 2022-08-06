var $rdf = require('rdflib')
var jsonld = require('jsonld')


this.store = $rdf.graph();
var timeout = undefined; // 5000 ms timeout
this.fetcher = new $rdf.Fetcher(this.store, timeout)
checkCluster()
  
  
    function checkCluster(entityUri= "https://global.dbpedia.org/same-thing/lookup/?uri=http://www.wikidata.org/entity/Q64") {
      var result = {};
  
  
      // DO STUFF
  
      let urlToCheck = "https://global.dbpedia.org/same-thing/lookup/?uri=http://www.wikidata.org/entity/Q64";
      let results = gatherData(urlToCheck);
  
      // console.log(JSON.stringify(results));
      jsonStr=JSON.stringify(results);
  
      console.log(jsonStr);
    }
  
    function getLinksOfGlobal(globalURL){
      try {
        const URL = globalURL
        const response = $http.get(URL);
  
        return response.data.locals;
      } catch (error) {
        console.error(error);
      }
  }
  
    function gatherData(globalURL){
  
      let results = {};
  
      const linksOfGlobal = getLinksOfGlobal(globalURL);
      
      console.log("linksOfGlobal");
      console.log(linksOfGlobal);
      for (var i=10;i<=20; i++) {
        try{
          this.fetcher.load(linksOfGlobal[i]);
        } catch(error){
          // console.log(error);
          results[linksOfGlobal[i]] = {status: error.status, statusText: error.statusText}
          // exception = error.response;
          // exception["url"] = linksOfGlobal[i];
          // results.push(exception);
        }
      }
  
      
      // let predicates = [""];
    
      var stmts = store.statementsMatching(undefined, undefined, undefined);
      for (var i=0; i<stmts.length;i++) {
        console.log(stmts[i]);
        // if (!(predicates.includes(stmts[i].predicate.value))) {
        //   predicates.push(stmts[i].predicate.value)
        // }
  
        if(stmts[i].graph.termType=='NamedNode'){
  
          jsonldStr = $rdf.serialize(stmts[i].graph, this.store, null, 'text/turtle');
          // console.log("JSONLD STRING");
          // console.log(jsonldStr);
  
          if (results[stmts[i].graph.value]==undefined) {
            results[stmts[i].graph.value] = {}
            results[stmts[i].graph.value]["status"] = 200;
          }
          
          results[stmts[i].graph.value]["turtle"] = jsonldStr;
        }
      }
      
      // predicates.forEach(x =>{
      //   console.log(x);
      // })
  
      return results;
    }
  
