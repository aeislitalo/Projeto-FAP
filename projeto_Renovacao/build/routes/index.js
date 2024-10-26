"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Importa a função Router do Express
const EmpresaRouter_1 = __importDefault(require("./EmpresaRouter")); // Importa as rotas da EmpresaRouter
const InstituicaoRouter_1 = __importDefault(require("./InstituicaoRouter"));
// Cria uma nova instância do roteador
let router = (0, express_1.Router)();
// Utiliza as rotas de empresa e instituicao no roteador principal
router.use(EmpresaRouter_1.default);
router.use(InstituicaoRouter_1.default);
// Exporta o roteador
exports.default = router;
//# sourceMappingURL=index.js.map