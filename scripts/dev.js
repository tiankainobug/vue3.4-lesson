import minimist from 'minimist'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { createRequire } from 'module'
import esbuild from 'esbuild'

const args = minimist(process.argv.slice(2))
const __filename = fileURLToPath(import.meta.url) // 获取文件的绝对路径
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

const target = args._[0] // 打包哪个项目
const format = args.f || 'esm' // 打包后的模块化规范

// 入口文件 根据命令行提供的路径来进行解析
const entry = resolve(__dirname, `../packages/${ target }/src/index.ts`)
// package.json
const pkg = require(`../packages/${ target }/package.json`)

esbuild.context({
    entryPoints: [entry],
    outfile: resolve(__dirname, `../packages/${ target }/dist/${ target }.${ format }.js`),
    bundle: true, // reactivity shared 会打包到一起
    platform: 'browser', // 给浏览器使用
    sourcemap: true, // 可以调试源代码
    format: format, // cjs esm iife
    globalName: pkg.buildOptions?.name
}).then((ctx) => {
    console.log('start dev')
    return ctx.watch() // 监控入口文件，持续进行打包
})
