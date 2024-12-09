import { FailedJob } from "../models/failed_job.model";
import { Job } from "../models/job.model";
import ActivitiesService from "../../app/services/activities.service";


export default class JobsController {

    #activitiesServices = new ActivitiesService();

    #services: {[key: string]: any} = {
        createActivity: this.#activitiesServices.createJob,
    }

    constructor() {
    }

    /**
     * Adds a job to the queue to be executed with handler function name.
     * @param handler handler function name
     * @param payload job payload
     * @param user_id user that requested the job
     * @returns created Job instance
     */
    addJob = async function (handler: string, payload: Record<string, any>, user_id: number): Promise<Job> {
        const job = await Job.create({ handler, payload, user_id });
        console.log(`Job ${job.id} added to the queue`);
        return job;
    }

    /**
     * Processes pending jobs. If jobs fail then are inserted on failed_jobs table.
     */
    processJobs = async () => {
        while (true) {
            const job = await Job.findOne({
                where: { status: 'pending' },
                order: [['createdAt', 'ASC']],
            });

            if (!job) {
                console.log('No jobs to process. Waiting...');
                await new Promise((res) => setTimeout(res, 5000));
                continue;
            }

            try {
                console.log(`Processing job ${job.id}:`, job);

                // Mark as processing
                await job.update({ status: 'processing' });

                const jobFn = this.#services[job.handler];

                // Simulate handler logic
                if (jobFn) {
                    console.log('Sending email to:', job.payload);
                    // Add your actual email sending logic here
                    await jobFn(job.payload);
                } else {
                    throw new Error(`Unknown handler: ${job.handler}`);
                }

                // Mark as completed
                await job.update({ status: 'completed' });
                console.log(`Job ${job.id} completed`);
            } catch (error: any) {
                console.error(`Error processing job ${job.id}:`, error);

                // Move job to failed_jobs table
                await FailedJob.create({
                    jobId: job.id,
                    errorMessage: error.message,
                });

                // Mark job as failed
                await job.update({ status: 'failed' });
            }
        }
    }

}