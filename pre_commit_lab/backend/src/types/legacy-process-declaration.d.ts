declare module "process" {
    import { Control, MessageOptions } from "node:child_process";
    import * as tty from "node:tty";
    import { Worker } from "node:worker_threads";

    interface BuiltInModule {
        "assert": typeof import("assert");
        "node:assert": typeof import("node:assert");
        "assert/strict": typeof import("assert/strict");
        "node:assert/strict": typeof import("node:assert/strict");
        "async_hooks": typeof import("async_hooks");
        "node:async_hooks": typeof import("node:async_hooks");
        "buffer": typeof import("buffer");
        "node:buffer": typeof import("node:buffer");
        "child_process": typeof import("child_process");
        "node:child_process": typeof import("node:child_process");
        "cluster": typeof import("cluster");
        "node:cluster": typeof import("node:cluster");
        "console": typeof import("console");
        "node:console": typeof import("node:console");
        "constants": typeof import("constants");
        "node:constants": typeof import("node:constants");
        "crypto": typeof import("crypto");
        "node:crypto": typeof import("node:crypto");
        "dgram": typeof import("dgram");
        "node:dgram": typeof import("node:dgram");
        "diagnostics_channel": typeof import("diagnostics_channel");
        "node:diagnostics_channel": typeof import("node:diagnostics_channel");
        "dns": typeof import("dns");
        "node:dns": typeof import("node:dns");
        "dns/promises": typeof import("dns/promises");
        "node:dns/promises": typeof import("node:dns/promises");
        "domain": typeof import("domain");
        "node:domain": typeof import("node:domain");
        "events": typeof import("events");
        "node:events": typeof import("node:events");
        "fs": typeof import("fs");
        "node:fs": typeof import("node:fs");
        "fs/promises": typeof import("fs/promises");
        "node:fs/promises": typeof import("node:fs/promises");
        "http": typeof import("http");
        "node:http": typeof import("node:http");
        "http2": typeof import("http2");
        "node:http2": typeof import("node:http2");
        "https": typeof import("https");
        "node:https": typeof import("node:https");
        "inspector": typeof import("inspector");
        "node:inspector": typeof import("node:inspector");
        "inspector/promises": typeof import("inspector/promises");
        "node:inspector/promises": typeof import("node:inspector/promises");
        "module": typeof import("module");
        "node:module": typeof import("node:module");
        "net": typeof import("net");
        "node:net": typeof import("node:net");
        "os": typeof import("os");
        "node:os": typeof import("node:os");
        "path": typeof import("path");
        "node:path": typeof import("node:path");
        "path/posix": typeof import("path/posix");
        "node:path/posix": typeof import("node:path/posix");
        "path/win32": typeof import("path/win32");
        "node:path/win32": typeof import("node:path/win32");
        "perf_hooks": typeof import("perf_hooks");
        "node:perf_hooks": typeof import("node:perf_hooks");
        "process": typeof import("process");
        "node:process": typeof import("node:process");
        "punycode": typeof import("punycode");
        "node:punycode": typeof import("node:punycode");
        "querystring": typeof import("querystring");
        "node:querystring": typeof import("node:querystring");
        "readline": typeof import("readline");
        "node:readline": typeof import("node:readline");
        "readline/promises": typeof import("readline/promises");
        "node:readline/promises": typeof import("node:readline/promises");
        "repl": typeof import("repl");
        "node:repl": typeof import("node:repl");
        "node:sea": typeof import("node:sea");
        "node:sqlite": typeof import("node:sqlite");
        "stream": typeof import("stream");
        "node:stream": typeof import("node:stream");
        "stream/consumers": typeof import("stream/consumers");
        "node:stream/consumers": typeof import("node:stream/consumers");
        "stream/promises": typeof import("stream/promises");
        "node:stream/promises": typeof import("node:stream/promises");
        "stream/web": typeof import("stream/web");
        "node:stream/web": typeof import("node:stream/web");
        "string_decoder": typeof import("string_decoder");
        "node:string_decoder": typeof import("node:string_decoder");
        "node:test": typeof import("node:test");
        "node:test/reporters": typeof import("node:test/reporters");
        "timers": typeof import("timers");
        "node:timers": typeof import("node:timers");
        "timers/promises": typeof import("timers/promises");
        "node:timers/promises": typeof import("node:timers/promises");
        "tls": typeof import("tls");
        "node:tls": typeof import("node:tls");
        "trace_events": typeof import("trace_events");
        "node:trace_events": typeof import("node:trace_events");
        "tty": typeof import("tty");
        "node:tty": typeof import("node:tty");
        "url": typeof import("url");
        "node:url": typeof import("node:url");
        "util": typeof import("util");
        "node:util": typeof import("node:util");
        "sys": typeof import("util");
        "node:sys": typeof import("node:util");
        "util/types": typeof import("util/types");
        "node:util/types": typeof import("node:util/types");
        "v8": typeof import("v8");
        "node:v8": typeof import("node:v8");
        "vm": typeof import("vm");
        "node:vm": typeof import("node:vm");
        "wasi": typeof import("wasi");
        "node:wasi": typeof import("node:wasi");
        "worker_threads": typeof import("worker_threads");
        "node:worker_threads": typeof import("node:worker_threads");
        "zlib": typeof import("zlib");
        "node:zlib": typeof import("node:zlib");
    }
    global {
        var process: NodeJS.Process;
        namespace NodeJS {
            // this namespace merge is here because these are specifically used
            // as the type for process.stdin, process.stdout, and process.stderr.
            // they can't live in tty.d.ts because we need to disambiguate the imported name.
            interface ReadStream extends tty.ReadStream {}
            interface WriteStream extends tty.WriteStream {}
            interface MemoryUsageFn {
                /**
                 * The `process.memoryUsage()` method iterate over each page to gather informations about memory
                 * usage which can be slow depending on the program memory allocations.
                 */
                (): MemoryUsage;
                /**
                 * method returns an integer representing the Resident Set Size (RSS) in bytes.
                 */
                rss(): number;
            }
            interface MemoryUsage {
                /**
                 * Resident Set Size, is the amount of space occupied in the main memory device (that is a subset of the total allocated memory) for the
                 * process, including all C++ and JavaScript objects and code.
                 */
                rss: number;
                /**
                 * Refers to V8's memory usage.
                 */
                heapTotal: number;
                /**
                 * Refers to V8's memory usage.
                 */
                heapUsed: number;
                external: number;
                /**
                 * Refers to memory allocated for `ArrayBuffer`s and `SharedArrayBuffer`s, including all Node.js Buffers. This is also included
                 * in the external value. When Node.js is used as an embedded library, this value may be `0` because allocations for `ArrayBuffer`s
                 * may not be tracked in that case.
                 */
                arrayBuffers: number;
            }
            interface CpuUsage {
                user: number;
                system: number;
            }
            interface ProcessRelease {
                name: string;
                sourceUrl?: string | undefined;
                headersUrl?: string | undefined;
                libUrl?: string | undefined;
                lts?: string | undefined;
            }
            interface ProcessFeatures {
                /**
                 * A boolean value that is `true` if the current Node.js build is caching builtin modules.
                 * @since v12.0.0
                 */
                readonly cached_builtins: boolean;
                /**
                 * A boolean value that is `true` if the current Node.js build is a debug build.
                 * @since v0.5.5
                 */
                readonly debug: boolean;
                /**
                 * A boolean value that is `true` if the current Node.js build includes the inspector.
                 * @since v11.10.0
                 */
                readonly inspector: boolean;
                /**
                 * A boolean value that is `true` if the current Node.js build includes support for IPv6.
                 *
                 * Since all Node.js builds have IPv6 support, this value is always `true`.
                 * @since v0.5.3
                 * @deprecated This property is always true, and any checks based on it are redundant.
                 */
                readonly ipv6: boolean;
                /**
                 * A boolean value that is `true` if the current Node.js build supports
                 * [loading ECMAScript modules using `require()`](https://nodejs.org/docs/latest-v24.x/api/modules.md#loading-ecmascript-modules-using-require).
                 * @since v22.10.0
                 */
                readonly require_module: boolean;
                /**
                 * A boolean value that is `true` if the current Node.js build includes support for TLS.
                 * @since v0.5.3
                 */
                readonly tls: boolean;
                /**
                 * A boolean value that is `true` if the current Node.js build includes support for ALPN in TLS.
                 *
                 * In Node.js 11.0.0 and later versions, the OpenSSL dependencies feature unconditional ALPN support.
                 * This value is therefore identical to that of `process.features.tls`.
                 * @since v4.8.0
                 * @deprecated Use `process.features.tls` instead.
                 */
                readonly tls_alpn: boolean;
                /**
                 * A boolean value that is `true` if the current Node.js build includes support for OCSP in TLS.
                 *
                 * In Node.js 11.0.0 and later versions, the OpenSSL dependencies feature unconditional OCSP support.
                 * This value is therefore identical to that of `process.features.tls`.
                 * @since v0.11.13
                 * @deprecated Use `process.features.tls` instead.
                 */
                readonly tls_ocsp: boolean;
                /**
                 * A boolean value that is `true` if the current Node.js build includes support for SNI in TLS.
                 *
                 * Since all Node.js builds have IPv6 support, this value is always `true`.
                 * @since v0.5.3
                 * @deprecated Use `process.features.tls` instead.
                 */
                readonly tls_sni: boolean;
                /**
                 * A value that is `"strip"` by default,
                 * `"transform"` if Node.js is run with `--experimental-transform-types`, and `false` if
                 * Node.js is run with `--no-experimental-strip-types`.
                 * @since v22.10.0
                 */
                readonly typescript: "strip" | "transform" | false;
                /**
                 * A boolean value that is `true` if the current Node.js build includes support for libuv.
                 *
                 * Since it's not possible to build Node.js without libuv, this value is always `true`.
                 * @since v0.5.3
                 * @deprecated This property is always true, and any checks based on it are redundant.
                 */
                readonly uv: boolean;
            }
            interface ProcessVersions extends Dict<string> {
                http_parser: string;
                node: string;
                v8: string;
                ares: string;
                uv: string;
                zlib: string;
                modules: string;
                openssl: string;
            }
            type Platform =
                | "aix"
                | "android"
                | "darwin"
                | "freebsd"
                | "haiku"
                | "linux"
                | "openbsd"
                | "sunos"
                | "win32"
                | "cygwin"
                | "netbsd";
            type Architecture =
                | "arm"
                | "arm64"
                | "ia32"
                | "loong64"
                | "mips"
                | "mipsel"
                | "ppc64"
                | "riscv64"
                | "s390x"
                | "x64";
            type Signals =
                | "SIGABRT"
                | "SIGALRM"
                | "SIGBUS"
                | "SIGCHLD"
                | "SIGCONT"
                | "SIGFPE"
                | "SIGHUP"
                | "SIGILL"
                | "SIGINT"
                | "SIGIO"
                | "SIGIOT"
                | "SIGKILL"
                | "SIGPIPE"
                | "SIGPOLL"
                | "SIGPROF"
                | "SIGPWR"
                | "SIGQUIT"
                | "SIGSEGV"
                | "SIGSTKFLT"
                | "SIGSTOP"
                | "SIGSYS"
                | "SIGTERM"
                | "SIGTRAP"
                | "SIGTSTP"
                | "SIGTTIN"
                | "SIGTTOU"
                | "SIGUNUSED"
                | "SIGURG"
                | "SIGUSR1"
                | "SIGUSR2"
                | "SIGVTALRM"
                | "SIGWINCH"
                | "SIGXCPU"
                | "SIGXFSZ"
                | "SIGBREAK"
                | "SIGLOST"
                | "SIGINFO";
            type UncaughtExceptionOrigin = "uncaughtException" | "unhandledRejection";
            type MultipleResolveType = "resolve" | "reject";
            type BeforeExitListener = (code: number) => void;
            type DisconnectListener = () => void;
            type ExitListener = (code: number) => void;
            type RejectionHandledListener = (promise: Promise<unknown>) => void;
            type UncaughtExceptionListener = (error: Error, origin: UncaughtExceptionOrigin) => void;
            /**
             * Most of the time the unhandledRejection will be an Error, but this should not be relied upon
             * as *anything* can be thrown/rejected, it is therefore unsafe to assume that the value is an Error.
             */
            type UnhandledRejectionListener = (reason: unknown, promise: Promise<unknown>) => void;
            type WarningListener = (warning: Error) => void;
            type MessageListener = (message: unknown, sendHandle: unknown) => void;
            type SignalsListener = (signal: Signals) => void;
            type MultipleResolveListener = (
                type: MultipleResolveType,
                promise: Promise<unknown>,
                value: unknown,
            ) => void;
            type WorkerListener = (worker: Worker) => void;
            interface Socket extends ReadWriteStream {
                isTTY?: true | undefined;
            }
            // Alias for compatibility
            interface ProcessEnv extends Dict<string> {
                /**
                 * Can be used to change the default timezone at runtime
                 */
                TZ?: string | undefined;
            }
            interface HRTime {
                /**
                 * This is the legacy version of {@link process.hrtime.bigint()}
                 * before bigint was introduced in JavaScript.
                 *
                 * The `process.hrtime()` method returns the current high-resolution real time in a `[seconds, nanoseconds]` tuple `Array`,
                 * where `nanoseconds` is the remaining part of the real time that can't be represented in second precision.
                 *
                 * `time` is an optional parameter that must be the result of a previous `process.hrtime()` call to diff with the current time.
                 * If the parameter passed in is not a tuple `Array`, a TypeError will be thrown.
                 * Passing in a user-defined array instead of the result of a previous call to `process.hrtime()` will lead to undefined behavior.
                 *
                 * These times are relative to an arbitrary time in the past,
                 * and not related to the time of day and therefore not subject to clock drift.
                 * The primary use is for measuring performance between intervals:
                 * ```js
                 * const { hrtime } = require('node:process');
                 * const NS_PER_SEC = 1e9;
                 * const time = hrtime();
                 * // [ 1800216, 25 ]
                 *
                 * setTimeout(() => {
                 *   const diff = hrtime(time);
                 *   // [ 1, 552 ]
                 *
                 *   console.log(`Benchmark took ${diff[0] * NS_PER_SEC + diff[1]} nanoseconds`);
                 *   // Benchmark took 1000000552 nanoseconds
                 * }, 1000);
                 * ```
                 * @since v10.7.0
                 */
                (time?: [number, number]): [number, number];
                /**
                 * The `bigint` version of the {@link process.hrtime()} method returning the current high-resolution real time in nanoseconds as a `bigint`.
                 *
                 * Unlike {@link process.hrtime()}, it does not support an additional time argument since the difference can just be computed directly by subtraction of the two `bigint`s.
                 * ```js
                 * import { hrtime } from 'node:process';
                 *
                 * const start = hrtime.bigint();
                 * // 191051479007711n
                 *
                 * setTimeout(() => {
                 *   const end = hrtime.bigint();
                 *   // 191052633396993n
                 *
                 *   console.log(`Benchmark took ${end - start} nanoseconds`);
                 *   // Benchmark took 1154389282 nanoseconds
                 * }, 1000);
                 * ```
                 * @since v10.7.0
                 */
                bigint(): bigint;
            }
            interface ProcessPermission {
                /**
                 * Verifies that the process is able to access the given scope and reference.
                 * If no reference is provided, a global scope is assumed, for instance, `process.permission.has('fs.read')`
                 * will check if the process has ALL file system read permissions.
                 *
                 * The reference has a meaning based on the provided scope. For example, the reference when the scope is File System means files and folders.
                 *
                 * The available scopes are:
                 *
                 * * `fs` - All File System
                 * * `fs.read` - File System read operations
                 * * `fs.write` - File System write operations
                 * * `child` - Child process spawning operations
                 * * `worker` - Worker thread spawning operation
                 *
                 * ```js
                 * // Check if the process has permission to read the README file
                 * process.permission.has('fs.read', './README.md');
                 * // Check if the process has read permission operations
                 * process.permission.has('fs.read');
                 * ```
                 * @since v20.0.0
                 */
                has(scope: string, reference?: string): boolean;
            }
            interface ProcessReport {
                /**
                 * Write reports in a compact format, single-line JSON, more easily consumable by log processing systems
                 * than the default multi-line format designed for human consumption.
                 * @since v13.12.0, v12.17.0
                 */
                compact: boolean;
                /**
                 * Directory where the report is written.
                 * The default value is the empty string, indicating that reports are written to the current
                 * working directory of the Node.js process.
                 */
                directory: string;
                /**
                 * Filename where the report is written. If set to the empty string, the output filename will be comprised
                 * of a timestamp, PID, and sequence number. The default value is the empty string.
                 */
                filename: string;
                /**
                 * Returns a JavaScript Object representation of a diagnostic report for the running process.
                 * The report's JavaScript stack trace is taken from `err`, if present.
                 */
                getReport(err?: Error): object;
                /**
                 * If true, a diagnostic report is generated on fatal errors,
                 * such as out of memory errors or failed C++ assertions.
                 * @default false
                 */
                reportOnFatalError: boolean;
                /**
                 * If true, a diagnostic report is generated when the process
                 * receives the signal specified by process.report.signal.
                 * @default false
                 */
                reportOnSignal: boolean;
                /**
                 * If true, a diagnostic report is generated on uncaught exception.
                 * @default false
                 */
                reportOnUncaughtException: boolean;
                /**
                 * The signal used to trigger the creation of a diagnostic report.
                 * @default 'SIGUSR2'
                 */
                signal: Signals;
                /**
                 * Writes a diagnostic report to a file. If filename is not provided, the default filename
                 * includes the date, time, PID, and a sequence number.
                 * The report's JavaScript stack trace is taken from `err`, if present.
                 * @param fileName Name of the file where the report is written.
                 * This should be a relative path, that will be appended to the directory specified in
                 * `process.report.directory`, or the current working directory of the Node.js process,
                 * if unspecified.
                 * @param err A custom error used for reporting the JavaScript stack.
                 * @return Filename of the generated report.
                 */
                writeReport(fileName?: string, err?: Error): string;
                writeReport(err?: Error): string;
            }
            interface ResourceUsage {
                fsRead: number;
                fsWrite: number;
                involuntaryContextSwitches: number;
                ipcReceived: number;
                ipcSent: number;
                majorPageFault: number;
                maxRSS: number;
                minorPageFault: number;
                sharedMemorySize: number;
                signalsCount: number;
                swappedOut: number;
                systemCPUTime: number;
                unsharedDataSize: number;
                unsharedStackSize: number;
                userCPUTime: number;
                voluntaryContextSwitches: number;
            }
            interface EmitWarningOptions {
                /**
                 * When `warning` is a `string`, `type` is the name to use for the _type_ of warning being emitted.
                 *
                 * @default 'Warning'
                 */
                type?: string | undefined;
                /**
                 * A unique identifier for the warning instance being emitted.
                 */
                code?: string | undefined;
                /**
                 * When `warning` is a `string`, `ctor` is an optional function used to limit the generated stack trace.
                 *
                 * @default process.emitWarning
                 */
                ctor?: Function | undefined;
                /**
                 * Additional text to include with the error.
                 */
                detail?: string | undefined;
            }
            interface ProcessConfig {
                readonly target_defaults: {
                    readonly cflags: any[];
                    readonly default_configuration: string;
                    readonly defines: string[];
                    readonly include_dirs: string[];
                    readonly libraries: string[];
                };
                readonly variables: {
                    readonly clang: number;
                    readonly host_arch: string;
                    readonly node_install_npm: boolean;
                    readonly node_install_waf: boolean;
                    readonly node_prefix: string;
                    readonly node_shared_brotli: boolean;
                    readonly node_shared_cares: boolean;
                    readonly node_shared_openssl: boolean;
                    readonly node_shared_v8: boolean;
                    readonly node_shared_zlib: boolean;
                    readonly node_use_dtrace: boolean;
                    readonly target_arch: string;
                    readonly v8_no_strict_aliasing: number;
                    readonly v8_use_snapshot: boolean;
                    readonly visibility: string;
                };
            }
            interface Process extends EventEmitter {
                /**
                 * The `process.stdout` property returns a stream connected to`stdout` (fd `1`). It is a `net.Socket` (which is a `Duplex` stream) unless fd `1` refers to a file, in which case it is
                 * a `Writable` stream.
                 *
                 * For example, to copy `process.stdin` to `process.stdout`:
                 *
                 * ```js
                 * import { stdin, stdout } from 'node:process';
                 *
                 * stdin.pipe(stdout);
                 * ```
                 *
                 * `process.stdout` differs from other Node.js streams in important ways. See `note on process I/O` for more information.
                 */
                stdout: WriteStream & {
                    fd: 1;
                };
                /**
                 * The `process.stderr` property returns a stream connected to`stderr` (fd `2`). It is a `net.Socket` (which is a `Duplex` stream) unless fd `2` refers to a file, in which case it is
                 * a `Writable` stream.
                 *
                 * `process.stderr` differs from other Node.js streams in important ways. See `note on process I/O` for more information.
                 */
                stderr: WriteStream & {
                    fd: 2;
                };
                /**
                 * The `process.stdin` property returns a stream connected to`stdin` (fd `0`). It is a `net.Socket` (which is a `Duplex` stream) unless fd `0` refers to a file, in which case it is
                 * a `Readable` stream.
                 * It is very large; kept as-is for archival purposes.
                 */
                stdin: ReadStream & {
                    fd: 0;
                };
                argv: string[];
                argv0: string;
                execArgv: string[];
                execPath: string;
                abort(): never;
                chdir(directory: string): void;
                cwd(): string;
                debugPort: number;
                dlopen(module: object, filename: string, flags?: number): void;
                emitWarning(warning: string | Error, ctor?: Function): void;
                emitWarning(warning: string | Error, type?: string, ctor?: Function): void;
                emitWarning(warning: string | Error, type?: string, code?: string, ctor?: Function): void;
                emitWarning(warning: string | Error, options?: EmitWarningOptions): void;
                env: ProcessEnv;
                exit(code?: number | string | null): never;
                exitCode: number | string | null | undefined;
                finalization: {
                    register<T extends object>(ref: T, callback: (ref: T, event: "exit") => void): void;
                    registerBeforeExit<T extends object>(ref: T, callback: (ref: T, event: "beforeExit") => void): void;
                    unregister(ref: object): void;
                };
                getActiveResourcesInfo(): string[];
                getBuiltinModule<ID extends keyof BuiltInModule>(id: ID): BuiltInModule[ID];
                getBuiltinModule(id: string): object | undefined;
                getgid?: () => number;
                setgid?: (id: number | string) => void;
                getuid?: () => number;
                setuid?: (id: number | string) => void;
                geteuid?: () => number;
                seteuid?: (id: number | string) => void;
                getegid?: () => number;
                setegid?: (id: number | string) => void;
                getgroups?: () => number[];
                setgroups?: (groups: ReadonlyArray<string | number>) => void;
                setUncaughtExceptionCaptureCallback(cb: ((err: Error) => void) | null): void;
                hasUncaughtExceptionCaptureCallback(): boolean;
                sourceMapsEnabled: boolean;
                setSourceMapsEnabled(value: boolean): void;
                readonly version: string;
                readonly versions: ProcessVersions;
                readonly config: ProcessConfig;
                kill(pid: number, signal?: string | number): true;
                loadEnvFile(path?: string | URL | Buffer): void;
                readonly pid: number;
                readonly ppid: number;
                threadCpuUsage(previousValue?: CpuUsage): CpuUsage;
                title: string;
                readonly arch: Architecture;
                readonly platform: Platform;
                mainModule?: Module;
                memoryUsage: MemoryUsageFn;
                constrainedMemory(): number;
                availableMemory(): number;
                cpuUsage(previousValue?: CpuUsage): CpuUsage;
                nextTick(callback: Function, ...args: any[]): void;
                permission: ProcessPermission;
                readonly release: ProcessRelease;
                readonly features: ProcessFeatures;
                ref(maybeRefable: any): void;
                unref(maybeRefable: any): void;
                execve?(file: string, args?: readonly string[], env?: ProcessEnv): never;
                addListener(event: "beforeExit", listener: BeforeExitListener): this;
                addListener(event: "disconnect", listener: DisconnectListener): this;
                addListener(event: "exit", listener: ExitListener): this;
                addListener(event: "rejectionHandled", listener: RejectionHandledListener): this;
                addListener(event: "uncaughtException", listener: UncaughtExceptionListener): this;
                addListener(event: "uncaughtExceptionMonitor", listener: UncaughtExceptionListener): this;
                addListener(event: "unhandledRejection", listener: UnhandledRejectionListener): this;
                addListener(event: "warning", listener: WarningListener): this;
                addListener(event: "message", listener: MessageListener): this;
                addListener(event: Signals, listener: SignalsListener): this;
                addListener(event: "multipleResolves", listener: MultipleResolveListener): this;
                addListener(event: "worker", listener: WorkerListener): this;
                emit(event: "beforeExit", code: number): boolean;
                emit(event: "disconnect"): boolean;
                emit(event: "exit", code: number): boolean;
                emit(event: "rejectionHandled", promise: Promise<unknown>): boolean;
                emit(event: "uncaughtException", error: Error): boolean;
                emit(event: "uncaughtExceptionMonitor", error: Error): boolean;
                emit(event: "unhandledRejection", reason: unknown, promise: Promise<unknown>): boolean;
                emit(event: "warning", warning: Error): boolean;
                emit(event: "message", message: unknown, sendHandle: unknown): this;
                emit(event: Signals, signal?: Signals): boolean;
                emit(
                    event: "multipleResolves",
                    type: MultipleResolveType,
                    promise: Promise<unknown>,
                    value: unknown,
                ): this;
                emit(event: "worker", listener: WorkerListener): this;
                on(event: "beforeExit", listener: BeforeExitListener): this;
                on(event: "disconnect", listener: DisconnectListener): this;
                on(event: "exit", listener: ExitListener): this;
                on(event: "rejectionHandled", listener: RejectionHandledListener): this;
                on(event: "uncaughtException", listener: UncaughtExceptionListener): this;
                on(event: "uncaughtExceptionMonitor", listener: UncaughtExceptionListener): this;
                on(event: "unhandledRejection", listener: UnhandledRejectionListener): this;
                on(event: "warning", listener: WarningListener): this;
                on(event: "message", listener: MessageListener): this;
                on(event: Signals, listener: SignalsListener): this;
                on(event: "multipleResolves", listener: MultipleResolveListener): this;
                on(event: "worker", listener: WorkerListener): this;
                on(event: string | symbol, listener: (...args: any[]) => void): this;
                once(event: "beforeExit", listener: BeforeExitListener): this;
                once(event: "disconnect", listener: DisconnectListener): this;
                once(event: "exit", listener: ExitListener): this;
                once(event: "rejectionHandled", listener: RejectionHandledListener): this;
                once(event: "uncaughtException", listener: UncaughtExceptionListener): this;
                once(event: "uncaughtExceptionMonitor", listener: UncaughtExceptionListener): this;
                once(event: "unhandledRejection", listener: UnhandledRejectionListener): this;
                once(event: "warning", listener: WarningListener): this;
                once(event: "message", listener: MessageListener): this;
                once(event: Signals, listener: SignalsListener): this;
                once(event: "multipleResolves", listener: MultipleResolveListener): this;
                once(event: "worker", listener: WorkerListener): this;
                once(event: string | symbol, listener: (...args: any[]) => void): this;
                prependListener(event: "beforeExit", listener: BeforeExitListener): this;
                prependListener(event: "disconnect", listener: DisconnectListener): this;
                prependListener(event: "exit", listener: ExitListener): this;
                prependListener(event: "rejectionHandled", listener: RejectionHandledListener): this;
                prependListener(event: "uncaughtException", listener: UncaughtExceptionListener): this;
                prependListener(event: "uncaughtExceptionMonitor", listener: UncaughtExceptionListener): this;
                prependListener(event: "unhandledRejection", listener: UnhandledRejectionListener): this;
                prependListener(event: "warning", listener: WarningListener): this;
                prependListener(event: "message", listener: MessageListener): this;
                prependListener(event: Signals, listener: SignalsListener): this;
                prependListener(event: "multipleResolves", listener: MultipleResolveListener): this;
                prependListener(event: "worker", listener: WorkerListener): this;
                prependOnceListener(event: "beforeExit", listener: BeforeExitListener): this;
                prependOnceListener(event: "disconnect", listener: DisconnectListener): this;
                prependOnceListener(event: "exit", listener: ExitListener): this;
                prependOnceListener(event: "rejectionHandled", listener: RejectionHandledListener): this;
                prependOnceListener(event: "uncaughtException", listener: UncaughtExceptionListener): this;
                prependOnceListener(event: "uncaughtExceptionMonitor", listener: UncaughtExceptionListener): this;
                prependOnceListener(event: "unhandledRejection", listener: UnhandledRejectionListener): this;
                prependOnceListener(event: "warning", listener: WarningListener): this;
                prependOnceListener(event: "message", listener: MessageListener): this;
                prependOnceListener(event: Signals, listener: SignalsListener): this;
                prependOnceListener(event: "multipleResolves", listener: MultipleResolveListener): this;
                prependOnceListener(event: "worker", listener: WorkerListener): this;
                listeners(event: "beforeExit"): BeforeExitListener[];
                listeners(event: "disconnect"): DisconnectListener[];
                listeners(event: "exit"): ExitListener[];
                listeners(event: "rejectionHandled"): RejectionHandledListener[];
                listeners(event: "uncaughtException"): UncaughtExceptionListener[];
                listeners(event: "uncaughtExceptionMonitor"): UncaughtExceptionListener[];
                listeners(event: "unhandledRejection"): UnhandledRejectionListener[];
                listeners(event: "warning"): WarningListener[];
                listeners(event: "message"): MessageListener[];
                listeners(event: Signals): SignalsListener[];
                listeners(event: "multipleResolves"): MultipleResolveListener[];
                listeners(event: "worker"): WorkerListener[];
            }
        }
    }
    export = process;
}
declare module "node:process" {
    import process = require("process");
    export = process;
}
declare var global: typeof globalThis;

declare var process: NodeJS.Process;
declare var console: Console;

interface ErrorConstructor {
    captureStackTrace(targetObject: object, constructorOpt?: Function): void;
    prepareStackTrace(err: Error, stackTraces: NodeJS.CallSite[]): any;
    stackTraceLimit: number;
}

declare var gc: NodeJS.GCFunction | undefined;

declare namespace NodeJS {
    interface CallSite {
        getColumnNumber(): number | null;
        getEnclosingColumnNumber(): number | null;
        getEnclosingLineNumber(): number | null;
        getEvalOrigin(): string | undefined;
        getFileName(): string | null;
        getFunction(): Function | undefined;
        getFunctionName(): string | null;
        getLineNumber(): number | null;
        getMethodName(): string | null;
        getPosition(): number;
        getPromiseIndex(): number | null;
        getScriptHash(): string;
        getScriptNameOrSourceURL(): string | null;
        getThis(): unknown;
        getTypeName(): string | null;
        isAsync(): boolean;
        isConstructor(): boolean;
        isEval(): boolean;
        isNative(): boolean;
        isPromiseAll(): boolean;
        isToplevel(): boolean;
    }

    interface ErrnoException extends Error {
        errno?: number | undefined;
        code?: string | undefined;
        path?: string | undefined;
        syscall?: string | undefined;
    }

    interface ReadableStream extends EventEmitter {
        readable: boolean;
        read(size?: number): string | Buffer;
        setEncoding(encoding: BufferEncoding): this;
        pause(): this;
        resume(): this;
        isPaused(): boolean;
        pipe<T extends WritableStream>(destination: T, options?: { end?: boolean | undefined }): T;
        unpipe(destination?: WritableStream): this;
        unshift(chunk: string | Uint8Array, encoding?: BufferEncoding): void;
        wrap(oldStream: ReadableStream): this;
        [Symbol.asyncIterator](): AsyncIterableIterator<string | Buffer>;
    }

    interface WritableStream extends EventEmitter {
        writable: boolean;
        write(buffer: Uint8Array | string, cb?: (err?: Error | null) => void): boolean;
        write(str: string, encoding?: BufferEncoding, cb?: (err?: Error | null) => void): boolean;
        end(cb?: () => void): this;
        end(data: string | Uint8Array, cb?: () => void): this;
        end(str: string, encoding?: BufferEncoding, cb?: () => void): this;
    }

    interface ReadWriteStream extends ReadableStream, WritableStream {}

    interface RefCounted {
        ref(): this;
        unref(): this;
    }

    interface Dict<T> {
        [key: string]: T | undefined;
    }

    interface ReadOnlyDict<T> {
        readonly [key: string]: T | undefined;
    }

    type PartialOptions<T> = { [K in keyof T]?: T[K] | undefined };

    interface GCFunction {
        (minor?: boolean): void;
        (options: NodeJS.GCOptions & { execution: "async" }): Promise<void>;
        (options: NodeJS.GCOptions): void;
    }

    interface GCOptions {
        execution?: "sync" | "async" | undefined;
        flavor?: "regular" | "last-resort" | undefined;
        type?: "major-snapshot" | "major" | "minor" | undefined;
        filename?: string | undefined;
    }

    interface Iterator<T, TReturn = any, TNext = any> extends IteratorObject<T, TReturn, TNext> {
        [Symbol.iterator](): NodeJS.Iterator<T, TReturn, TNext>;
    }

    interface AsyncIterator<T, TReturn = any, TNext = any> extends AsyncIteratorObject<T, TReturn, TNext> {
        [Symbol.asyncIterator](): NodeJS.AsyncIterator<T, TReturn, TNext>;
    }
}
