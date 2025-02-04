export const API_ERRORS = {
    BAD_REQUEST: {
        message: "Missing parameters!",
        status: 400
    },
    ACTION_NOT_SPECIFIED: {
        message: "No action specified!",
        status: 400
    },
    UNAUTHORIZED: {
        message: "Unauthorized access!",
        status: 401
    },
    FORBIDDEN: {
        message: "Forbidden access!",
        status: 403
    },
    NOT_FOUND: {
        message: "Resource not found!",
        status: 404
    },
    CONFLICT: {
        message: "Conflict detected!",
        status: 409
    },
    SERVER_ERROR: {
        message: "Internal server error!",
        status: 500
    },
    SERVICE_UNAVAILABLE: {
        message: "Service temporarily unavailable!",
        status: 503
    }
};