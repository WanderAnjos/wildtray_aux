import { File } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { Header } from "../components/header";
export function ConfigPage() {
   return (
      <div className='max-h-screen h-full flex flex-col'>
         <Header homeButton />

         <div className="text-center">
            <p className="text-sm text-accent font-medium">Configurações Gerais</p>
         </div>

         <motion.div
            initial={{ opacity: 0, translateX: -20 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.2 }}
            className='flex-1'
         >

            <div className='flex-1'>
               <div className='p-4'>
                  <div className='text-xs text-white/90 my-1'>Caminho do standalone:</div>
                  <div className='flex relative'>
                     <input title='C:\el\projetos\wildfly-24.0.0.Final\standalone\configuration\standalone.xml' type="text" value="C:\el\...\standalone.xml" disabled className='rounded-sm border border-transparent border-b-blue-500 bg-white/5 p-[0.5rem] w-full text-accent text-sm' />
                     <div className="absolute right-0 rounded-sm w-9 h-full flex text-accent justify-center items-center transition bg-white/5 hover:bg-white/10">
                        <File />
                     </div>
                  </div>
               </div>
               {/* <Separator />
               <div className='p-4'>Hello World</div> */}
            </div>

         </motion.div>
      </div>
   )
}