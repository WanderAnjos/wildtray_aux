type Property = {
  _name: string
  _value: string
}

type SystemProperties = {
  property: Property[]
}

type Server = {
  extensions: Extensions
  'system-properties': SystemProperties
  profile: XmlElement
}

export type StandaloneProps = {
  server: Server
}

export type XmlElement = {
  'subsystem': Subsystem[]
}

type ManagedThreadFactory = {
  name: string
  'jndi-name': string
  'context-service': string
}

type ManagedExecutorService = {
  name: string
  'jndi-name': string
  'context-service': string
  'hung-task-termination-period': string
  'hung-task-threshold': string
  'keepalive-time': string
}

type ManagedScheduledExecutorService = {
  name: string
  'jndi-name': string
  'context-service': string
  'hung-task-termination-period': string
  'hung-task-threshold': string
  'keepalive-time': string
}

type DefaultBindings = {
  'context-service': string
  datasource: string
  'managed-executor-service': string
  'managed-scheduled-executor-service': string
  'managed-thread-factory': string
}

type ConcurrencySubsystem = {
  'managed-thread-factories'?: ManagedThreadFactory[]
  'managed-executor-services'?: ManagedExecutorService[]
  'managed-scheduled-executor-services'?: ManagedScheduledExecutorService[]
  'default-bindings'?: DefaultBindings
}

type EESecuritySubsystem = {}

type EJB3SessionBean = {
  stateless: {
    'bean-instance-pool-ref': {
      'pool-name': string
    }
  }
  stateful: {
    'default-access-timeout': string
    'cache-ref': string
    'passivation-disabled-cache-ref': string
  }
  singleton: {
    'default-access-timeout': string
  }
}

type BeanInstancePool = {
  name: string
  'derive-size': string
  'instance-acquisition-timeout': string
  'instance-acquisition-timeout-unit': string
}

type EJB3Pools = {
  'bean-instance-pools': {
    'strict-max-pool': BeanInstancePool[]
  }
}

type Cache = {
  name: string
}

type Caches = {
  cache: Cache[]
}

type PassivationStore = {
  name: string
  'cache-container': string
  'max-size': string
}

type PassivationStores = {
  'passivation-store': PassivationStore[]
}

type Remote = {
  cluster: string
  connectors: string
  'thread-pool-name': string
}

type ChannelCreationOptions = {
  option: {
    name: string
    value: string
    type: string
  }
}

type ThreadPools = {
  'thread-pool': {
    name: string
    'max-threads': {
      count: string
    }
    'keepalive-time': {
      time: string
      unit: string
    }
  }[]
}

type DefaultSecurityDomain = {
  value: string
}

type DefaultMissingMethodPermissionsDenyAccess = {
  value: boolean
}

type LogSystemExceptions = {
  value: boolean
}

type EJB3Subsystem = {
  'session-bean': EJB3SessionBean
  pools: EJB3Pools
  caches: Caches
  'passivation-stores': PassivationStores
  async: {
    'thread-pool-name': string
  }
  'timer-service': {
    'thread-pool-name': string
    'default-data-store': string
  }
  remote: Remote
  'thread-pools': ThreadPools
  'default-security-domain': DefaultSecurityDomain
  'default-missing-method-permissions-deny-access': DefaultMissingMethodPermissionsDenyAccess
  statistics: {
    enabled: string
  }
  'log-system-exceptions': LogSystemExceptions
}

type ElytronProviders = {
  'aggregate-providers': {
    name: string
    providers: {
      name: string
    }[]
  }
  'provider-loader': {
    name: string
    module: string
  }[]
}

type FileAuditLog = {
  name: string
  path: string
  'relative-to': string
  format: string
}

type AuditLogging = {
  'file-audit-log': FileAuditLog[]
}

type Realm = {
  name: string
  'role-decoder': string
}

type SecurityDomain = {
  name: string
  'default-realm': string
  'permission-mapper': string
  'role-mapper'?: string
}

type SecurityDomains = {
  'security-domain': SecurityDomain[]
}

type IdentityRealm = {
  name: string
  identity: string
}

type UsersProperties = {
  path: string
  'relative-to': string
  'digest-realm-name': string
}

type GroupsProperties = {
  path: string
  'relative-to': string
}

type PropertiesRealm = {
  'users-properties': UsersProperties
  'groups-properties': GroupsProperties
}

type Realms = {
  'identity-realm'?: IdentityRealm[]
  'properties-realm': PropertiesRealm[]
}

type Principal = {
  name: string
}

type PermissionSet = {
  name: string
}

type PermissionMapping = {
  principal?: Principal
  'permission-set'?: PermissionSet
  'match-all'?: boolean
}

type PermissionSets = {
  'permission-set': PermissionSet[]
}

type HttpAuthenticationFactory = {
  name: string
  'security-domain': string
  'http-server-mechanism-factory': string
}

type Mechanism = {
  'mechanism-name': string
  'mechanism-realm'?: {
    'realm-name': string
  }
}

type MechanismConfiguration = {
  mechanism: Mechanism[]
}

type SaslAuthenticationFactory = {
  name: string
  'sasl-server-factory': string
  'security-domain': string
}

type ConfigurableSaslServerFactory = {
  name: string
  'sasl-server-factory': string
  properties: {
    property: {
      name: string
      value: string
    }[]
  }
}

type MechanismProviderFilteringSaslServerFactory = {
  name: string
  'sasl-server-factory': string
  filters: {
    filter: {
      'provider-name': string
    }[]
  }
}

type ProviderSaslServerFactory = {
  name: string
}

type Sasl = {
  'sasl-authentication-factory': SaslAuthenticationFactory[]
  'configurable-sasl-server-factory': ConfigurableSaslServerFactory[]
  'mechanism-provider-filtering-sasl-server-factory': MechanismProviderFilteringSaslServerFactory[]
  'provider-sasl-server-factory': ProviderSaslServerFactory[]
}

type KeyStore = {
  name: string
  'credential-reference': {
    'clear-text'?: string
  }
  implementation: string
  file: {
    path: string
    'relative-to': string
  }
}

type KeyManager = {
  name: string
  'key-store': string
  'generate-self-signed-certificate-host'?: string
  'credential-reference': {
    'clear-text'?: string
  }
}

type ServerSSLContext = {
  name: string
  'key-manager': string
}

type TLS = {
  'key-stores': {
    'key-store': KeyStore[]
  }
  'key-managers': {
    'key-manager': KeyManager[]
  }
  'server-ssl-contexts': {
    'server-ssl-context': ServerSSLContext[]
  }
}

type HealthSubsystem = {
  'security-enabled': boolean
}

type CacheContainer = {
  name: string
  'default-cache': string
  marshaller: string
  aliases: string
  modules: string
}

type FileStore = {
  passivation: boolean
  purge: boolean
}

type CacheContainerConfig = {
  'local-cache': {
    name: string
    'file-store': FileStore
  }[]
}

type InfinispanSubsystem = {
  'cache-container': CacheContainer[]
}

type IOSubsystem = {
  worker: {
    name: string
  }[]
  'buffer-pool': {
    name: string
  }[]
}

type JaxRSSubsystem = {}

type MailSession = {
  name: string
  'jndi-name': string
  'smtp-server': {
    'outbound-socket-binding-ref': string
  }
}

type MailSubsystem = {
  'mail-session': MailSession[]
}

type MetricsSubsystem = {
  'security-enabled': boolean
  'exposed-subsystems': string
  prefix: string
}

type MicroProfileConfigSmallRyeSubsystem = {}

type MicroProfileJWTSmallRyeSubsystem = {}

type MicroProfileOpenTracingSmallRyeSubsystem = {
  'default-tracer': string
  'jaeger-tracer': {
    name: string
    'sampler-configuration': {
      'sampler-type': string
      'sampler-param': string
    }
  }
}

type NamingSubsystem = {
  'remote-naming': string
}

type JCAArchiveValidation = {
  enabled: boolean
  'fail-on-error': boolean
  'fail-on-warn': boolean
}

type JCABeanValidation = {
  enabled: boolean
}

type ShortRunningThreads = {
  'core-threads': {
    count: string
  }
  'queue-length': {
    count: string
  }
  'max-threads': {
    count: string
  }
  'keepalive-time': {
    time: string
    unit: string
  }
}

type LongRunningThreads = {
  'core-threads': {
    count: string
  }
  'queue-length': {
    count: string
  }
  'max-threads': {
    count: string
  }
  'keepalive-time': {
    time: string
    unit: string
  }
}

type DefaultWorkManager = {
  'short-running-threads': ShortRunningThreads
  'long-running-threads': LongRunningThreads
}

type CachedConnectionManager = {}

type JCASubsystem = {
  'archive-validation': JCAArchiveValidation
  'bean-validation': JCABeanValidation
  'default-workmanager': DefaultWorkManager
  'cached-connection-manager': CachedConnectionManager
}

type JDRSubsystem = {}

type JMXSubsystem = {
  'expose-resolved-model': string
  'expose-expression-model': string
  'remoting-connector': string
}

type JPASubsystem = {
  jpa: {
    'default-extended-persistence-inheritance': string
  }
}

type JSFSubsystem = {}

type MailServer = {
  name: string
  'outbound-socket-binding-ref': string
}

type MailServerSubsystem = {
  'mail-session': MailServer[]
}

type MetricsSubsystem2 = {
  'security-enabled': boolean
  'exposed-subsystems': string
  prefix: string
}

type MicroProfileConfigSmallRyeSubsystem2 = {}

type MicroProfileJWTSmallRyeSubsystem2 = {}

type MicroProfileOpenTracingSmallRyeSubsystem2 = {
  'default-tracer': string
  'jaeger-tracer': {
    name: string
    'sampler-configuration': {
      'sampler-type': string
      'sampler-param': string
    }
  }
}

type NamingSubsystem2 = {
  'remote-naming': string
}

type PojoSubsystem = {}

type RemotingHttpConnector = {
  name: string
  'connector-ref': string
  'security-realm': string
}

type RequestControllerSubsystem = {}

type ResourceAdaptersSubsystem = {}

type SARSusbystem = {}

type SecuritySubsystem = {
  'security-domains': {
    'security-domain': {
      name: string
      'cache-type': string
      authorization?: {
        'policy-module': {
          code: string
          flag: string
        }
      }
      'authentication-jaspi'?: {
        'login-module-stack': {
          name: string
          'login-module': {
            code: string
            flag: string
          }
        }
        'auth-module': {
          code: string
        }
      }
      authentication?: {
        'login-module': {
          code: string
          flag: string
          'module-option'?: {
            name: string
            value: string
          }
        }[]
      }
    }[]
  }
}

type DeploymentPermissions = {
  'maximum-set': {
    permission: {
      class: string
    }
  }
}

type SecurityManagerSubsystem = {
  'deployment-permissions': DeploymentPermissions
}

type CoreEnvironment = {
  'node-identifier'?: string
}

type RecoveryEnvironment = {
  'socket-binding': string
  'status-socket-binding': string
}

type CoordinatorEnvironment = {
  'statistics-enabled'?: string
  'default-timeout': string
}

type ObjectStore = {
  path: string
  'relative-to': string
}

type TransactionsSubsystem = {
  'core-environment': CoreEnvironment
  'recovery-environment': RecoveryEnvironment
  'coordinator-environment': CoordinatorEnvironment
  'object-store': ObjectStore
}

type DefaultServer = {
  name: string
  'default-virtual-host': string
  'default-servlet-container': string
  'default-security-domain': string
  'statistics-enabled': string
}

type BufferCache = {
  name: string
}

type HttpListener = {
  name: string
  'socket-binding': string
  'redirect-socket'?: string
  'enable-http2': boolean
}

type HttpsListener = {
  name: string
  'socket-binding': string
  'security-realm': string
  'enable-http2': boolean
}

type Location = {
  name: string
  handler: string
}

type FilterRef = {
  name: string
  predicate: string
}

type Host = {
  name: string
  'alias'?: string
  'default-web-module'?: string
  'http-listener'?: string
  'https-listener'?: string
  location: Location[]
  'filter-ref'?: FilterRef[]
}

type Filter = {
  name: string
  'module-ref': string
}

type FilterModule = {
  'filter': Filter[]
}

type VirtualServer = {
  name: string
  'default-web-module': string
  host: Host[]
}

type UndertowSubsystem = {
  'buffer-cache': BufferCache[]
  'server': DefaultServer[]
  'servlet-container': {
    name: string
  }[]
  'http-listener': HttpListener[]
  'https-listener': HttpsListener[]
  'location': Location[]
  'filter': FilterModule[]
  'virtual-server': VirtualServer[]
}

type WebSubsystem = {
  'server': {
    name: string
    'default-web-module': string
    'http-listener'?: string
    'host'?: {
      name: string
      'alias'?: string
      'default-web-module'?: string
    }[]
  }[]
}

type WebServicesSubsystem = {
  'wsdl-host': string
  'endpoint-config': string
}

type Extensions = {
  extension: {
    module: string
    'inherited-module'?: string
  }[]
}

type Subsystem = {
  '_xmlns': string
  'datasources': {
    'datasource': {
      'connection-url': string
      'security': {
        'user-name': string
        'password': string
      }
    }[]
  }
  'concurrency-subsystem'?: ConcurrencySubsystem
  'ee-security-subsystem'?: EESecuritySubsystem
  'ejb3-subsystem'?: EJB3Subsystem
  'elytron-providers'?: ElytronProviders
  'audit-logging'?: AuditLogging
  'realm'?: Realm[]
  'security-domains'?: SecurityDomains
  'realms'?: Realms
  'permission-mapping'?: PermissionMapping[]
  'sasl'?: Sasl
  'tls'?: TLS
  'health-subsystem'?: HealthSubsystem
  'infinispan-subsystem'?: InfinispanSubsystem
  'io-subsystem'?: IOSubsystem
  'jaxrs-subsystem'?: JaxRSSubsystem
  'mail-subsystem'?: MailSubsystem
  'metrics-subsystem'?: MetricsSubsystem
  'microprofile-config-smallrye-subsystem'?: MicroProfileConfigSmallRyeSubsystem
  'microprofile-jwt-smallrye-subsystem'?: MicroProfileJWTSmallRyeSubsystem
  'microprofile-opentracing-smallrye-subsystem'?: MicroProfileOpenTracingSmallRyeSubsystem
  'naming-subsystem'?: NamingSubsystem
  'pojo-subsystem'?: PojoSubsystem
  'remoting-http-connector'?: RemotingHttpConnector
  'request-controller-subsystem'?: RequestControllerSubsystem
  'resource-adapters-subsystem'?: ResourceAdaptersSubsystem
  'sar-subsystem'?: SARSusbystem
  'security-subsystem'?: SecuritySubsystem
  'security-manager-subsystem'?: SecurityManagerSubsystem
  'transactions-subsystem'?: TransactionsSubsystem
  'undertow-subsystem'?: UndertowSubsystem
  'web-subsystem'?: WebSubsystem
  'web-services-subsystem'?: WebServicesSubsystem
}

export type XmlStructure = {
  'subsystem': Subsystem[]
}
