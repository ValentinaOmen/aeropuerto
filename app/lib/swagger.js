
import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'aeropuerto API',
      version: '0.1.0',
      description: 'Documentación de la API del aeropuerto',
    },
    components: {
        securitySchemes:{
            bearerAuth:{
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    security: [
        {
            bearerAuth: []
        }
    ]
  },
  apis: ['./app/api/**/*.js'], 
};

export const swaggerSpec = swaggerJsdoc(options);
