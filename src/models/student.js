'use strict';
export default (sequelize, DataTypes) => {
  const student = sequelize.define('tt_students', {
    student_id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
    },
    name: DataTypes.STRING(256),
    phone: DataTypes.CHAR(20),
    dob: DataTypes.DATE,
    entry_date: DataTypes.DATE,
    faculty_id: DataTypes.STRING(10),
    major_id: DataTypes.STRING(50),
    supervisor_id: DataTypes.STRING(10),
    semester: DataTypes.TINYINT,
    degree: DataTypes.CHAR(4),
    gpa: DataTypes.DECIMAL(3,2),
    grad_status: DataTypes.ENUM('active', 'graduate', 'drop_out'),
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
  student.associate = function(models) {
    // associations can be defined here
    student.hasMany(models.course_selection, {
      foreignKey: "course_selection_id",
      as: "krs_list",
  })
  };
  return student;
};