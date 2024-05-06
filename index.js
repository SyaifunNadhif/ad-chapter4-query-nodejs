require('dotenv').config();
// const client = require('./queries/user');
const client = require('./config/database')

async function main() {
    try{
        // const res = await user.get(1);
        // // const res = await user.create('anggi', 'anggi@gmail.com', 'password');
        // console.log(res);
        await client.connect();

        const res = await client.query('SELECT * FROM users');
        console.log(res.rows);

        
        await client.end();

    } catch (err) {
        if (err.message) {
            console.log(err.message);
            return;
        }

        console.log(err);
        
    }
}

main();