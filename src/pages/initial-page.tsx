import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { router } from '../Routes';
import { getFileConfig } from '../lib/utils';
import logo from '/logo.svg';
export function InitialPage() {

  getFileConfig().then((file) => {
    if (file && JSON.stringify(file) != "{}") {
      router.navigate("/main")
      return;
    }

  }).catch((err) => {
    console.log(err)
  });

  function handleConfigDatabase() {
    router.navigate("/main")
  }

  return (
    <motion.div
      initial={{ opacity: 0, translateX: -20 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-full h-screen bg-background flex flex-col p-5 justify-evenly">
        <div className="flex flex-col items-center justify-center">
          <p className="font-bold mb-2">WildTray</p>
          <img src={logo} alt="" className="w-28" />
        </div>
        <div className="text-center mx-auto w-11/12 leading-tight tracking-tight">
          <h1 className="text-[1.7rem] font-light text-primary mx-auto mb-1">Vamos Começar!</h1>
          <p className='text-gray-500'>Vamos iniciar configurando o banco de dados!</p>
        </div>
        <div className="flex items-center justify-center flex-col">
          <button onClick={handleConfigDatabase} className="bg-primary px-[20px] py-[6px] font-semibold rounded-md text-primary-foreground cursor-auto flex items-center gap-2 hover:bg-primary/90">Começar <ArrowRight className='w-4 h-4' /></button>
        </div>
      </div>
    </motion.div>
  )
}