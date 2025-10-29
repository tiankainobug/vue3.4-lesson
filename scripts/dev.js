import minimist from 'minimist'
import {fileURLToPath} from 'url'
import {resolve, dirname} from 'path'
import {createRequire} from 'module'

const args = minimist(process.argv.slice(2))
const __filename = fileURLToPath(import.meta.url) // 获取文件的绝对路径
const __dirname = dirname(__filename)
const require = createRequire(import.meta.url)

const target = args._[0] // 打包哪个项目
const format = args.f || 'esm' // 打包后的模块化规范

// 入口文件 根据命令行提供的路径来进行解析
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`)

console.log(__filename, __dirname, require)
