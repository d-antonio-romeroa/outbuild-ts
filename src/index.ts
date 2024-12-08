import dotenv from "dotenv";
dotenv.config()
import { ExpressServerApp } from "./config/server";

new ExpressServerApp();

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(rateLimitHandler);

// app.use(express.json());

// // set logger middleware
// app.use(apiLogger);

// // set swagger docs middleware
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// app.use(async (req, res, next) => {
//     try {
//         await next()
//     } catch (error) {
//         ApiResponse.error(res, 'Internal Server Error');
//     }
// })

// DbConnection.authenticate();

// // set api v1 routes
// app.use('/api/v1', apiV1Router);

// // set error handler middleware
// app.use(errorHandler as unknown as ErrorRequestHandler);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));