// src/utils/ApiResponse.ts

import { Response } from 'express';

class ApiResponse {
  /**
   * Send a success response.
   * @param res Express Response object.
   * @param data The data to return in the response.
   * @param message Optional message describing the response.
   * @param statusCode HTTP status code (default: 200).
   */
  static success(res: Response, data: any = null, message: string = 'Success', statusCode: number = 200) {
    return res.status(statusCode).json({
      success: 1,
      message,
      data,
    });
  }

  /**
   * Send an error response.
   * @param res Express Response object.
   * @param message The error message.
   * @param statusCode HTTP status code (default: 500).
   * @param details Optional additional details about the error.
   */
  static error(res: Response, message: string = 'An error occurred', statusCode: number = 500, details: any = null) {
    const errorResponse: any = {
      message,
      // code: statusCode
    };

    if (details) {
      errorResponse.details = details;
    }

    return res.status(statusCode).json({
      success: 0,
      error: errorResponse,
    });
  }

  /**
   * Send a paginated response.
   * @param res Express Response object.
   * @param data The paginated data.
   * @param pagination Pagination details (e.g., page, perPage, total).
   * @param message Optional message describing the response.
   * @param statusCode HTTP status code (default: 200).
   */
  static paginated(
    res: Response,
    data: any,
    pagination: { page: number; perPage: number; total: number },
    message: string = 'Success',
    statusCode: number = 200
  ) {
    return res.status(statusCode).json({
      success: 1,
      message,
      data,
      pagination,
    });
  }
}

export default ApiResponse;
