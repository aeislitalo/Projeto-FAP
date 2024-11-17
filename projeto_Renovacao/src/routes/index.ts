import { Router } from "express"; // Importa a função Router do Express para criar um novo roteador
import empresaRota from "./EmpresaRouter"; // Importa as rotas da EmpresaRouter
import instituicaoRota from "./InstituicaoRouter"; // Importa as rotas da InstituicaoRouter
import demandaRota from "./DemandaRouter"; // Importa as rotas da DemandaRouter
import cursoRota from "./CursoRouter"; // Importa as rotas da CursoRouter
import professorRota from "./ProfessorRouter"; // Importa as rotas da ProfessorRouter
import demandasPegasRota from "./DemandaPegaRouter"; // Importa as rotas da DemandaPegaRouter

// Cria uma nova instância do roteador
let router = Router();

// Utiliza as rotas no roteador principal, definindo os prefixos de URL para cada conjunto de rotas

router.use('/professores', professorRota); // Adiciona as rotas de professores sob o prefixo '/professores'

router.use('/empresas', empresaRota); // Adiciona as rotas de empresas sob o prefixo '/empresas'
router.use('/instituicoes', instituicaoRota); // Adiciona as rotas de instituições sob o prefixo '/instituicoes'
router.use('/demandas', demandaRota); // Adiciona as rotas de demandas sob o prefixo '/demandas'
router.use('/cursos', cursoRota); // Adiciona as rotas de cursos sob o prefixo '/cursos'
router.use('/demandasPegas', demandasPegasRota); // Adiciona as rotas de demandas pegas sob o prefixo '/demandasPegas'

// Exporta o roteador para ser utilizado em outras partes do aplicativo
export default router;
