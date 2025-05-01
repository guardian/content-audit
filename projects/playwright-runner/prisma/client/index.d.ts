
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model audit_page_run
 * Represents an audit run against a particular page
 */
export type audit_page_run = $Result.DefaultSelection<Prisma.$audit_page_runPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Audit_page_runs
 * const audit_page_runs = await prisma.audit_page_run.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Audit_page_runs
   * const audit_page_runs = await prisma.audit_page_run.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.audit_page_run`: Exposes CRUD operations for the **audit_page_run** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Audit_page_runs
    * const audit_page_runs = await prisma.audit_page_run.findMany()
    * ```
    */
  get audit_page_run(): Prisma.audit_page_runDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    audit_page_run: 'audit_page_run'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "audit_page_run"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      audit_page_run: {
        payload: Prisma.$audit_page_runPayload<ExtArgs>
        fields: Prisma.audit_page_runFieldRefs
        operations: {
          findUnique: {
            args: Prisma.audit_page_runFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_page_runPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.audit_page_runFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_page_runPayload>
          }
          findFirst: {
            args: Prisma.audit_page_runFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_page_runPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.audit_page_runFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_page_runPayload>
          }
          findMany: {
            args: Prisma.audit_page_runFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_page_runPayload>[]
          }
          create: {
            args: Prisma.audit_page_runCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_page_runPayload>
          }
          createMany: {
            args: Prisma.audit_page_runCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.audit_page_runCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_page_runPayload>[]
          }
          delete: {
            args: Prisma.audit_page_runDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_page_runPayload>
          }
          update: {
            args: Prisma.audit_page_runUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_page_runPayload>
          }
          deleteMany: {
            args: Prisma.audit_page_runDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.audit_page_runUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.audit_page_runUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_page_runPayload>[]
          }
          upsert: {
            args: Prisma.audit_page_runUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$audit_page_runPayload>
          }
          aggregate: {
            args: Prisma.Audit_page_runAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAudit_page_run>
          }
          groupBy: {
            args: Prisma.audit_page_runGroupByArgs<ExtArgs>
            result: $Utils.Optional<Audit_page_runGroupByOutputType>[]
          }
          count: {
            args: Prisma.audit_page_runCountArgs<ExtArgs>
            result: $Utils.Optional<Audit_page_runCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    audit_page_run?: audit_page_runOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model audit_page_run
   */

  export type AggregateAudit_page_run = {
    _count: Audit_page_runCountAggregateOutputType | null
    _avg: Audit_page_runAvgAggregateOutputType | null
    _sum: Audit_page_runSumAggregateOutputType | null
    _min: Audit_page_runMinAggregateOutputType | null
    _max: Audit_page_runMaxAggregateOutputType | null
  }

  export type Audit_page_runAvgAggregateOutputType = {
    id: number | null
  }

  export type Audit_page_runSumAggregateOutputType = {
    id: number | null
  }

  export type Audit_page_runMinAggregateOutputType = {
    id: number | null
    created_at: Date | null
    url: string | null
  }

  export type Audit_page_runMaxAggregateOutputType = {
    id: number | null
    created_at: Date | null
    url: string | null
  }

  export type Audit_page_runCountAggregateOutputType = {
    id: number
    created_at: number
    url: number
    _all: number
  }


  export type Audit_page_runAvgAggregateInputType = {
    id?: true
  }

  export type Audit_page_runSumAggregateInputType = {
    id?: true
  }

  export type Audit_page_runMinAggregateInputType = {
    id?: true
    created_at?: true
    url?: true
  }

  export type Audit_page_runMaxAggregateInputType = {
    id?: true
    created_at?: true
    url?: true
  }

  export type Audit_page_runCountAggregateInputType = {
    id?: true
    created_at?: true
    url?: true
    _all?: true
  }

  export type Audit_page_runAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which audit_page_run to aggregate.
     */
    where?: audit_page_runWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audit_page_runs to fetch.
     */
    orderBy?: audit_page_runOrderByWithRelationInput | audit_page_runOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: audit_page_runWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audit_page_runs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audit_page_runs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned audit_page_runs
    **/
    _count?: true | Audit_page_runCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Audit_page_runAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Audit_page_runSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Audit_page_runMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Audit_page_runMaxAggregateInputType
  }

  export type GetAudit_page_runAggregateType<T extends Audit_page_runAggregateArgs> = {
        [P in keyof T & keyof AggregateAudit_page_run]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAudit_page_run[P]>
      : GetScalarType<T[P], AggregateAudit_page_run[P]>
  }




  export type audit_page_runGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: audit_page_runWhereInput
    orderBy?: audit_page_runOrderByWithAggregationInput | audit_page_runOrderByWithAggregationInput[]
    by: Audit_page_runScalarFieldEnum[] | Audit_page_runScalarFieldEnum
    having?: audit_page_runScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Audit_page_runCountAggregateInputType | true
    _avg?: Audit_page_runAvgAggregateInputType
    _sum?: Audit_page_runSumAggregateInputType
    _min?: Audit_page_runMinAggregateInputType
    _max?: Audit_page_runMaxAggregateInputType
  }

  export type Audit_page_runGroupByOutputType = {
    id: number
    created_at: Date | null
    url: string | null
    _count: Audit_page_runCountAggregateOutputType | null
    _avg: Audit_page_runAvgAggregateOutputType | null
    _sum: Audit_page_runSumAggregateOutputType | null
    _min: Audit_page_runMinAggregateOutputType | null
    _max: Audit_page_runMaxAggregateOutputType | null
  }

  type GetAudit_page_runGroupByPayload<T extends audit_page_runGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Audit_page_runGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Audit_page_runGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Audit_page_runGroupByOutputType[P]>
            : GetScalarType<T[P], Audit_page_runGroupByOutputType[P]>
        }
      >
    >


  export type audit_page_runSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    url?: boolean
  }, ExtArgs["result"]["audit_page_run"]>

  export type audit_page_runSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    url?: boolean
  }, ExtArgs["result"]["audit_page_run"]>

  export type audit_page_runSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    url?: boolean
  }, ExtArgs["result"]["audit_page_run"]>

  export type audit_page_runSelectScalar = {
    id?: boolean
    created_at?: boolean
    url?: boolean
  }

  export type audit_page_runOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "created_at" | "url", ExtArgs["result"]["audit_page_run"]>

  export type $audit_page_runPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "audit_page_run"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      created_at: Date | null
      /**
       * The URL of the page that ran
       */
      url: string | null
    }, ExtArgs["result"]["audit_page_run"]>
    composites: {}
  }

  type audit_page_runGetPayload<S extends boolean | null | undefined | audit_page_runDefaultArgs> = $Result.GetResult<Prisma.$audit_page_runPayload, S>

  type audit_page_runCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<audit_page_runFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Audit_page_runCountAggregateInputType | true
    }

  export interface audit_page_runDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['audit_page_run'], meta: { name: 'audit_page_run' } }
    /**
     * Find zero or one Audit_page_run that matches the filter.
     * @param {audit_page_runFindUniqueArgs} args - Arguments to find a Audit_page_run
     * @example
     * // Get one Audit_page_run
     * const audit_page_run = await prisma.audit_page_run.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends audit_page_runFindUniqueArgs>(args: SelectSubset<T, audit_page_runFindUniqueArgs<ExtArgs>>): Prisma__audit_page_runClient<$Result.GetResult<Prisma.$audit_page_runPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Audit_page_run that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {audit_page_runFindUniqueOrThrowArgs} args - Arguments to find a Audit_page_run
     * @example
     * // Get one Audit_page_run
     * const audit_page_run = await prisma.audit_page_run.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends audit_page_runFindUniqueOrThrowArgs>(args: SelectSubset<T, audit_page_runFindUniqueOrThrowArgs<ExtArgs>>): Prisma__audit_page_runClient<$Result.GetResult<Prisma.$audit_page_runPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Audit_page_run that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_page_runFindFirstArgs} args - Arguments to find a Audit_page_run
     * @example
     * // Get one Audit_page_run
     * const audit_page_run = await prisma.audit_page_run.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends audit_page_runFindFirstArgs>(args?: SelectSubset<T, audit_page_runFindFirstArgs<ExtArgs>>): Prisma__audit_page_runClient<$Result.GetResult<Prisma.$audit_page_runPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Audit_page_run that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_page_runFindFirstOrThrowArgs} args - Arguments to find a Audit_page_run
     * @example
     * // Get one Audit_page_run
     * const audit_page_run = await prisma.audit_page_run.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends audit_page_runFindFirstOrThrowArgs>(args?: SelectSubset<T, audit_page_runFindFirstOrThrowArgs<ExtArgs>>): Prisma__audit_page_runClient<$Result.GetResult<Prisma.$audit_page_runPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Audit_page_runs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_page_runFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Audit_page_runs
     * const audit_page_runs = await prisma.audit_page_run.findMany()
     * 
     * // Get first 10 Audit_page_runs
     * const audit_page_runs = await prisma.audit_page_run.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const audit_page_runWithIdOnly = await prisma.audit_page_run.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends audit_page_runFindManyArgs>(args?: SelectSubset<T, audit_page_runFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$audit_page_runPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Audit_page_run.
     * @param {audit_page_runCreateArgs} args - Arguments to create a Audit_page_run.
     * @example
     * // Create one Audit_page_run
     * const Audit_page_run = await prisma.audit_page_run.create({
     *   data: {
     *     // ... data to create a Audit_page_run
     *   }
     * })
     * 
     */
    create<T extends audit_page_runCreateArgs>(args: SelectSubset<T, audit_page_runCreateArgs<ExtArgs>>): Prisma__audit_page_runClient<$Result.GetResult<Prisma.$audit_page_runPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Audit_page_runs.
     * @param {audit_page_runCreateManyArgs} args - Arguments to create many Audit_page_runs.
     * @example
     * // Create many Audit_page_runs
     * const audit_page_run = await prisma.audit_page_run.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends audit_page_runCreateManyArgs>(args?: SelectSubset<T, audit_page_runCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Audit_page_runs and returns the data saved in the database.
     * @param {audit_page_runCreateManyAndReturnArgs} args - Arguments to create many Audit_page_runs.
     * @example
     * // Create many Audit_page_runs
     * const audit_page_run = await prisma.audit_page_run.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Audit_page_runs and only return the `id`
     * const audit_page_runWithIdOnly = await prisma.audit_page_run.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends audit_page_runCreateManyAndReturnArgs>(args?: SelectSubset<T, audit_page_runCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$audit_page_runPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Audit_page_run.
     * @param {audit_page_runDeleteArgs} args - Arguments to delete one Audit_page_run.
     * @example
     * // Delete one Audit_page_run
     * const Audit_page_run = await prisma.audit_page_run.delete({
     *   where: {
     *     // ... filter to delete one Audit_page_run
     *   }
     * })
     * 
     */
    delete<T extends audit_page_runDeleteArgs>(args: SelectSubset<T, audit_page_runDeleteArgs<ExtArgs>>): Prisma__audit_page_runClient<$Result.GetResult<Prisma.$audit_page_runPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Audit_page_run.
     * @param {audit_page_runUpdateArgs} args - Arguments to update one Audit_page_run.
     * @example
     * // Update one Audit_page_run
     * const audit_page_run = await prisma.audit_page_run.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends audit_page_runUpdateArgs>(args: SelectSubset<T, audit_page_runUpdateArgs<ExtArgs>>): Prisma__audit_page_runClient<$Result.GetResult<Prisma.$audit_page_runPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Audit_page_runs.
     * @param {audit_page_runDeleteManyArgs} args - Arguments to filter Audit_page_runs to delete.
     * @example
     * // Delete a few Audit_page_runs
     * const { count } = await prisma.audit_page_run.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends audit_page_runDeleteManyArgs>(args?: SelectSubset<T, audit_page_runDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Audit_page_runs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_page_runUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Audit_page_runs
     * const audit_page_run = await prisma.audit_page_run.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends audit_page_runUpdateManyArgs>(args: SelectSubset<T, audit_page_runUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Audit_page_runs and returns the data updated in the database.
     * @param {audit_page_runUpdateManyAndReturnArgs} args - Arguments to update many Audit_page_runs.
     * @example
     * // Update many Audit_page_runs
     * const audit_page_run = await prisma.audit_page_run.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Audit_page_runs and only return the `id`
     * const audit_page_runWithIdOnly = await prisma.audit_page_run.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends audit_page_runUpdateManyAndReturnArgs>(args: SelectSubset<T, audit_page_runUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$audit_page_runPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Audit_page_run.
     * @param {audit_page_runUpsertArgs} args - Arguments to update or create a Audit_page_run.
     * @example
     * // Update or create a Audit_page_run
     * const audit_page_run = await prisma.audit_page_run.upsert({
     *   create: {
     *     // ... data to create a Audit_page_run
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Audit_page_run we want to update
     *   }
     * })
     */
    upsert<T extends audit_page_runUpsertArgs>(args: SelectSubset<T, audit_page_runUpsertArgs<ExtArgs>>): Prisma__audit_page_runClient<$Result.GetResult<Prisma.$audit_page_runPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Audit_page_runs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_page_runCountArgs} args - Arguments to filter Audit_page_runs to count.
     * @example
     * // Count the number of Audit_page_runs
     * const count = await prisma.audit_page_run.count({
     *   where: {
     *     // ... the filter for the Audit_page_runs we want to count
     *   }
     * })
    **/
    count<T extends audit_page_runCountArgs>(
      args?: Subset<T, audit_page_runCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Audit_page_runCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Audit_page_run.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Audit_page_runAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Audit_page_runAggregateArgs>(args: Subset<T, Audit_page_runAggregateArgs>): Prisma.PrismaPromise<GetAudit_page_runAggregateType<T>>

    /**
     * Group by Audit_page_run.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {audit_page_runGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends audit_page_runGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: audit_page_runGroupByArgs['orderBy'] }
        : { orderBy?: audit_page_runGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, audit_page_runGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAudit_page_runGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the audit_page_run model
   */
  readonly fields: audit_page_runFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for audit_page_run.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__audit_page_runClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the audit_page_run model
   */
  interface audit_page_runFieldRefs {
    readonly id: FieldRef<"audit_page_run", 'Int'>
    readonly created_at: FieldRef<"audit_page_run", 'DateTime'>
    readonly url: FieldRef<"audit_page_run", 'String'>
  }
    

  // Custom InputTypes
  /**
   * audit_page_run findUnique
   */
  export type audit_page_runFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_page_run
     */
    select?: audit_page_runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_page_run
     */
    omit?: audit_page_runOmit<ExtArgs> | null
    /**
     * Filter, which audit_page_run to fetch.
     */
    where: audit_page_runWhereUniqueInput
  }

  /**
   * audit_page_run findUniqueOrThrow
   */
  export type audit_page_runFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_page_run
     */
    select?: audit_page_runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_page_run
     */
    omit?: audit_page_runOmit<ExtArgs> | null
    /**
     * Filter, which audit_page_run to fetch.
     */
    where: audit_page_runWhereUniqueInput
  }

  /**
   * audit_page_run findFirst
   */
  export type audit_page_runFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_page_run
     */
    select?: audit_page_runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_page_run
     */
    omit?: audit_page_runOmit<ExtArgs> | null
    /**
     * Filter, which audit_page_run to fetch.
     */
    where?: audit_page_runWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audit_page_runs to fetch.
     */
    orderBy?: audit_page_runOrderByWithRelationInput | audit_page_runOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for audit_page_runs.
     */
    cursor?: audit_page_runWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audit_page_runs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audit_page_runs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of audit_page_runs.
     */
    distinct?: Audit_page_runScalarFieldEnum | Audit_page_runScalarFieldEnum[]
  }

  /**
   * audit_page_run findFirstOrThrow
   */
  export type audit_page_runFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_page_run
     */
    select?: audit_page_runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_page_run
     */
    omit?: audit_page_runOmit<ExtArgs> | null
    /**
     * Filter, which audit_page_run to fetch.
     */
    where?: audit_page_runWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audit_page_runs to fetch.
     */
    orderBy?: audit_page_runOrderByWithRelationInput | audit_page_runOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for audit_page_runs.
     */
    cursor?: audit_page_runWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audit_page_runs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audit_page_runs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of audit_page_runs.
     */
    distinct?: Audit_page_runScalarFieldEnum | Audit_page_runScalarFieldEnum[]
  }

  /**
   * audit_page_run findMany
   */
  export type audit_page_runFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_page_run
     */
    select?: audit_page_runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_page_run
     */
    omit?: audit_page_runOmit<ExtArgs> | null
    /**
     * Filter, which audit_page_runs to fetch.
     */
    where?: audit_page_runWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of audit_page_runs to fetch.
     */
    orderBy?: audit_page_runOrderByWithRelationInput | audit_page_runOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing audit_page_runs.
     */
    cursor?: audit_page_runWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` audit_page_runs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` audit_page_runs.
     */
    skip?: number
    distinct?: Audit_page_runScalarFieldEnum | Audit_page_runScalarFieldEnum[]
  }

  /**
   * audit_page_run create
   */
  export type audit_page_runCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_page_run
     */
    select?: audit_page_runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_page_run
     */
    omit?: audit_page_runOmit<ExtArgs> | null
    /**
     * The data needed to create a audit_page_run.
     */
    data?: XOR<audit_page_runCreateInput, audit_page_runUncheckedCreateInput>
  }

  /**
   * audit_page_run createMany
   */
  export type audit_page_runCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many audit_page_runs.
     */
    data: audit_page_runCreateManyInput | audit_page_runCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * audit_page_run createManyAndReturn
   */
  export type audit_page_runCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_page_run
     */
    select?: audit_page_runSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the audit_page_run
     */
    omit?: audit_page_runOmit<ExtArgs> | null
    /**
     * The data used to create many audit_page_runs.
     */
    data: audit_page_runCreateManyInput | audit_page_runCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * audit_page_run update
   */
  export type audit_page_runUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_page_run
     */
    select?: audit_page_runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_page_run
     */
    omit?: audit_page_runOmit<ExtArgs> | null
    /**
     * The data needed to update a audit_page_run.
     */
    data: XOR<audit_page_runUpdateInput, audit_page_runUncheckedUpdateInput>
    /**
     * Choose, which audit_page_run to update.
     */
    where: audit_page_runWhereUniqueInput
  }

  /**
   * audit_page_run updateMany
   */
  export type audit_page_runUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update audit_page_runs.
     */
    data: XOR<audit_page_runUpdateManyMutationInput, audit_page_runUncheckedUpdateManyInput>
    /**
     * Filter which audit_page_runs to update
     */
    where?: audit_page_runWhereInput
    /**
     * Limit how many audit_page_runs to update.
     */
    limit?: number
  }

  /**
   * audit_page_run updateManyAndReturn
   */
  export type audit_page_runUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_page_run
     */
    select?: audit_page_runSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the audit_page_run
     */
    omit?: audit_page_runOmit<ExtArgs> | null
    /**
     * The data used to update audit_page_runs.
     */
    data: XOR<audit_page_runUpdateManyMutationInput, audit_page_runUncheckedUpdateManyInput>
    /**
     * Filter which audit_page_runs to update
     */
    where?: audit_page_runWhereInput
    /**
     * Limit how many audit_page_runs to update.
     */
    limit?: number
  }

  /**
   * audit_page_run upsert
   */
  export type audit_page_runUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_page_run
     */
    select?: audit_page_runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_page_run
     */
    omit?: audit_page_runOmit<ExtArgs> | null
    /**
     * The filter to search for the audit_page_run to update in case it exists.
     */
    where: audit_page_runWhereUniqueInput
    /**
     * In case the audit_page_run found by the `where` argument doesn't exist, create a new audit_page_run with this data.
     */
    create: XOR<audit_page_runCreateInput, audit_page_runUncheckedCreateInput>
    /**
     * In case the audit_page_run was found with the provided `where` argument, update it with this data.
     */
    update: XOR<audit_page_runUpdateInput, audit_page_runUncheckedUpdateInput>
  }

  /**
   * audit_page_run delete
   */
  export type audit_page_runDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_page_run
     */
    select?: audit_page_runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_page_run
     */
    omit?: audit_page_runOmit<ExtArgs> | null
    /**
     * Filter which audit_page_run to delete.
     */
    where: audit_page_runWhereUniqueInput
  }

  /**
   * audit_page_run deleteMany
   */
  export type audit_page_runDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which audit_page_runs to delete
     */
    where?: audit_page_runWhereInput
    /**
     * Limit how many audit_page_runs to delete.
     */
    limit?: number
  }

  /**
   * audit_page_run without action
   */
  export type audit_page_runDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the audit_page_run
     */
    select?: audit_page_runSelect<ExtArgs> | null
    /**
     * Omit specific fields from the audit_page_run
     */
    omit?: audit_page_runOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Audit_page_runScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    url: 'url'
  };

  export type Audit_page_runScalarFieldEnum = (typeof Audit_page_runScalarFieldEnum)[keyof typeof Audit_page_runScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type audit_page_runWhereInput = {
    AND?: audit_page_runWhereInput | audit_page_runWhereInput[]
    OR?: audit_page_runWhereInput[]
    NOT?: audit_page_runWhereInput | audit_page_runWhereInput[]
    id?: IntFilter<"audit_page_run"> | number
    created_at?: DateTimeNullableFilter<"audit_page_run"> | Date | string | null
    url?: StringNullableFilter<"audit_page_run"> | string | null
  }

  export type audit_page_runOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
  }

  export type audit_page_runWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: audit_page_runWhereInput | audit_page_runWhereInput[]
    OR?: audit_page_runWhereInput[]
    NOT?: audit_page_runWhereInput | audit_page_runWhereInput[]
    created_at?: DateTimeNullableFilter<"audit_page_run"> | Date | string | null
    url?: StringNullableFilter<"audit_page_run"> | string | null
  }, "id">

  export type audit_page_runOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    url?: SortOrderInput | SortOrder
    _count?: audit_page_runCountOrderByAggregateInput
    _avg?: audit_page_runAvgOrderByAggregateInput
    _max?: audit_page_runMaxOrderByAggregateInput
    _min?: audit_page_runMinOrderByAggregateInput
    _sum?: audit_page_runSumOrderByAggregateInput
  }

  export type audit_page_runScalarWhereWithAggregatesInput = {
    AND?: audit_page_runScalarWhereWithAggregatesInput | audit_page_runScalarWhereWithAggregatesInput[]
    OR?: audit_page_runScalarWhereWithAggregatesInput[]
    NOT?: audit_page_runScalarWhereWithAggregatesInput | audit_page_runScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"audit_page_run"> | number
    created_at?: DateTimeNullableWithAggregatesFilter<"audit_page_run"> | Date | string | null
    url?: StringNullableWithAggregatesFilter<"audit_page_run"> | string | null
  }

  export type audit_page_runCreateInput = {
    created_at?: Date | string | null
    url?: string | null
  }

  export type audit_page_runUncheckedCreateInput = {
    id?: number
    created_at?: Date | string | null
    url?: string | null
  }

  export type audit_page_runUpdateInput = {
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type audit_page_runUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type audit_page_runCreateManyInput = {
    id?: number
    created_at?: Date | string | null
    url?: string | null
  }

  export type audit_page_runUpdateManyMutationInput = {
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type audit_page_runUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type audit_page_runCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    url?: SortOrder
  }

  export type audit_page_runAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type audit_page_runMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    url?: SortOrder
  }

  export type audit_page_runMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    url?: SortOrder
  }

  export type audit_page_runSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}