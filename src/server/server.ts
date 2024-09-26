import Database from "tauri-plugin-sql-api";
import { getSystemProperties } from "../lib/utils";
import { dataBaseProps } from "../pages/database-page";

export interface DataBaseProps {
  host: string,
  user: string,
  password: string,
  port: number,
  database: string
}

async function connect(connection: DataBaseProps): Promise<Database> {

  let dsn = `postgres://${connection.user}:${connection.password}@${connection.host}:${connection.port}/${connection.database}`;

  console.log(dsn)

  let db: Database = await Database.load(dsn)
  return db
}


export async function getDataBases(connection: DataBaseProps): Promise<dataBaseProps[]> {

  let fileSystem = await getSystemProperties()
  let dbFileSystem;

  fileSystem.forEach((item) => {
    if (item._name == "database.url") {
      dbFileSystem = item._value
    }
  })

  let db = await connect(connection)

  let query = "SELECT datname FROM pg_database where datname not in ('postgres') and datname not ilike '%template%' order by datname desc";

  let databases = await db.select<{ datname: string }[]>(query)

  let response: dataBaseProps[] = databases.map((item) => {
    return {
      id: item.datname,
      dataBaseName: item.datname,
      checked: (dbFileSystem && dbFileSystem.endsWith(item.datname))
    }
  })

  return response;
} 