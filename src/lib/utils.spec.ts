import { isEmpty } from "./utils"

describe("'isEmpty' function", () => {
  describe("should return TRUE", () => {
    test("if param undefined", () => {
      let missingValue
      expect(isEmpty(undefined)).toEqual(true)
      expect(isEmpty(missingValue)).toEqual(true)
    })

    test("if param null", () => {
      expect(isEmpty(null)).toEqual(true)
    })

    test("if param empty string", () => {
      expect(isEmpty("")).toEqual(true)
    })

    test("if param empty array", () => {
      expect(isEmpty([])).toEqual(true)
    })

    test("if param empty object", () => {
      expect(isEmpty({})).toEqual(true)
    })
  })
})
