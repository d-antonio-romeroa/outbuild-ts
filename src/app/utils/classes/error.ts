// base error class
export class BaseError extends Error {
    status: number
    // isOperational: boolean
    constructor(message: string = 'Internal Server Error', status: number = 500) {
        super(message)
        this.status = status
        // this.isOperational = isOperational
        Object.setPrototypeOf(this, BaseError.prototype)

    }
}

// 401 error class
export class BadRequestError extends BaseError {
    constructor(message: string = 'Bad request') {
        super(message, 400)
        Object.setPrototypeOf(this, BadRequestError.prototype)
    }
}

// 401 error class
export class UnAuthorizedError extends BaseError {
    constructor(message: string = 'Unauthorized') {
        super(message, 401)
        Object.setPrototypeOf(this, UnAuthorizedError.prototype)
    }
}

// 403 error class
export class ForbiddenError extends BaseError {
    constructor(message: string = 'Forbidden') {
        super(message, 403)
        Object.setPrototypeOf(this, ForbiddenError.prototype)
    }
}

// 404 error class
export class NotFoundError extends BaseError {
    constructor(message: string = 'Not found') {
        super(message, 404)
        Object.setPrototypeOf(this, NotFoundError.prototype)
    }
}

// validation error class
export class ValidationError extends BaseError {
    errorData: Record<string, string>[]
    constructor(data: Record<string, string>[]) {
        super("Validation Error", 400)
        this.errorData = data
        Object.setPrototypeOf(this, ValidationError.prototype)
    }
}