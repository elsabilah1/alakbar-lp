// Init class for handle the Error
class ClientError extends Error {
  statusCode: number
  error: { code?: string; message: string; details?: any }
  constructor(
    statusCode: number,
    error: { code?: string; message: string; details?: any }
  ) {
    super(`${error.message} (${error.code})`)
    this.statusCode = statusCode
    this.error = error
  }
}

const createError = (
  statusCode: number,
  error: { code: string; message: string } | string,
  details?: any
) => {
  if (typeof error === "string") {
    throw new ClientError(statusCode, { message: error, details })
  }

  return new ClientError(statusCode, error)
}

// Error Types
export const InternalServerError = (
  message = "An unexpected internal server error occured"
) => {
  return createError(500, {
    code: "internal_server_error",
    message,
  })
}

export const UnauthorizedError = (message = "UNAUTHORIZED REQUEST!") => {
  return createError(401, {
    code: "unauthorized_request_error",
    message,
  })
}

export const BadRequestError = (message = "Request is malformed") => {
  return createError(400, {
    code: "bad_request_error",
    message,
  })
}

export const NoMatchError = (message = "Method Not Allowed!") => {
  return createError(405, {
    code: "no_match_error",
    message,
  })
}

export const NotFoundError = (message = "Request not found!") => {
  return createError(404, {
    code: "not_found_error",
    message,
  })
}

export const ForbiddenError = (message = "FORBIDDEN!") => {
  return createError(403, {
    code: "forbidden_error",
    message,
  })
}

export default ClientError
