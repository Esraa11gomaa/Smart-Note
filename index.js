import path from 'node:path'
import * as dotenv from 'dotenv'
dotenv.config({path:path.resolve( './src/Config/.env.dev')})
import  bootstrap  from './src/app.controller.js'
import  express  from 'express'
import { startGraphQLServer } from './src/graphql/index.js'

const app = express()
await startGraphQLServer(app)

const port = process.env.PORT || 5000

bootstrap(app , express)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
