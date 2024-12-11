import swaggerJsdoc from 'swagger-jsdoc';

export const auth_paths = {
    '/auth/login': {
        post: {
            summary: 'User Login',
            description: 'Allows users to login with valid credentials and receive a JWT token.',
            tags: ['Authentication'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['email', 'password'],
                            properties: {
                                email: { type: 'string', example: 'username1@gmail.com', description: 'description: Construction schedule name' },
                                password: { type: 'password', example: 'password1', description: 'URL of an image with the construction objective (e.g., a building).' },
                            }
                        },
                    },
                },
            },
            responses: {
                200: {
                    description: 'Login successful',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    "success": { type: 'number', example: 1 },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            email: { type: 'string', example: 'username1@gmail.com' },
                                            userId: { type: 'number', example: 1 },
                                            token: {
                                                type: 'string',
                                                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczMzg3MDMyMywiZXhwIjoxNzMzODk5MTIzfQ.9DDRjuOV3adgfLuQ6On2nJ2B99x_59k0ll_v4evJs2E',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    "success": { type: 'number', example: 0 },
                                    "error": {
                                        type: 'object', description: 'Detailed error information', example: {
                                            "message": "Validation Error",
                                            "details": "Error"
                                        }
                                    }

                                },
                            },
                        },
                    },
                },
            },
        },
    },

    '/auth/register': {
        post: {
            summary: 'User Registration',
            description: 'Registers a new user into the system.',
            tags: ['Authentication'],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['email', 'password', 'username'],
                            properties: {
                                username: { type: 'string', example: 'username', description: 'user name' },
                                email: { type: 'string', example: 'username1@gmail.com', description: 'user email' },
                                password: { type: 'password', example: 'password1', description: 'Uuser password' },
                            }
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'User created successfully',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    success: { type: 'number', example: 1 },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            email: { type: 'string', example: 'username1@gmaisl.com' },
                                            userId: { type: 'number', example: 1 },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    "success": { type: 'number', example: 0 },
                                    "error": {
                                        type: 'object', description: 'Detailed error information', example: {
                                            "message": "Validation Error",
                                            "details": "Error"
                                        }
                                    }

                                },
                            },
                        },
                    },
                },
            },
        },
    },
};

export const business_paths = {
    '/users/{userId}/schedules/{scheduleId}/activities': {
        post: {
            summary: 'Add activity to schedule',
            description: 'Add a new activity on existing schedule and user id.',
            tags: ['Activities'],
            security: [{ BearerAuth: [] }],
            parameters: [
                {
                    name: 'userId',
                    in: 'path',
                    required: true,
                    description: 'id of the user creating the activity',
                    schema: {
                        type: 'number',
                        example: 1,
                    },
                },
                {
                    name: 'scheduleId',
                    in: 'path',
                    required: true,
                    description: 'id of the schedule to which the activity belongs',
                    schema: {
                        type: 'number',
                        example: 1,
                    },
                },
            ],
            requestBody: {
                required: true,
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            required: ['name', 'description', 'start_date', 'end_date'],
                            properties: {
                                name: { type: 'string', example: 'activity 1', description: 'activity name' },
                                description: { type: 'string', example: 'description...', description: 'activity description' },
                                start_date: { type: 'date', example: '2024-12-07T23:42:13.475Z', description: 'activity start date' },
                                end_date: { type: 'date', example: '2024-12-07T23:42:13.475Z', description: 'activity end date' },
                            }
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Activity added to schedule',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    "success": { type: 'number', example: 0 },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'number', example: 1 },
                                            name: { type: 'string', example: 'Activity 1 - single' },
                                            start_date: { type: 'string', format: 'date-time', example: '2024-12-07T23:42:13.475Z' },
                                            end_date: { type: 'string', format: 'date-time', example: '2024-12-07T23:42:13.475Z' },
                                            createdAt: { type: 'string', format: 'date-time', example: '2024-12-07T23:42:13.475Z' },
                                            updatedAt: { type: 'string', format: 'date-time', example: '2024-12-07T23:42:13.475Z' },
                                            deletedAt: { type: 'string', format: 'date-time', example: null },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                500: {
                    description: 'Internal server error',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    "success": { type: 'number', example: 0 },
                                    error: {
                                        type: 'object',
                                        description: 'Detailed error information',
                                        example: {},
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    },

};

export const SWAGGER_PATHS = {
    ...auth_paths,
    ...business_paths
};


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
                url: 'http://localhost:3001/api/v1',
            },
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT Authorization header using the Bearer scheme. Example: "Authorization: Bearer {token}"'
                }
            },
        },
        paths: SWAGGER_PATHS
    },
    apis: ['./src/routes/*/*.ts', './src/controllers/*.ts'], // Ruta a tus controladores
};

const swaggerDocument = swaggerJsdoc(options);

export default swaggerDocument;