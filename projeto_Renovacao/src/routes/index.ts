import { Router } from "express"; // Importa a função Router do Express
import empresaRota from "./EmpresaRouter"; // Importa as rotas da EmpresaRouter
import instituicaoRota from "./InstituicaoRouter";
import demandaRota from "./DemandaRouter";
import cursoRota from "./CursoRouter";
// Cria uma nova instância do roteador
let router = Router();

// Utiliza as rotas no roteador principal
router.use('/empresas',empresaRota);
router.use('/instituicoes',instituicaoRota);
router.use('/demandas',demandaRota);
router.use('/cursos',cursoRota);

// Exporta o roteador
export default router;

