const bcrypt = require('bcrypt');

// A senha que você está testando
const senhaFornecida = 'senha123';
const hashArmazenado = '$2b$10$mqSs0bxmdquXj8RZHA/eAOUBmKzj3yDo7LgnHR8CrqHGCkan'; // Exemplo do hash

// Teste a comparação diretamente
bcrypt.compare(senhaFornecida, hashArmazenado, (err, result) => {
    if (err) {
        console.error('Erro na comparação:', err);
    } else {
        console.log('Resultado da comparação de senha:', result); // Deve ser true
    }
});
