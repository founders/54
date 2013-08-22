var CreateStudentResponses = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('fullname', 'string');
          t.column('netid', 'string');
          t.column('major', 'string');
          t.column('year', 'number');
          t.column('position', 'number');
          t.column('commitments', 'text');
          t.column('whyYou', 'text');
          t.column('whyUs', 'text');
          t.column('entrepreneurship', 'text');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('StudentResponse', def, callback);
  };

  this.down = function (next) {
    var callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.dropTable('StudentResponse', callback);
  };
};

exports.CreateStudentResponses = CreateStudentResponses;
