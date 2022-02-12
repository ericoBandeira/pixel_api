import { Router, Request, Response} from 'express'
const client = require('./database/config.js')
const jwt = require('jsonwebtoken')
const SECRET = 'ghostthedawncool'

const routes = Router()

client.connect();

function verify(req: Request, res: Response) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, SECRET, (err:any, decoded:any) => {
        if (err) return res.status(401).end();

        req.userId = decoded.userId;
        next();
    })
}

routes.get('/users', (req: Request, res: Response) => {
    client.query(`Select * from usuario`, (err: any, result: any) => {
        if (!err) {
            res.send(result.rows)
        }
    })
    client.end;
})

client.connect();

routes.post('/login', (req: Request, res: Response) => {
    const user = req.body
    client.query(`Select * from usuario where login='${user.login}'`, (err: any, result: any) => {
        if (result.rows[0].senha === user.senha && result.rows[0].login === user.login) {
            const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: 86400 })
            return res.json({auth: true, token})
        }
    })

    res.status(401).end();
    client.end;
})


export default routes