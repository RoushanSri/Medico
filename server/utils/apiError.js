class apiError extends Error {
    constructor(status, message, error=[]) {        
        super(message);
        this.status = status;
        this.errors = error;
    }
}

export {apiError};