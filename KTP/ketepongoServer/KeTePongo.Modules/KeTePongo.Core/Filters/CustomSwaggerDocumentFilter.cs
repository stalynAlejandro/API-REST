using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KeTePongo.Core.Filters
{
    public class CustomSwaggerDocumentFilter : IDocumentFilter
    {
        public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
        {
           // var paths = swaggerDoc.Paths.OrderBy(e => e.Key);
            //swaggerDoc.Paths = paths.Select(x => x.Value.);
        }
    }
}

