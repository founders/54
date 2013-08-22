var StudentResponses = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    throw new Error('Sorry, you can\'t do that.');

    // TODO: Index with team-only secret link
    /*
    var self = this;

    geddy.model.StudentResponse.all(function(err, studentResponses) {
      self.respondWith(studentResponses, {type:'studentResponse'});
    });
    */
  };

  this.add = function (req, resp, params) {
    var persisted = this._persist();

    this.respond({params: persisted});
  };

  this.create = function (req, resp, params) {
    var self = this
      , studentResponse = geddy.model.StudentResponse.create(params)
      , content;

    if(studentResponse.isValid()) {
      geddy.model.StudentResponse.first({netid: params.netid}, function(err, earlierResponse) {
        if(earlierResponse) {
          self.redirect({id: earlierResponse.id});
        }
        else {
          studentResponse.save(function(err, data) {
            if(!err) {
              // Send an email to the applicant
              content = 'Thanks for your interest in 54.<br /><br />\n\
      <a href="' + geddy.config.url + '/student_responses/' + studentResponse.id + '">Here is a link to your responses</a>, in case you want to review them.<br /><br />\n\
      Thank you for taking the time to complete our application. We&#39;ll get back to you soon!';
              self.email(studentResponse.netid + '@illinois.edu', studentResponse.fullname, 'Thanks For Your Application', content);

              // Send an email to the team
              content = studentResponse.fullname + ' has applied for a position.<br /><br />\n\
      <a href="' + geddy.config.url + '/student_responses/' + studentResponse.id + '?team">Here is a link to the responses</a>.';
              self.email(geddy.config.event.teamEmail, geddy.config.event.teamName, studentResponse.fullname + ' has applied for a position', content);

              // Wipe out response
              self.session.unset('studentResponse');
            }
            else {
              self._persist(studentResponse);
            }

            self.respondWith(studentResponse, {status: err});
          });
        }
      });
    }
    else {
      self._persist(studentResponse);

      self.respondWith(studentResponse);
    }
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.StudentResponse.first(params.id, function(err, studentResponse) {
      if (!studentResponse) {
        var err = new Error();
        err.statusCode = 404;
        self.error(err);
      }
      else {
        self.respondWith(studentResponse, {type: 'studentResponse'});
      }
    });
  };

  this.edit = function (req, resp, params) {
    throw new Error('Sorry, you can\'t do that.');

    /*
    var self = this;

    geddy.model.StudentResponse.first(params.id, function(err, studentResponse) {
      if (!studentResponse) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      }
      else {
        self.respondWith(studentResponse);
      }
    });
    */
  };

  this.update = function (req, resp, params) {
    throw new Error('Sorry, you can\'t do that.');

    /*
    var self = this;

    geddy.model.StudentResponse.first(params.id, function(err, studentResponse) {
      studentResponse.updateProperties(params);

      if (!studentResponse.isValid()) {
        self.respondWith(studentResponse);
      }
      else {
        studentResponse.save(function(err, data) {
          self.respondWith(studentResponse, {status: err});
        });
      }
    });
    */
  };

  this.remove = function (req, resp, params) {
    throw new Error('Sorry, you can\'t do that.');

    /*
    var self = this;

    geddy.model.StudentResponse.first(params.id, function(err, studentResponse) {
      if (!studentResponse) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      }
      else {
        geddy.model.StudentResponse.remove(params.id, function(err) {
          self.respondWith(studentResponse, {status: err});
        });
      }
    });
    */
  };

  this._persist = function (studentResponse) {
    var attrs
      , blankResponse = geddy.model.StudentResponse.create();

    blankResponse.errors = {};

    // No parameter is a "get" call
    if(!studentResponse) {
      attrs = this.session.get('studentResponse');

      if(attrs) {
        try {
          attrs = JSON.parse(attrs);

          if(!attrs.errors) {
            attrs.errors = {};
          }

          return geddy.model.StudentResponse.create(attrs);
        }
        catch (e) {
          this.session.unset('studentResponse');

          return blankResponse;
        }
      }
      else {
        return blankResponse;
      }
    }

    // Parameter means a "set" call
    else {
      if(studentResponse.type) {
        attrs = studentResponse.toObj();

        if(studentResponse.errors) {
          attrs.errors = studentResponse.errors;
        }
        else {
          attrs.errors = {};
        }
      }
      else {
        attrs = studentResponse;
      }

      this.session.set('studentResponse', JSON.stringify(attrs));
    }
  };

};

exports.StudentResponses = StudentResponses;
