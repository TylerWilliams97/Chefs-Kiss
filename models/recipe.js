module.exports = (sequelize, Datatypes) => {
  const Recipe = sequelize.define("Recipe", {
    recipeName: {
      type: Datatypes.STRING,
      allowNull: false,
      validation: {
        len: [1, 160]
      }
    },

    ingredient: {
      type: Datatypes.STRING,
      allowNull: false,
      defaultValue: "",
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

    instructions: {
      type: Datatypes.STRING,
      allowNull: false,
      validation: {
        len: [1, 1000]
      }
    },
    cloudLink: {
      type: Datatypes.STRING,
      allowNull: true
    }
  });

  return Recipe;
};
