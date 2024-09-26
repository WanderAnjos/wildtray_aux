import { Config } from '@/types/cfg';
import { CheckCircle, Database } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { Header } from "../components/header";
import { cn, getFileConfig, setDataBase } from '../lib/utils';
import { getDataBases } from '../server/server';

export interface dataBaseProps {
  id: string
  dataBaseName: string
  checked?: boolean
}

export function DataBasePage() {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [dataBases, setDataBases] = useState<dataBaseProps[]>([])

  useEffect(() => {

    getFileConfig().then((file) => {

      setLoading(true)

      const props: Config = file;

      console.log(props)

      getDataBases({
        host: props.connection.host,
        user: props.connection.user,
        password: props.connection.password,
        database: props.connection.dbname,
        port: props.connection.port
      }).then((data) => {
        setDataBases(data)
      }).catch((err) => {
        setError(err)
        console.log(err)
      }).finally(() => {
        setLoading(false)
      })

    })
  }, [])

  function handleSetDataBases(dbName: string) {
    setDataBase(dbName)

    let newDataBases: dataBaseProps[] = dataBases.map((item) => {
      item.checked = (item.id == dbName)

      return item
    })

    setDataBases(newDataBases)
  }

  return (
    <div className="flex flex-col w-full max-h-screen pb-2">
      <Header homeButton configButton />

      {loading && (
        <div className='w-full h-full flex items-center justify-center'>
          <ReactLoading type="bubbles" color='#3b82f6' />
        </div>
      )}

      {!error && !loading && (
        <div className="text-center">
          <p className="text-sm text-accent font-medium">Lista de bancos</p>
        </div>
      )}

      <div className='h-svh overflow-y-auto p-2'>
        <div className="h-full overflow-y-auto">
          {error && !loading && (
            <div className='flex flex-col justify-center items-center gap-1 p-3'>
              {/* <Frown className='w-10 h-10 text-red-500' /> */}
              <div className='text-xl text-accent text-center'>Erro ao conectar com o banco!</div>
              <div className='mt-2 text-accent text-center text-sm'>verifique as informações e o uso da <span className='font-bold'>VPN</span> se necessário!</div>
            </div>
          )}

          {!loading && dataBases.map((item) => (
            <motion.div key={item.id}
              initial={{ opacity: 0, translateX: -20 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div
                onClick={() => handleSetDataBases(item.dataBaseName)}
                key={item.id}
                className={cn('relative m-1 text-accent p-2 font-medium rounded text-sm flex gap-1 items-center justify-between hover:bg-white/5 group', item.checked && 'bg-white/5 text-muted')}
              >
                <span className={cn("w-1 h-5 group-hover:bg-blue-500 rounded-md absolute left-0 group-active:h-4 transition", item.checked && 'bg-blue-500')}></span>
                <div className='flex items-center gap-2'>
                  <Database weight='light' className='w-4 h-4' />
                  {item.dataBaseName}
                </div>
                <div>{item.checked && <CheckCircle weight='light' className='w-4 h-4' />}</div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div >


  )
}