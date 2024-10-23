import { Sequelize } from "sequelize"; // Importa a classe Sequelize do pacote sequelize
import * as config from "../config/config_database"; // Importa a configuração do banco de dados

// Cria e exporta uma nova instância de Sequelize utilizando a configuração importada
export default new Sequelize(config);
