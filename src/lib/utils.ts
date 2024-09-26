import { ModuleProps } from "@/pages/modules.page";
import { Config } from "@/types/cfg";
import { Property, StandaloneProps } from "@/types/sys";
import { BaseDirectory, createDir, exists, readTextFile, writeFile, writeTextFile } from "@tauri-apps/api/fs";
import { Command } from "@tauri-apps/api/shell";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import X2JS from "x2js";
import XmlBeautify from "xml-beautify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getFileConfig() {

  try {
    const dirExists = await exists('config.json', { dir: BaseDirectory.App });

    if (!dirExists) {
      await createDir('', { dir: BaseDirectory.App, recursive: true });
    }

    const data = await readTextFile('config.json', { dir: BaseDirectory.App })
    return JSON.parse(data)

  } catch (error) {

    console.log(error)

    if (typeof error === 'string' && error.includes('(os error 2)')) {

      let obj = {
        connection: {
          host: "localhost",
          port: 5432,
          user: "postgres",
          password: "elerp",
          dbname: "postgres"
        }
      }

      writeFile('config.json', JSON.stringify(obj), { dir: BaseDirectory.App }).then(() => {
        console.log("terminei")
        return obj;
      }).catch((err) => {
        console.log(err)
      })

    } else {
      console.log(error)
    }
  }
}

export async function getFileContent(filePath: string): Promise<string> {
  try {
    const xmlContent = await readTextFile(filePath)
    return xmlContent
  } catch (error) {
    throw error;
  }
}

export async function setProxy(value: boolean) {

  let filePath = 'C:\\el\\projetos\\wildfly-24.0.0.Final\\standalone\\configuration\\standalone.xml';
  let file = await getFileContent(filePath)

  if (file != null) {

    let x2js = new X2JS()
    let jsonXML: StandaloneProps = x2js.xml2js(file)

    jsonXML.server["system-properties"].property.forEach((prop) => {
      if (prop._name === "S3useProxy") {
        prop._value = value.toString()
      }
    })

    let xmlJson = x2js.js2xml(jsonXML)
    let xmlJsonFormated = new XmlBeautify().beautify(xmlJson, {
      ident: "  ",
      useSelfClosingElement: true
    })

    await writeTextFile(filePath, xmlJsonFormated)

  }

}

export async function getModules(): Promise<ModuleProps[]> {

  let filePath = 'C:\\el\\projetos\\wildfly-24.0.0.Final\\standalone\\configuration\\standalone.xml';
  let file = await getFileContent(filePath)
  let modules: ModuleProps[] = [];

  if (file != null) {

    let x2js = new X2JS()
    let jsonXML: StandaloneProps = x2js.xml2js(file)

    let filteredValues = jsonXML.server["system-properties"].property.filter((item) => {
      return item._name.includes("client.rhf") && item._name.endsWith(".mode")
    })

    filteredValues.forEach((item) => {
      let module: ModuleProps = {
        id: item._name,
        name: item._name.split(".")[1],
        mode: item._value
      }

      modules.push(module)
    })
  }

  return modules

}

export async function setModule(id: string, value: string) {

  let filePath = 'C:\\el\\projetos\\wildfly-24.0.0.Final\\standalone\\configuration\\standalone.xml';
  let file = await getFileContent(filePath)

  if (file != null) {

    let x2js = new X2JS()
    let jsonXML: StandaloneProps = x2js.xml2js(file)

    jsonXML.server["system-properties"].property.forEach((prop) => {
      if (prop._name === id) {
        prop._value = value.toString()
      }
    })

    let xmlJson = x2js.js2xml(jsonXML)
    let xmlJsonFormated = new XmlBeautify().beautify(xmlJson, {
      ident: "  ",
      useSelfClosingElement: true
    })

    await writeTextFile(filePath, xmlJsonFormated)

  }

}

export async function getSystemProperties(): Promise<Property[]> {

  let filePath = 'C:\\el\\projetos\\wildfly-24.0.0.Final\\standalone\\configuration\\standalone.xml';
  let file = await getFileContent(filePath)

  if (file != null) {

    let x2js = new X2JS()
    let jsonXML: StandaloneProps = x2js.xml2js(file)

    return jsonXML.server["system-properties"].property

  }

  return []

}

export async function setDataBase(dbname: string) {

  let connection = {
    host: 'localhost',
    user: 'postgres',
    password: 'elerp',
    port: 5432,
    database: 'postgres'
  }

  let filePath = 'C:\\el\\projetos\\wildfly-24.0.0.Final\\standalone\\configuration\\standalone.xml';
  let file = await getFileContent(filePath)

  if (file != null) {

    let x2js = new X2JS()
    let jsonXML: StandaloneProps = x2js.xml2js(file)

    jsonXML.server["system-properties"].property.forEach((prop) => {

      getFileConfig().then(async (file) => {

        const props: Config = file;

        switch (prop._name) {
          case "database.user":
            prop._value = props.connection.user
            break;
          case "database.user.jasper":
            prop._value = props.connection.user
            break;
          case "database.pw":
            prop._value = props.connection.password
            break;
          case "database.pw.jasper":
            prop._value = props.connection.password
            break;
          case "database.url":
            prop._value = `jdbc:postgresql://${props.connection.host}:${props.connection.port}/${dbname}`
            break;
          case "database.url.jasper":
            prop._value = `jdbc:postgresql://${props.connection.host}:${props.connection.port}/${dbname}`
            break;
        }


        jsonXML.server.profile.subsystem.forEach((subsystem) => {
          if (subsystem._xmlns == "urn:jboss:domain:datasources:6.0") {
            subsystem.datasources.datasource.forEach((datasource) => {
              if (datasource['driver-class'] == 'org.postgresql.Driver') {
                datasource['connection-url'] = `jdbc:postgresql://${props.connection.host}:${props.connection.port}/${dbname}`
                datasource.security['user-name'] = props.connection.user
                datasource.security.password = props.connection.password
              }
            })
          }
        })

        let xmlJson = x2js.js2xml(jsonXML)
        let xmlJsonFormated = new XmlBeautify().beautify(xmlJson, {
          ident: "  ",
          useSelfClosingElement: true
        })

        await writeTextFile(filePath, xmlJsonFormated)

      });
    })

  }
}

export async function updateJbossProperties(id: string, key: string, value: string) {
  const cliCommand = `/system-property=${id}:write-attribute(name=${key}, value=${value})`;
  const args = ['--connect', cliCommand];

  const cmd = new Command('jboss-cli', args);

  try {
    await cmd.execute();
  } catch (error) {
    console.log(error)
  }
}

