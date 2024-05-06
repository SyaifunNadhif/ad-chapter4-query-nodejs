const client = require('../config/database')

module.exports = {
    create: (name, email, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                await client.connect();
                if (!name || !email || !password) {
                    reject('name, email or password is required!');
                }

                let user = await client.query(`SELECT * FROM users WHERE email = '${email}'`);
                if (user.rows.length) {
                    reject('email already used!');
                }

                let newUser = await client.query(`INSERT INTO users (name, email, password) values ('${name}', '${email}', '${password}')`);
                resolve(newUser.command);
                await client.end();
            } catch (err) {
                reject(err);
                await client.end();
            }
        });
    },
    get: (q) => {
       return new Promise(async (resolve, reject) => {
        try{
            await client.connect();
            
            let query = 'SELECT * FROM users';
            if (q) {
                query += ` WHERE name LIKE '%${q}%' OR email LIKE '%${q}%'`;
            }

            let res = await client.query(query);

            await client.end();
            resolve(res.rows);
        }catch (err){
            reject(err);
        }
       });
    },
    update: (id, name, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                await client.connect();
                if (!id) {
                    reject('id is required!');
                }

                if (!name && !password) {
                    reject(`name or password can't be null!`);
                }

                let user = await client.query(`SELECT * FROM users WHERE id = ${id}`);
                if (!user.rows.length) {
                    reject(`user with id ${id} is doesn't exist!`);
                }

                let values = [];
                if (name) {
                    values.push(`name = '${name}'`);
                }
                if (password) {
                    values.push(`password = '${password}'`);
                }

                let query = `UPDATE users SET ${values} WHERE id = ${id}`;
                let upadated = await client.query(query);
                resolve(upadated.command);
                await client.end();
            } catch (err) {
                reject(err);
                await client.end();
            }
        });
    },
    delete: (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                await client.connect();
                if (!id) {
                    reject('id is required!');
                }

                let user = await client.query(`SELECT * FROM users WHERE id = ${id}`);
                if (!user.rows.length) {
                    reject(`user with id ${id} is doesn't exist!`);
                }

                let newUser = await client.query(`DELETE FROM users WHERE id = ${id}`);
                resolve(newUser.command);
                await client.end();
            } catch (err) {
                reject(err);
                await client.end();
            }
        });
    }
    

}