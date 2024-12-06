import React from 'react';
import { createSwaggerSpec } from 'next-swagger-doc';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

function ApiDoc() {
  const spec = createSwaggerSpec({
    apiFolder: 'src/app/api', // Optional
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Tatung University Music Club API',
        version: '0.1.0',
        description: 'API documentation for application',
      },
      paths: {},
    },
  });
  return <SwaggerUI spec={spec} />;
}

export default ApiDoc;
