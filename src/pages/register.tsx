import { InstallerForm } from "@/components/forms/InstallerForm"

const register = () => {
  return (
    <div className='min-h-screen w-screen flex justify-center'>
      <div className="p-4 flex-1 overflow-y-auto relative w-full lg:max-w-xl mx-auto">
        <InstallerForm />
      </div>
    </div>
  )
}

export default register