type ValidateBasicLoginPayloadIn = {
  email: string
  password: string
}

type ValidateBasicLoginPayloadOut = {
  inputName: string
  reason: string
}

/**
 * Handle an action to validate the user input.
 * If some user's input is invalid, the function will return that error immediately
 *
 * @param params request payload
 * @return object contains all errors or null otherwise
 */
export default function validateBasicLoginPayload(
  params: ValidateBasicLoginPayloadIn
): ValidateBasicLoginPayloadOut | null {
  //=== Email ===
  // email can not be empty
  if (params.email === undefined || params.email === "") {
    return {
      inputName: "email",
      reason: "Email tidak boleh kosong"
    }
  }

  // must be a valid email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(params.email)) {
    return {
      inputName: "email",
      reason: "Email harus berupa Email yang valid"
    }
  }

  // max 100 length
  if (params.email.length > 100) {
    return {
      inputName: "email",
      reason: "Email terlalu panjang"
    }
  }

  //=== Password ===
  // can not be empty
  if (params.password === undefined || params.password === "") {
    return {
      inputName: "password",
      reason: "Password tidak boleh kosong"
    }
  }

  // must be a valid secure password
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
  if (!passwordRegex.test(params.password)) {
    return {
      inputName: "password",
      reason:
        "Password setidaknya 8 karakter atau lebih, mengandung setidaknya satu huruf besar dan kecil, mengandung angka"
    }
  }

  return null
}
