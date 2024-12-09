import { NextFunction, Request, Response } from "express";
import apiLogger from "../../utils/logger/api.logger";

const morgan = require('morgan');

const apiLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const { method, ip, url, body, requestId } = req as any;
    // console.log({method, ip, url, body});
    apiLogger.info(
        `[${requestId}] ${method} ${url} - ip: ${ip} - ua: ${req.get('user-agent')} - ${body && Object.keys(body).length ? '- payload: ' + JSON.stringify(body) : ''}`
    );
    next();
};

export const requestTimeLogger = morgan(function (tokens: any, req: any, res: any) {
    return [
        (new Date()).toISOString(),
        `[${req.requestId}]`,
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')
});

export default apiLoggerMiddleware;
