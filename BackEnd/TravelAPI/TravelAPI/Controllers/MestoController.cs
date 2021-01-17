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
                var query = new CypherQuery("MATCH (m:Mesto {Naziv:'" + mesto.Naziv + "'}) RETURN m",
                                        new Dictionary<string, object>(), CypherResultMode.Set);

                Mesto mesto_ret = ((IRawGraphClient)client).ExecuteGetCypherResults<Mesto>(query).FirstOrDefault();

                if (mesto_ret == null)
                {
                    // Treba ga dodati u bazu

                    Dictionary<string, object> queryDict = new Dictionary<string, object>();
                    queryDict.Add("Naziv", mesto.Naziv);
                    queryDict.Add("Opis", mesto.Opis);
                    queryDict.Add("ImeSlike", mesto.ImeSlike);
                    queryDict.Add("Ocena", mesto.Ocena);
                    queryDict.Add("Brojac", mesto.Brojac);


                    query = new CypherQuery("CREATE (m:Mesto {Naziv:'" + mesto.Naziv
                                            + "', Opis:'" + mesto.Opis
                                            + "', Ocena:" + mesto.Ocena
                                            + ", Brojac: 1"
                                            + ", ImeSlike:'" + mesto.ImeSlike
                                            + "'}) RETURN m",
                                            queryDict, CypherResultMode.Set);

                    ((IRawGraphClient)client).ExecuteCypher(query);
                }
                else
                {
                    // Treba ga modifikovati

                    query = new CypherQuery("MATCH (m:Mesto {Naziv:'" + mesto.Naziv + "'})" +
                                            " SET m.Opis = m.Opis + '\n" + mesto.Opis + "'" +
                                            " SET m.Ocena = m.Ocena + " + mesto.Ocena +
                                            " SET m.Brojac = m.Brojac + 1",
                                            new Dictionary<string, object>(), CypherResultMode.Set);

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

        [HttpGet("{mesto}")]
        public ActionResult<List<Mesto>> GetMesta(string mesto)
        {
            var query = new CypherQuery("MATCH (m:Mesto {Naziv:'" + mesto + "'})" +
                                        "MATCH (m)-[*1..3]-(a)" +
                                        "RETURN a",
                                        new Dictionary<string, object>(), CypherResultMode.Set);

            List<Mesto> mesta = ((IRawGraphClient)client).ExecuteGetCypherResults<Mesto>(query).ToList();

            return mesta;
        }

        // Vraca pojedinacno najbolje ocenjene destinacije
        // (bez obizra na rute)
        [HttpGet("najboljeOcenjeni")]
        public ActionResult<List<Mesto>> GetNajboljeOcenjeni()
        {
            var query = new CypherQuery("MATCH (m:Mesto)" +
                                        "RETURN m ORDER BY m.Ocena DESC LIMIT 5",
                                        new Dictionary<string, object>(), CypherResultMode.Set);

            List<Mesto> mesta = ((IRawGraphClient)client).ExecuteGetCypherResults<Mesto>(query).ToList();

            return mesta;
        }

        // Vraca random destinacije
        // (bez obizra na rute)
        [HttpGet("random")]
        public ActionResult<List<Mesto>> GetRandomMesta()
        {
            var query = new CypherQuery("MATCH (m:Mesto)" +
                                        "RETURN m ORDER BY rand() DESC LIMIT 5",
                                        new Dictionary<string, object>(), CypherResultMode.Set);

            List<Mesto> mesta = ((IRawGraphClient)client).ExecuteGetCypherResults<Mesto>(query).ToList();

            return mesta;
        }
    }
}
