import swaggerJsdoc from 'swagger-jsdoc';


const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Outbuild API',
            version: '1.0.0',
            description: 'API to manage construction projects',
        },
        servers: [
            {
                url: 'http://localhost:3001',
            },
        ],
    },
    apis: ['./src/routes/*/*.ts','./src/controllers/*.ts'], // Ruta a tus controladores
};

const swaggerDocument = swaggerJsdoc(options);

export default swaggerDocument;