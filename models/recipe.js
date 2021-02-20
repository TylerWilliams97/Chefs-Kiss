module.exports = (sequelize, Datatypes) => {
   const Recipe = sequelize.define('Recipe' , {

        recipe_name: {
            type: Datatypes.STRING,
            allowNull: false,
            validation: {
                len:[1,160]
            }
        },

        ingredients: {
            type: Datatypes.STRING,
            allowNull: false,
            validation: {
                len:[1,1000]
            }
        },

        description: {
            type: Datatypes.STRING,
            allowNull: false,
            validation: {
                len:[1,1000]
            }
        }
    });

    return Recipe;
}