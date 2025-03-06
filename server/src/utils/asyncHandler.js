
const asyncHandler = (fun) => (req , res , next) => {
    return Promise.resolve(fun(req , res , next))
    .catch((error) => next(error))
}

export {asyncHandler}