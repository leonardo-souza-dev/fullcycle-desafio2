import { Request, Response, Router } from 'express'
import pool from '../infra/db'
import { faker } from '@faker-js/faker'

export default class UserController {

    private TITLE = "<h1>Full Cycle Rocks!</h1>"
    private router: Router

    constructor() {
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get('/', this.getAll.bind(this))
    }

    private async getAll(request: Request, res: Response) {
        const name = faker.person.fullName()
        try {
            const [resultInsert] = await pool.query(`INSERT INTO users (name) VALUES (?)`, [name])
            const [users] = await pool.query('SELECT * FROM users') as any[]

            const separatorItems = '\r\n- '
            const result = this.TITLE + separatorItems + users.map((user: any) => user.name).join(separatorItems)
            
            console.log('Result:')
            console.log(result)

            res.status(201).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error creating user.' + error });
        }
    }

    public getRouter() {
        return this.router
    }
}
