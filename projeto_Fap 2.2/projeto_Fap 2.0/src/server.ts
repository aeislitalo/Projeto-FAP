// Importa a instância da aplicação Express do arquivo app.ts
import app from "./app";

// Define a porta na qual o servidor irá escutar
let port = 3333;

// Inicia o servidor, escutando na porta especificada
app.listen(port, () => console.log("Servidor Rodando!!"));
