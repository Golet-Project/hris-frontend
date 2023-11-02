import NewPasswordInput from "./NewPasswordInput"

export default function Page() {
  return (
    <>
      <main className="min-h-screen bg-white lg:flex p-4 md:p-10 lg:p-4">
        <div className="bg-white border border-primary-500 rounded-md px-8 pt-6 pb-8 m-auto mt-24 max-w-[350px]">
          <div className="mb-4">
            <NewPasswordInput />
          </div>
        </div>
      </main>
    </>
  )
}
