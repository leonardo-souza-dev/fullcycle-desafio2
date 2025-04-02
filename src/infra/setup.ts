import pool from './db'

export default class SetupDatabase {

    async setupDatabase() {

        const connection = await pool.getConnection()

        try {
            await connection.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL
                )`
            )

            await connection.query(`INSERT INTO users (name) VALUES (?)`, ['John Doe'])
        } catch (error) {
            console.error(error)
        } finally {
            connection.release()
        }
    }
}