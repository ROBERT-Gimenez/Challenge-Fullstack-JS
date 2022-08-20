module.exports = (sequelize, dataTypes) => {
    let alias = "users";

    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(60),
            allowNull: false,
        },
        rol_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(60),
            allowNull: false,
        },
        password: {
            type: dataTypes.STRING(300),
        },
        avatar: {
            type: dataTypes.STRING(1000),
            allowNull: true
        },
        phone: {
            type: dataTypes.INTEGER(20),
            allowNull: true
        },
        
    };

    let config = {
        tableName: "users",
        timestamps: false,
    };

    const users = sequelize.define(alias, cols, config);

    users.associate = (models) => {
        users.belongsTo(models.UserRol, {
            as: "UserRol",
            foreignKey: "rol_id"
        })
        

    };

    return users;
}