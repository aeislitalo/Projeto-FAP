import { Model} from "sequelize"; // Importa a classe Model do Sequelize
import db from "."; // Importa a instância do banco de dados
import sequelize from "sequelize"; // Importa o Sequelize
import Empresa from "./Empresa"; // Importa o modelo Empresa

// Define a classe Demanda que estende Model
class Demanda extends Model {
    declare id: number; // Declaração do campo id
    declare descricao: string; // Declaração do campo descricao
    declare dataEnvio: Date; // Declaração do campo dataEnvio
    declare dataFinal: Date; // Declaração do campo dataFinal
    declare empresaId: number; // Declaração do campo empresaId
    declare titulo: string; // Declaração do campo titulo

    // Método estático para formatar uma string de data no formato 'dd/mm/yyyy'
    static formatarData(dateString: string): Date {
        const [dia, mes, ano] = dateString.split('/'); // Divide a string em dia, mês e ano
        return new Date(`${ano}-${mes}-${dia}`); // Retorna um objeto Date
    }

    // Método estático para preencher os dados da demanda
    static preencherDemanda(dataFinalFormatada: Date, id: number, demanda: any) {
        return {
            descricao: demanda.descricao,
            dataEnvio: new Date(), // Define a data de envio como a data atual
            dataFinal: dataFinalFormatada, // Recebe a data final formatada
            empresaId: id, // Recebe o ID da empresa
            titulo: demanda.titulo // Recebe o título da demanda
        };
    }
    // Método estático assíncrono para visualizar os projetos (demandas) de uma empresa
    static async visualizarMeusProjetos(idEmpresa: number) {
        // Busca uma empresa no banco de dados utilizando o método 'findByPk' (find by primary key)
        // O 'include' permite trazer as demandas associadas à empresa através do relacionamento
        let empresa = await Empresa.findByPk(idEmpresa, {
            include: [
                {
                    model: this, // O model atual ('Demanda') é incluído como parte da consulta
                    as: 'demandas' // Define o alias 'demandas' para o relacionamento, já definido no modelo
                }
            ]
        });

        // Verifica se a empresa foi encontrada, caso contrário, lança um erro
        if (!empresa) {
            throw new Error('Empresa não encontrada'); // Lança um erro se a empresa não existir
        }
        
        
        // Retorna a empresa encontrada com suas demandas associadas
        return empresa;
    }
    static async visualizarEmpresasDemandas(idDemanda:number){
        let demanda = await this.findByPk(idDemanda, {
            include: [
                {
                    model: Empresa, // O model atual ('Empresa') é incluído como parte da consulta
                    as: 'empresa' // Define o alias 'empresa' para o relacionamento, já definido no modelo
                }
            ]
        });

        // Verifica se a demanda foi encontrada, caso contrário, lança um erro
        if (!demanda) {
            throw new Error('Demanda não encontrada'); // Lança um erro se a demanda não existir
        }

        // Retorna a demanda encontrada com suas demandas associadas
        return demanda;
    }
}

// Inicializa o modelo Demanda
Demanda.init({
    id: {
        type: sequelize.INTEGER, // Tipo de dado para o ID
        autoIncrement: true, // O ID será gerado automaticamente
        primaryKey: true, // Define esta coluna como chave primária
        allowNull: false // Não permite valores nulos
    },
    descricao: {
        type: sequelize.TEXT, // Tipo de dado para a descrição
        allowNull: false // Não permite valores nulos
    },
    dataEnvio: {
        type: sequelize.DATE, // Tipo de dado para a data de envio
        allowNull: false // Não permite valores nulos
    },
    dataFinal: {
        type: sequelize.DATE, // Tipo de dado para a data final
        allowNull: false // Não permite valores nulos
    },
    empresaId: {
        type: sequelize.INTEGER, // Tipo de dado para o ID da empresa
        allowNull: false, // Não permite valores nulos
        references: {
            model: 'empresa', // Referencia a tabela 'empresa'
            key: 'id' // Chave estrangeira que faz referência ao ID da empresa
        },
        onDelete: 'CASCADE', // Deleta as demandas relacionadas se a empresa for deletada
        onUpdate: 'CASCADE' // Atualiza as demandas relacionadas se o ID da empresa for atualizado
    },
    titulo: {
        type: sequelize.STRING(50), // Tipo de dado para o título
        allowNull: false, // Não permite valores nulos
        unique: true // O título deve ser único
    }
}, {
    sequelize: db, // Passa a instância do banco de dados
    tableName: 'demanda' // Define o nome da tabela no banco de dados
});

// Define o relacionamento entre Empresa e Demanda
Empresa.hasMany(Demanda, {
    foreignKey: 'empresaId', // Chave estrangeira
    onDelete: 'CASCADE', // Deleta as demandas relacionadas se a empresa for deletada
    onUpdate: 'CASCADE', // Atualiza as demandas relacionadas se o ID da empresa for atualizado
    as: 'demandas' // Define um alias para o relacionamento
});

// Define o relacionamento inverso entre Demanda e Empresa
Demanda.belongsTo(Empresa, {
    foreignKey: 'empresaId', // Chave estrangeira
    onDelete: 'CASCADE', // Deleta a demanda se a empresa relacionada for deletada
    onUpdate: 'CASCADE', // Atualiza a demanda se o ID da empresa for atualizado
    as: 'empresa' // Define um alias para o relacionamento
});

export default Demanda; // Exporta o modelo Demanda
