require('dotenv').config();
// const express = require('express')
const user = require('./queries/user');


async function main() {
    try {
        // const res = await user.get();
        // const res = await user.create('nana', 'anggi@gmail.com', 'password');

        // const res = await user.delete(5);

        const res = await user.update(6, 'irji', 'Login123');
        console.log(res);
    } catch (err) {
        if (err.message) {
            console.log(err.message);
            return;
        }

        console.log(err);
        
    }
}

main();