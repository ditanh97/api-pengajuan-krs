'use strict';
export default (sequelize, DataTypes) => {
  const course_selection_detail = sequelize.define('tr_selection_detail', {
    detail_id:{
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    course_selection_id: DataTypes.BIGINT,
    course_id: DataTypes.STRING(7),
    score: DataTypes.DECIMAL(3,2),
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    freezeTableName: true,
    timestamps: true
  });
  course_selection_detail.associate = function(models) {
    // associations can be defined here
    course_selection_detail.belongsTo(models.course_selection, {
      foreignKey: "course_selection_id",
      as: "course_selection",
    })
    course_selection_detail.belongsTo(models.course, {
        foreignKey: "course_id",
        as: "course",
    })
  };
  return course_selection_detail;
};