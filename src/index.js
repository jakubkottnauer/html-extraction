import { name, price } from './modules'
import pipe from 'ramda/es/pipe'
import { getConfig } from './utils'

const config = getConfig()

const stage1 = pipe(name, price)
const results = stage1({})

console.log(results)
