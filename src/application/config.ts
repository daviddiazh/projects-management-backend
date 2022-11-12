import { registerAs } from '@nestjs/config'

export default registerAs('config', () => {
    return {
        mongo: {
            url: process.env.MONGO_URI
        },
        common: {
            port: process.env.PORT
        }
    }
})