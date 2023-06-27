import { API_BASE_URL } from "@/utils/constant"
import { IncomingMessage, ServerResponse } from "http"
import httpProxy from "http-proxy"
import { NextApiRequest, NextApiResponse } from "next"

const proxy = httpProxy.createProxyServer({
  target: API_BASE_URL
})

export const config = {
  api: {
    bodyParser: false
  }
}

/**
 * A Proxy server.
 * The url path should be prepend with /api
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve: any, reject) => {
    const reqPath = req.url
    if (reqPath === undefined) {
      res.status(404)
      return
    }

    // get the cookie
    const cookies = req.cookies

    const forwardedPath = reqPath.replace(/^\/api/, "")

    // is login request?
    const isPasswordLogin = forwardedPath === "/auth/login"
    const isOAuthLogin = forwardedPath.startsWith("/oauth")
    const isLoginRequest = isPasswordLogin || isOAuthLogin

    let accessToken: string | undefined

    const passedReq = req
    passedReq.url = forwardedPath
    passedReq.headers = {
      ...passedReq.headers,
      cookie: ""
    }

    // intercept if it is a login request
    if (!isLoginRequest) {
      if (cookies === undefined) {
        res.status(401).json({ message: "unauthorized" })
        return
      }
      if (cookies.token === undefined) {
        res.status(401).json({ message: "unauthorized" })
        return
      }
      passedReq.headers.authorization = `Bearer ${accessToken}`
    }

    proxy.once("proxyRes", (proxyRes: IncomingMessage, callbackReq: IncomingMessage, callbackRes: ServerResponse<IncomingMessage>) => {
      let apiResponseBody = ""

      proxyRes.on("data", (chunk: any) => {
        apiResponseBody += chunk
      })

      proxyRes.on("error", () => {
        callbackRes.writeHead(500, "internal server error")
        callbackRes.end(apiResponseBody)
        return reject(apiResponseBody)
      })

      proxyRes.on("end", () => {
        if (proxyRes.statusCode === undefined) {
          callbackRes.writeHead(500, "internal server error")
          callbackRes.end(apiResponseBody)
          return reject(apiResponseBody)
        }

        callbackRes.writeHead(proxyRes.statusCode, {
          headers: proxyRes.rawHeaders
        })
        callbackRes.end(apiResponseBody)
        return resolve()
      })
    })

    proxy.web(req, res, {
      target: API_BASE_URL,
      autoRewrite: false,
      selfHandleResponse: true
    })
  })
}
