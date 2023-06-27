"use client"

import "./_styles/login.css"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

import { HttpError } from "@/utils/http"
import { useRouter } from "next/navigation"

import passwordLoginAction from "../_actions/password-login-action"
import oAuthLoginAction from "../_actions/oauth-login-action"


const oAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth")

const params = new URLSearchParams()
params.append("client_id", "235744230157-n2t4pjvoq4bbfhisqlrur2cct4ool6c8.apps.googleusercontent.com")
params.append("redirect_uri", "http://localhost:3001/oauth/google/callback")
params.append("response_type", "token")
params.append("scope", "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile")

oAuthUrl.search = params.toString()

export default function LoginForm() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handlePasswordLogin = async (e: any) => {
    e.preventDefault()

    try {
      const response = await passwordLoginAction({
        email: email,
        password: password
      })

      if ("error" in response) {
        alert(response.error)
        return
      }

      router.replace("/")
    } catch (error) {
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

  return (
    <>
      <form className="lg:mt-9 xl:mt-12" method="POST">
        <input
          type="email"
          id="email"
          name="email"
          className="input-text"
          placeholder="Email"
          autoComplete="on"
          onChange={(e) => setEmail(e.target.value)}
        >
        </input>
        <input
          type="password"
          id="password"
          name="password"
          className="input-text"
          placeholder="Password"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        >
        </input>
        <Link href="/">Lupa password?</Link>

        <button type="submit" onClick={(e) => handlePasswordLogin(e)} className="btn-primary mt-6">
          Masuk
        </button>
      </form>

      <div className="flex items-center justify-center">
        <hr className="border-t-2 border-gray-200 w-full"></hr>
        <span className="px-4 py-2 bg-white text-gray-300 font-semibold">OR</span>
        <hr className="border-t-2 border-gray-200 w-full"></hr>
      </div>

      <button
        // href={oAuthUrl.toString()}
        type="button"
        className="
          flex items-center
          justify-center
          mt-6 px-3
          sm:px-5 py-2
          lg:py-2 xl:py-3 bg-white
          text-sm sm:text-base
          text-gray-700 font-bold
          rounded-md hover:bg-manatee
          w-full border border-gray-300"
        onClick={handleOAuth}>
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