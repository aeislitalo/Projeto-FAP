// Função que cria um objeto de resposta com status e mensagem
let resp = (status: number, msg: unknown) => ({
   status: status,  // Código de status da resposta  
   mensagem: msg   // Mensagem associada à resposta
});
 

// Exporta a função resp para que possa ser utilizada em outras partes do código
export default resp;
