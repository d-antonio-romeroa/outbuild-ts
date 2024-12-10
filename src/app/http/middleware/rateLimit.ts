import rateLimit from "express-rate-limit";

const rateLimitHandler = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

export default rateLimitHandler;
