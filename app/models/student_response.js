var StudentResponse = function () {

  this.defineProperties({
    fullname: {
      type: 'string'
    }
  , netid: {
      type: 'string'
    }
  , major: {
      type: 'string'
    }
  , year: {
      type: 'number'
    }
  , position: {
      type: 'number'
    }
  , commitments: {
      type: 'text'
    }
  , whyYou: {
      type: 'text'
    }
  , whyUs: {
      type: 'text'
    }
  , entrepreneurship: {
      type: 'text'
    }
  });

  this.validatesPresent('fullname', {message: 'We need to know who you are'});
  this.validatesFormat('fullname', /^[^0-9]+$/, {message: 'No numbers in your name, please'});

  this.validatesPresent('netid', {message: 'We need to be able to email you'});
  this.validatesFormat('netid', /^[a-z0-9]+$/i, {message: 'This should just be numbers and letters'});

  this.validatesPresent('major', {message: 'Tell us what you\'re studying'});
  this.validatesFormat('major', /^[a-z ]+$/i, {message: 'Just letters and spaces, please'});
  this.validatesLength('major', {min:3}, {message: 'Your major is too short'});

  this.validatesWithFunction('year', function (v) {
    return v >= 0 && v <= 3;
  }, {message: 'Please pick an appropriate class'});

  this.validatesWithFunction('position', function (v) {
    return v >= 0 && v <= 3;
  }, {message: 'Please pick one of our suggested options'});

  this.validatesWithFunction('commitments', function (v) {
    return v && v.split(' ').length>5;
  }, {message: 'Please write a few more words about your commitments next year'});

  this.validatesWithFunction('whyYou', function (v) {
    return v && v.split(' ').length>30;
  }, {message: 'Please write at least 30 words so we can understand you better'});

  this.validatesWithFunction('whyUs', function (v) {
    return v && v.split(' ').length>30;
  }, {message: 'Please write at least 30 words so we can understand you better'});

  this.validatesWithFunction('entrepreneurship', function (v) {
    return v && v.split(' ').length>30;
  }, {message: 'Please write at least 30 words so we can understand you better'});

};

exports.StudentResponse = StudentResponse;

