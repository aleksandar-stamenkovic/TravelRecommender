using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Neo4J_Repository.DomainModel;
using Neo4jClient;
using Neo4jClient.Cypher;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly IGraphClient client;

        public WeatherForecastController(IGraphClient client)
        {
            this.client = client;
        }

        [HttpGet]
        public List<User> Get()
        {
            var query = new CypherQuery("match (n)-[r:FRIEND]->(friend) return friend",
                                        new Dictionary<string, object>(), CypherResultMode.Set);

            List<User> users = ((IRawGraphClient)client).ExecuteGetCypherResults<User>(query).ToList();

            return users;
        }
    }
}
