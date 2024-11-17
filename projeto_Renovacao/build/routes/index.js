"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Importa a função Router do Express para criar um novo roteador
const EmpresaRouter_1 = __importDefault(require("./EmpresaRouter")); // Importa as rotas da EmpresaRouter
const InstituicaoRouter_1 = __importDefault(require("./InstituicaoRouter")); // Importa as rotas da InstituicaoRouter
const DemandaRouter_1 = __importDefault(require("./DemandaRouter")); // Importa as rotas da DemandaRouter
const CursoRouter_1 = __importDefault(require("./CursoRouter")); // Importa as rotas da CursoRouter
const ProfessorRouter_1 = __importDefault(require("./ProfessorRouter")); // Importa as rotas da ProfessorRouter
const DemandaPegaRouter_1 = __importDefault(require("./DemandaPegaRouter")); // Importa as rotas da DemandaPegaRouter
// Cria uma nova instância do roteador
let router = (0, express_1.Router)();
// Utiliza as rotas no roteador principal, definindo os prefixos de URL para cada conjunto de rotas
router.use('/professores', ProfessorRouter_1.default); // Adiciona as rotas de professores sob o prefixo '/professores'
router.use('/empresas', EmpresaRouter_1.default); // Adiciona as rotas de empresas sob o prefixo '/empresas'
router.use('/instituicoes', InstituicaoRouter_1.default); // Adiciona as rotas de instituições sob o prefixo '/instituicoes'
router.use('/demandas', DemandaRouter_1.default); // Adiciona as rotas de demandas sob o prefixo '/demandas'
router.use('/cursos', CursoRouter_1.default); // Adiciona as rotas de cursos sob o prefixo '/cursos'
router.use('/demandasPegas', DemandaPegaRouter_1.default); // Adiciona as rotas de demandas pegas sob o prefixo '/demandasPegas'
// Exporta o roteador para ser utilizado em outras partes do aplicativo
exports.default = router;
//# sourceMappingURL=index.js.map