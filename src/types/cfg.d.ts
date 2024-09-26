
export type Config = {
   connection: Connection
}

type Connection = {
   host: string
   port: number
   user: string
   password: string
   dbname: string
}