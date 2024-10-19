import { Router } from "express"; // Importa a função Router do Express
import empresaRota from "./EmpresaRouter"; // Importa as rotas da EmpresaRouter
import instituicaoRota from "./InstituicaoRouter";
// Cria uma nova instância do roteador
let router = Router();

// Utiliza as rotas de empresa e instituicao no roteador principal
router.use(empresaRota);
router.use(instituicaoRota);

// Exporta o roteador
export default router;
