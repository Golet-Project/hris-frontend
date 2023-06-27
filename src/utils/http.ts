import { PROXY_URL } from "./constant"

// eslint-disable-next-line no-shadow
export enum HttpStatusCode {
  OK = 200,
  Created = 201,

  TemporaryRedirect = 307,

  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,

  InternalServerError = 500
}

export type HttpResponseError = {
  /**
   * The error message
   */
  message: string

  /**
   * Http status code
   */
  code: number
}

export type HttpBaseResponseBodyJson<T> = {
  message: string
  data: T
}

//=== ERROR ===
export class HttpError {
  public statusCode: HttpStatusCode | undefined
  public message: string | undefined

  constructor(statusCode: HttpStatusCode, message: string) {
    this.statusCode = statusCode
    this.message = message
  }
}

export type HttpResponse<T = undefined> = {
  error?: HttpResponseError,
  success?: HttpBaseResponseBodyJson<T>
}

export class HttpBadRequestError extends HttpError {
  constructor(message?: string) {
    super(HttpStatusCode.BadRequest, message ?? "bad request")
  }
}

export class HttpUnauthorizedError extends HttpError {
  constructor(message?: string) {
    super(HttpStatusCode.Unauthorized, message ?? "unautorized")
  }
}

export class HttpForbiddenError extends HttpError {
  constructor(message?: string) {
    super(HttpStatusCode.Forbidden, message ?? "forbidden")
  }
}

export class HttpNotFoundError extends HttpError {
  constructor(message?: string) {
    super(HttpStatusCode.NotFound, message ?? "not found")
  }
}

export class HttpInternalServerError extends HttpError {
  constructor(message?: string) {
    super(HttpStatusCode.InternalServerError, message ?? "internal server error")
  }
}

/**
 * Will throw appropriate HttpError by the given status code as number
 *
 * @param {number} statusCode
 * @throws {HttpError}
 */
export function throwHttpError(statusCode: number, message?: string) {
  switch (statusCode) {
    case 400:
      throw new HttpBadRequestError(message)
    case 401:
      throw new HttpUnauthorizedError(message)
    case 403:
      throw new HttpForbiddenError(message)
    case 404:
      throw new HttpNotFoundError(message)
    case 500:
      throw new HttpInternalServerError(message)
    default:
      throw new HttpInternalServerError()
  }
}

/**
 * Concantenate path with proxy url path
 *
 * @param {string} path url path
 * @return {string} url with proxy path
 */
export function proxyUrl(path: string): string {
  return `${PROXY_URL}${path}`
}