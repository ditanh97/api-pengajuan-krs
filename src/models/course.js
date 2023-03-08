'use strict';
export default (sequelize, DataTypes) => {
  const course = sequelize.define('tt_courses', {
    course_id: DataTypes.STRING(7),
    name: DataTypes.STRING(256),
    lecturer_id: DataTypes.STRING(10),
    classroom_id: DataTypes.STRING(4),
    time_id: DataTypes.STRING(100),
    credit: DataTypes.TINYINT,
    is_active: DataTypes.BOOLEAN,
    max_student: DataTypes.INTEGER(4),
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
  course.associate = function(models) {
    // associations can be defined here
  };
  return course;
};