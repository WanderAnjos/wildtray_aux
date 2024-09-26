import { Database, FileX, Network, Power, SquaresFour } from "@phosphor-icons/react";
import { invoke } from "@tauri-apps/api";
import { emit } from "@tauri-apps/api/event";
import { sendNotification } from "@tauri-apps/api/notification";
import { motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { router } from "../Routes";
import { Header } from "../components/header";
import { MenuItem } from "../components/menu-item";
import { MenuItemSwitch } from "../components/menu-item-switch";
import { getSystemProperties, setProxy, updateJbossProperties } from "../lib/utils";

export function MainPage() {

  const [proxyValue, setProxyValue] = useState(true)

  useEffect(() => {
    getInitialStateSwitch()
  }, [])

  async function openFileInSystemEditor() {
    try {
      const response = await invoke('open_file_system', {
        path: 'C:\\el\\projetos\\wildfly-24.0.0.Final\\standalone\\configuration\\standalone.xml'
      })

      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  function handlePageDataBase() {
    router.navigate("/database")
  }

  function handlePageModules() {
    router.navigate("/modules")
  }

  function handleToggleProxy(checkedValue: boolean) {
    setProxy(checkedValue).then(() => {
      setProxyValue(checkedValue)
      updateJbossProperties("S3useProxy", "value", checkedValue.toString())
    }).catch((err) => {
      console.log(err)
      sendNotification({ title: "Houve um erro ao mudar o proxy!", body: "Não foi possivel fazer a alteração do uso do proxy no standalone!" })
    })
  }

  async function getInitialStateSwitch() {
    let state = await getSystemProperties()
    let property = state.find((item) => item._name == "S3useProxy")
    let propertyBool = (property?._value == "true" ? true : false)
    setProxyValue(propertyBool)
  }

  return (

    <div className="w-full h-screen flex flex-col">
      <Header configButton />
      <motion.div
        initial={{ opacity: 0, translateX: -20 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.2 }}
        className="flex-1 flex flex-col justify-between"
      >
        <div className="flex flex-col justify-end p-4 gap-1">

          <MenuItem label="Banco de Dados" icon={Database} onClick={handlePageDataBase} />
          <MenuItem label="Módulos" icon={SquaresFour} onClick={handlePageModules} />
          <MenuItem label="Abrir o Standalone" icon={FileX} onClick={openFileInSystemEditor} />
          <MenuItemSwitch label="Proxy" icon={Network} onCheck={handleToggleProxy} value={proxyValue} />
          {/* <Separator /> */}
          {/* <MenuItem label="Mais sobre o Wildtray" icon={Info} onClick={() => { }} /> */}
          {/* <MenuItem label="Buscar Atualizações" icon={CloudDownload} onClick={() => { }} /> */}
          {/* <Separator /> */}

          {/* <MenuItem label="Configurações" icon={Settings} onClick={() => { }} /> */}

        </div>
        <div className="flex flex-col p-3 gap-1 bg-black/20">
          <MenuItem label="Sair do Wildtray" icon={Power} onClick={() => { emit("quit") }} />
        </div>
      </motion.div>
    </div>
  )
}