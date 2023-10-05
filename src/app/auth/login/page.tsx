import Image from "next/image"

import LoginForm from "./LoginForm"
import Script from "next/script"

const imageStyle = {
  width: "auto",
  height: "auto"
}

export default function Page() {
  return (
    <>
      <main className="min-h-screen bg-white lg:flex p-4 md:p-10 lg:p-4">
        <div
          className="
        hidden lg:block
        lg:w-3/5
        2xl:w-2/3
        bg-manatee
        relative
        rounded-tl-[10%]
        rounded-br-[10%]"
        >
          <Image
            src="/static/images/people-in-desk.svg"
            alt="Person in the front of desk"
            width={700}
            height={700}
            priority
            style={imageStyle}
            className="
            absolute bottom-8

           lg:max-w-[80%] lg:left-12

            xl:left-16 xl:max-w-[85%]
            2xl:left-24"
          ></Image>
        </div>

        <div
          className="
        lg:ml-4 flex flex-col p-4 sm:p-8
        lg:w-2/5
        2xl:w-1/3"
        >
          <Image src="/static/images/logo-md.svg" alt="Logo" width={271} height={115} className="mx-auto"></Image>

          <div className="lg:mt-9 xl:mt-18 p-6">
            <h1 className="font-semibold xl:text-xl">Selamat datang di Aplikasi manajemen karyawan HROOST</h1>
            <p className="mt-4">Masuk menggunakan e-mail atau Google</p>

            <LoginForm />
          </div>
        </div>
      </main>
      <Script src="https://accounts.google.com/gsi/client"></Script>
    </>
  )
}
