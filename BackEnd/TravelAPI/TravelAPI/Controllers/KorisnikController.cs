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
    public class KorisnikController : ControllerBase
    {
        private readonly IGraphClient client;

        public KorisnikController(IGraphClient client)
        {
            this.client = client;
        }

        [HttpGet("{email}")]
        public Korisnik GetKorisnik(string email)
        {
            var query = new CypherQuery("match (k:Korisnik {email:'" + email + "'}) return k",
                                        new Dictionary<string, object>(), CypherResultMode.Set);

            Korisnik korisnik = ((IRawGraphClient)client).ExecuteGetCypherResults<Korisnik>(query).FirstOrDefault();

            return korisnik;
        }

        [HttpPost]
        public IActionResult PostKorisnik(Korisnik korisnik)
        {
            Dictionary<string, object> queryDict = new Dictionary<string, object>();
            queryDict.Add("Ime", korisnik.Ime);
            queryDict.Add("Prezime", korisnik.Prezime);
            queryDict.Add("email", korisnik.email);
            queryDict.Add("password", korisnik.password);

            var query = new CypherQuery("CREATE (k:Korisnik {Ime:'" + korisnik.Ime
                                        + "', Prezime:'" + korisnik.Prezime
                                        + "', email:'" + korisnik.email
                                        + "', password:'" + korisnik.password
                                        + "'}) return k",
                                        queryDict, CypherResultMode.Set);

            ((IRawGraphClient)client).ExecuteCypher(query);
            return Ok();
        }

        [HttpPost("login")]
        public ActionResult<object> Login(Korisnik korisnik)
        {
            var query = new CypherQuery("match (k:Korisnik {email:'" + korisnik.email
                                        + "', password:'" + korisnik.password
                                        + "'}) return k",
                                        new Dictionary<string, object>(), CypherResultMode.Set);

            Korisnik korisnik_ret = ((IRawGraphClient)client).ExecuteGetCypherResults<Korisnik>(query).FirstOrDefault();

            if (korisnik_ret != null)
            {
                return new
                {
                    Uspesno = true,
                    Ime = korisnik_ret.Ime,
                    Prezime = korisnik_ret.Prezime
                };
            }
            else
            {
                return new
                {
                    Uspesno = false
                };
            }
        }
    }
}
