import dotenv from "dotenv";
dotenv.config()

import DbConnection from "../config/database";
import JobsController from "./controllers/jobs.controller";


DbConnection.authenticate().then(() => {
    const jobsController = new JobsController();

    jobsController.processJobs().catch((error) => {
        console.log(error);
    });
})
.catch((error) => {
    console.log('ERROR CONNECTING TO DB', error);
});
