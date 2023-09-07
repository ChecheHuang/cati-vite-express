import 'react-lazy-load-image-component/src/effects/blur.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface CssProviderProps {
  children: React.ReactNode
}

const CssProvider: React.FC<CssProviderProps> = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer closeOnClick autoClose={500} theme="light" />
    </>
  )
}

export default CssProvider
