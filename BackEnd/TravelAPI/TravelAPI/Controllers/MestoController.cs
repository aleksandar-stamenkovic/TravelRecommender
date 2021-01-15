using Microsoft.AspNetCore.Mvc;
using Neo4jClient;
using Neo4jClient.Cypher;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelAPI.DomainModel;

namespace TravelAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MestoController : ControllerBase
    {
        private readonly IGraphClient client;

        public MestoController(IGraphClient client)
        {
            this.client = client;
        }

        [HttpPost]
        public IActionResult PostMesta(List<Mesto> mesta)
        {
            // Dodavanje cvorova
            foreach (var mesto in mesta)
            {
                // Pokusamo da ga nadjemo u bazu
                var query = new CypherQuery("match (m:Mesto {Naziv:'" + mesto.Naziv + "'}) return m",
                                        new Dictionary<string, object>(), CypherResultMode.Set);

                Mesto mesto_ret = ((IRawGraphClient)client).ExecuteGetCypherResults<Mesto>(query).FirstOrDefault();

                if (mesto_ret == null)
                {
                    // Treba ga dodati u bazu

                    Dictionary<string, object> queryDict = new Dictionary<string, object>();
                    queryDict.Add("Naziv", mesto.Naziv);
                    queryDict.Add("Opis", mesto.Opis);
                    queryDict.Add("Ocena", mesto.Ocena);
                    queryDict.Add("ImeSlike", mesto.ImeSlike);

                    query = new CypherQuery("CREATE (m:Mesto {Naziv:'" + mesto.Naziv
                                            + "', Opis:'" + mesto.Opis
                                            + "', Ocena:" + mesto.Ocena
                                            + ", ImeSlike:'" + mesto.ImeSlike
                                            + "'}) return m",
                                            queryDict, CypherResultMode.Set);

                    ((IRawGraphClient)client).ExecuteCypher(query);
                }
            }
            
            // Dodavanje grana
            for (int i = 1; i < mesta.Count; i++)
            {
                var query = new CypherQuery("MATCH (a:Mesto), (b:Mesto)" +
                                            "WHERE a.Naziv= '" + mesta[0].Naziv + "' AND b.Naziv= '" + mesta[i].Naziv + "'" +
                                            "MERGE (a)-[:NEXT]->(b)",
                                            new Dictionary<string, object>(), CypherResultMode.Set);

                ((IRawGraphClient)client).ExecuteCypher(query);
            }

            return Ok();
        }
    }
}
