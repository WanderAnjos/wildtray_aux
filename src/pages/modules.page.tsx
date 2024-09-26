
import { SubtractSquare } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { Header } from "../components/header";
import { MenuItemSwitch } from '../components/menu-item-switch';
import { getModules, setModule, updateJbossProperties } from "../lib/utils";

export interface ModuleProps {
  id: string
  name: string
  mode: string
}

export function ModulesPage() {

  const [modules, setModules] = useState<ModuleProps[]>([])

  useEffect(() => {

    getModules().then((modules) => {
      setModules(modules)
    }).catch((err) => {
      console.log(err)
    })

  }, [])

  async function handleToggleModule(id: string, checkedValue: boolean) {

    const moduleMode = checkedValue ? 'dev' : 'war';

    setModule(id, moduleMode).then(() => {

      let modulesWithAlter = modules.map((item) => {
        if (item.id == id) {
          item.mode = moduleMode
        }

        return item
      })

      setModules(modulesWithAlter)
      updateJbossProperties(id, "value", moduleMode)

    }).catch((err) => {
      console.log(err)
    })
  }

  return (

    <div className='max-h-screen flex flex-col'>
      <Header homeButton configButton />
      <div className="text-center mb-2">
        <p className="font-medium text-sm text-accent">Configuração dos Módulos</p>
        <p className="text-accent/60 text-xs w-11/12 mx-auto">Ao ativar o módulo ele será configurado para modo <span className="font-bold">DEV</span></p>
      </div>
      <div className='h-svh overflow-y-auto flex-1 flex flex-col py-2'>
        <motion.div
          initial={{ opacity: 0, translateX: -20 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.2 }}
        >

          <div className="flex-1 px-4 overflow-y-auto">
            {modules.map((item) => (
              <MenuItemSwitch key={item.id} label={item.name} value={(item.mode === 'dev' ? true : false)} icon={SubtractSquare} onCheck={(value) => { handleToggleModule(item.id, value) }} />
            ))}
          </div>
        </motion.div >
      </div>
    </div>

  )
}