"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import cn from "classnames"

import { HttpError } from "@/utils/http"
import { useRouter } from "next/navigation"

import basicLoginRequest from "./_services/basicLoginRequestService"
import oAuthLoginAction from "./_services/oAuthLoginRequestService"
import validateBasicLoginPayload from "./_services/validateBasicLoginPayloadService"

// import InputEmail from "@/components/input/InputEmail"
// import InputPassword from "@/components/input/InputPassword"
import AlertDanger from "@/components/alert/AlertDanger"
import { TextField, ThemeProvider, Button } from "@mui/material"
import { MuiThemeProvider } from "@/themes/MuiThemeProvider"

import {
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_REDIRECT_URI,
  GOOGLE_OAUTH_SCOPE,
  GOOGLE_OAUTH_URL
} from "@/utils/constant"

//=== Login Action ===
const oAuthUrl = new URL(GOOGLE_OAUTH_URL)

const params = new URLSearchParams()
params.append("client_id", GOOGLE_OAUTH_CLIENT_ID)
params.append("redirect_uri", GOOGLE_OAUTH_REDIRECT_URI)
params.append("response_type", "token")
params.append("scope", GOOGLE_OAUTH_SCOPE)

oAuthUrl.search = params.toString()

export default function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [alertMessage, setAlertMessage] = useState("")
  const [loginButtonDisabled, setLoginButtonDisabled] = useState(false)

  //=== Handler ===
  const handleBasicLogin = async (e: any) => {
    e.preventDefault()
    setLoginButtonDisabled(true)

    // validate first before making a request
    const payloadError = validateBasicLoginPayload({
      email: email,
      password: password
    })
    if (payloadError !== null) {
      setAlertMessage(payloadError.reason)
      setLoginButtonDisabled(false)
      return
    }

    try {
      const response = await basicLoginRequest({
        email: email,
        password: password
      })

      if ("error" in response) {
        alert(response.error?.message ?? "")
        setLoginButtonDisabled(false)
        return
      }

      router.refresh() // invalidating cache
      router.replace("/")
    } catch (error) {
      setLoginButtonDisabled(false)
      if (error instanceof HttpError) {
        // TODO: proper alert
        alert(error.message)
        return
      }

      /// TODO: proper alert
      alert("internal server error")
    }
  }

  const handleOAuth = async (e: any): Promise<void> => {
    try {
      e.preventDefault()
      const response = await oAuthLoginAction()

      if (response.error !== undefined) {
        // TODO: proper alert
        return alert(response.error.message)
      }

      const json = response.success

      if (json?.data !== undefined) {
        return router.replace(json.data.url)
      }

      // TODO: proper alert
      return alert("gagal")
    } catch (error) {
      // TODO: proper alert
      return alert("Terjadi kesalahan")
    }
  }

  const handleAlertDismiss = () => {
    setAlertMessage("")
  }

  return (
    <>
      {alertMessage && <AlertDanger text={alertMessage} handleDismiss={handleAlertDismiss} />}
      <form
        className={cn("lg:mt-9", {
          "xl:mt-12": alertMessage === "",

          "mt-4 xl:mt-8": alertMessage !== ""
        })}
        method="POST"
      >
        <ThemeProvider theme={MuiThemeProvider}>
          <TextField
            id="email"
            autoComplete="false"
            type="email"
            label="Email"
            variant="outlined"
            size="small"
            className="w-full my-2"
            onChange={(e) => setEmail(e?.target?.value ?? "")}
          />

          <TextField
            id="password"
            autoComplete="false"
            type="password"
            label="Password"
            variant="outlined"
            size="small"
            className="w-full my-2"
            onChange={(e) => setPassword(e?.target.value ?? "")}
          />

          <Button
            type="submit"
            onClick={(e) => handleBasicLogin(e)}
            disabled={loginButtonDisabled}
            variant="contained"
            color="primary"
            className="mt-6 w-full"
          >
            Masuk
          </Button>
        </ThemeProvider>

        {/* <InputEmail name="email" label="Email" onChange={(e) => setEmail(e?.target.value ?? "")} /> */}

        {/* <InputPassword name="password" label="Password" onChange={(e) => setPassword(e?.target.value ?? "")} /> */}

        <Link href="/">Lupa password?</Link>

        {/* <button
          type="submit"
          onClick={(e) => handleBasicLogin(e)}
          className="btn-primary mt-6 disabled:bg-red-500"
          disabled={loginButtonDisabled}
        >
          Masuk
        </button> */}
      </form>

      <div className="flex items-center justify-center">
        <hr className="border-t-2 border-gray-200 w-full"></hr>
        <span className="px-4 py-2 bg-white text-gray-300 font-semibold">OR</span>
        <hr className="border-t-2 border-gray-200 w-full"></hr>
      </div>

      <button
        type="button"
        className="
          flex items-center
          justify-center
          mt-6 px-3
          sm:px-5 py-2
          lg:py-2 xl:py-3 bg-white
          text-sm sm:text-base
          text-gray-700 font-bold
          rounded-md hover:opacity-70
          w-full border border-gray-300"
        onClick={handleOAuth}
        disabled={loginButtonDisabled}
      >
        <Image
          src="/static/images/google.svg"
          alt="google"
          width={30}
          height={30}
          className="mr-3 sm:mr-6 md:w-fit"
        ></Image>
        Login dengan Google
      </button>
    </>
  )
}
