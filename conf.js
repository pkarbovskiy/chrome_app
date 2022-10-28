const dotenv =  require('dotenv')
const common = dotenv.config({ path: '.env.common' })

const allowedConfigs = ['merch', 'admin'] 
const arguments = process.argv.slice(2)
let additionalConfig = {}

if (arguments[0] && allowedConfigs.includes(arguments[0])) {
    additionalConfig = dotenv.config({ path: `.env.${arguments[0]}` })
}

const fs = require('fs')
fs.writeFileSync(
    'config.json',
    JSON.stringify(
        Object.assign(
            {},
            common.parsed,
            additionalConfig.parsed
        )
    )
)

