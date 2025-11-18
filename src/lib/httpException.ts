import { constants } from 'http2';

const {
    HTTP_STATUS_BAD_REQUEST,
    HTTP_STATUS_NOT_FOUND,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    HTTP_STATUS_CONFLICT,
    HTTP_STATUS_PAYLOAD_TOO_LARGE,
    HTTP_STATUS_TOO_MANY_REQUESTS,
    HTTP_STATUS_SERVICE_UNAVAILABLE,
    HTTP_STATUS_UNAUTHORIZED,
    HTTP_STATUS_FORBIDDEN
} = constants;

export class HttpException extends Error {
    constructor(message: string, public statusCode: number, public errors?: unknown) {
        super(message);
    }
}

export class NotFoundException extends HttpException {
    constructor(message = 'Not Found', errors?: unknown) {
        super(message, HTTP_STATUS_NOT_FOUND, errors);
    }
}

export class BadRequestException extends HttpException {
    constructor(message = 'Bad Request', errors?: unknown) {
        super(message, HTTP_STATUS_BAD_REQUEST, errors);
    }
}

export class InternalServerException extends HttpException {
    constructor(message = 'Internal Server error', errors?: unknown) {
        super(message, HTTP_STATUS_INTERNAL_SERVER_ERROR, errors);
    }
}

export class ConflictException extends HttpException {
    constructor(message = 'Conflict', errors?: unknown) {
        super(message, HTTP_STATUS_CONFLICT, errors);
    }
}

export class PayloadTooLargeException extends HttpException {
    constructor(message = 'Payload Too Large', errors?: unknown) {
        super(message, HTTP_STATUS_PAYLOAD_TOO_LARGE, errors);
    }
}

export class TooManyRequestsException extends HttpException {
    constructor(message = 'Too Many Requests', errors?: unknown) {
        super(message, HTTP_STATUS_TOO_MANY_REQUESTS, errors);
    }
}

export class ServiceUnavailableException extends HttpException {
    constructor(message = 'Service Unavailable', errors?: unknown) {
        super(message, HTTP_STATUS_SERVICE_UNAVAILABLE, errors);
    }
}

export class UnauthorizedException extends HttpException {
    constructor(message = 'Unauthorized', errors?: unknown) {
        super(message, HTTP_STATUS_UNAUTHORIZED, errors);
    }
}

export class ForbiddenException extends HttpException {
    constructor(message = 'Forbidden', errors?: unknown) {
        super(message, HTTP_STATUS_FORBIDDEN, errors);
    }
}


