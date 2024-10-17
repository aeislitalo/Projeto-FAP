import { Router } from "express"; // Importa a função Router do Express
import empresaRota from "./EmpresaRouter"; // Importa as rotas da EmpresaRouter

// Cria uma nova instância do roteador
let router = Router();

// Utiliza as rotas de empresa no roteador principal
router.use(empresaRota);

// Exporta o roteador
export default router;
