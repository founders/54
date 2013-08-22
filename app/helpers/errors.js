var utilities = require('utilities');

module.exports = {
  errorLabel: function (model, field) {
    if(model.errors && model.errors[field]) {
      return '<span class="label label-important">' + geddy.string.escapeXML(model.errors[field]) + '</span>';
    }
    else {
      return '';
    }
  }
, controlGroup: function (model, field) {
    if(model.errors && model.errors[field]) {
      return '<div class="control-group error">';
    }
    else {
      return '<div class="control-group">';
    }
  }
};