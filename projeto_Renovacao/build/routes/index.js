"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // Importa a função Router do Express
const EmpresaRouter_1 = __importDefault(require("./EmpresaRouter")); // Importa as rotas da EmpresaRouter
// Cria uma nova instância do roteador
let router = (0, express_1.Router)();
// Utiliza as rotas de empresa no roteador principal
router.use(EmpresaRouter_1.default);
// Exporta o roteador
exports.default = router;
