'use strict';
export default (sequelize, DataTypes) => {
  const course_selection = sequelize.define('tt_course_selection', {
    course_selection_id:{
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
  },
    student_id: DataTypes.STRING(10),
    semester: DataTypes.TINYINT,
    curr_gpa: DataTypes.DECIMAL(3,2),
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
  course_selection.associate = function(models) {
    // associations can be defined here
    course_selection.belongsTo(models.student, {
      foreignKey: "student_id",
      as: "student",
    })
    course_selection.hasMany(models.selection_detail, {
        foreignKey: "course_selection_id",
        as: "course_list",
    })
  };
  return course_selection;
};