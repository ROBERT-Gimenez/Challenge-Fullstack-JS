module.exports = (sequelize, dataTypes) => {
    let alias = "transactions";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        concept: {
            type: dataTypes.STRING(60),
            allowNull: false,
        },
        date: {
            type: dataTypes.DATEONLY,
            allowNull: false,
        },
        type: {
            type: dataTypes.STRING(60),
            allowNull: true
        },
        amount: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        user_id: {
            type: dataTypes.INTEGER(11),
            
        }
    }

    let config = {
        tableName: "transactions",
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false,
    }

    const transactions = sequelize.define(alias, cols, config);
    
    transactions.associate = (models) => {
        transactions.belongsTo(models.users, {
            as: "users",
            foreignKey: "user_id",
        })
        
    }
    return transactions;
}