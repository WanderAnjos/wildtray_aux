import { motion } from 'framer-motion';
import { router } from '../Routes';
import logo from '/logo.svg';

export function NotFoundPage() {

  function handleBackToHome() {
    router.navigate("/")
  }

  return (
    <motion.div
      initial={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className='w-full h-screen flex items-center justify-center flex-col'>
        <img src={logo} alt="" />
        <div className='text-3xl font-bold'>404</div>
        <span className='text-sm w-11/12 mx-auto text-center'>Oops! Tivemos algum problema para acessar esse espaço!</span>
        <button onClick={handleBackToHome} className='bg-muted hover:bg-violet-600 hover:text-accent transition cursor-default border py-2 px-3 mt-3 rounded font-medium text-sm'>Voltar ao inicio</button>
      </div>
    </motion.div>
  )
}