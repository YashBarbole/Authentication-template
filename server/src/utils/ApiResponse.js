class ApiResponse {
    constructor(
        statusCode , 
        data ,  // saved in db
        message = "Success"
    ){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export {ApiResponse}