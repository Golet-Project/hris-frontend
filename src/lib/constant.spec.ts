import {
  API_BASE_URL,
  BASE_URL,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_REDIRECT_URI,
  GOOGLE_OAUTH_SCOPE,
  GOOGLE_OAUTH_URL,
  PROXY_URL
} from "./constant"

describe("API_BASE_URL", () => {
  test("can not be empty", () => {
    expect(API_BASE_URL).toBeDefined()
    expect(API_BASE_URL).not.toEqual("")
  })
})

describe("BASE_URL", () => {
  test("can not be empty", () => {
    expect(BASE_URL).toBeDefined()
    expect(BASE_URL).not.toEqual("")
  })
})

describe("PROXY_URL", () => {
  test("can not be empty", () => {
    expect(PROXY_URL).toBeDefined()
    expect(PROXY_URL).not.toEqual("")
  })
})

describe("GOOGLE_OAUTH_URL", () => {
  test("can not be emtpy", () => {
    expect(GOOGLE_OAUTH_URL).toBeDefined()
    expect(GOOGLE_OAUTH_URL).not.toEqual("")
  })
})

describe("GOOGLE_OAUTH_CLIENT_ID", () => {
  test("can not be empty", () => {
    expect(GOOGLE_OAUTH_CLIENT_ID).toBeDefined()
    expect(GOOGLE_OAUTH_CLIENT_ID).not.toEqual("")
  })
})

describe("GOOGLE_OAUTH_REDIRECT_URI", () => {
  test("can not be emtpy", () => {
    expect(GOOGLE_OAUTH_REDIRECT_URI).toBeDefined()
    expect(GOOGLE_OAUTH_REDIRECT_URI).not.toEqual("")
  })
})

describe("GOOGLE_OAUTH_SCOPE", () => {
  test("can not be empty", () => {
    expect(GOOGLE_OAUTH_SCOPE).toBeDefined()
    expect(GOOGLE_OAUTH_SCOPE).not.toEqual("")
  })
})
