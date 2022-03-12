var admin = require('firebase-admin');
require('dotenv').config()
import logger from './logger'

async function connect() {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.PROJECT_ID,
                privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
                clientEmail: process.env.CLIENT_EMAIL,
            })
        });
        logger.info('firebase connected')
    } catch (error:any) {
        logger.info('firebase connection error' + error)
    }
}

export default connect;