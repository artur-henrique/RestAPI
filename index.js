import express from 'express';
import { StatusCodes } from 'http-status-codes';

const PORT = process.env.PORT || 3000;
const app = express();

let users = [
    {id: 1, name: 'Artur Henrique', age: 30},
    {id: 2, name: 'Aline Switz', age: 26},
]

app.use(express.json());

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get('/', (request, response) => {
    return response.send('<h1>Funcionou</h1>');
});

app.get('/users', (request, response) => {
    return response.send(users);
});

app.get('/users/:userId', (request, response) => {
    const { userId } = request.params;
    const user = users.find(user => user.id === Number(userId));
    user ? response.send(user) : response.send('<h3>Usuário não cadastrado</h3>')
});

app.post('/users', (request, response) => {
    const newUser = request.body;
    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
});

app.put('/users/:userId', (request, response) => {
    const { userId } = request.params;
    const updatedUser = request.body;

    users = users.map(user => {
        return user.id === Number(userId) ? updatedUser : user;
        // if (user.id === Number(userId)) {
        //     return updatedUser
        // }
        // return user;
    })

    return response.send(updatedUser);
});

app.delete('/users/:userId', (request, response) => {
    const { userId } = request.params;

    users = users.filter(user => user.id !== Number(userId));

    return response.status(StatusCodes.NO_CONTENT).send();
});