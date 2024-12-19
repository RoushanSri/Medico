const AsyncHandler = (requestHandle)=>{
    return async(req, res, next) => {
        Promise.resolve(
            requestHandle(req, res, next)
        ).catch(err => 
            next(err)
        );
    }
}

export {AsyncHandler};