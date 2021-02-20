module.exports = (sequelize, Datatypes) => {
  const Recipe = sequelize.define("Recipe", {
    recipeName: {
      type: Datatypes.STRING,
      allowNull: false,
      validation: {
        len: [1, 160]
      }
    },

    ingredients: {
      type: Datatypes.STRING,
      allowNull: false,
      validation: {
        len: [1, 1000]
      }
    },

    description: {
      type: Datatypes.STRING,
      allowNull: false,
      validation: {
        len: [1, 1000]
      }
    },

    image: {
      type: Datatypes.STRING,
      allowNull: True
    }
  });

  return Recipe;
};
