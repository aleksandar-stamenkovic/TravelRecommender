using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TravelAPI.DomainModel
{
    public class Mesto
    {
        public string ID { get; set; }

        public string Naziv { get; set; }

        public string Opis { get; set; }

        public float Ocena { get; set; }

        public string ImeSlike { get; set; }

    }
}
