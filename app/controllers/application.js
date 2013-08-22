/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

var md = require('mandrill-api');

var Application = function () {
  // Send an email
  this.email = function (to_email, to_name, title, body) {
    mandrill = new md.Mandrill(process.env.MANDRILL_APIKEY);

    console.log('my key is ' + process.env.MANDRILL_APIKEY);

    mandrill.messages.send(
     {
       message: {
        html: '<html>\n\
  <head>\n\
    <title>' + geddy.string.escapeXML(title) + '</title>\n\
  </head>\n\
  <body>\n\
    <p>Dear ' + to_name + ',<br /></p>\n\
    <p>' + body + '</p>\n\
    <p>Sincerely,<br />\n\
    ' + geddy.config.event.teamName + '<br />\n\
    <a href="mailto:' + geddy.config.event.teamEmail + '">' + geddy.config.event.teamEmail + '</a>\n\
  </body>\n\
</html>\n\
'
      , subject: title
      , from_email: geddy.config.event.teamEmail
      , from_name: geddy.config.event.teamName
      , to: [{email: to_email, name: to_name}]
      , track_opens: true
      , track_clicks: false
      , async: false
      , auto_text: true
      }
     }
    , function() {
        console.log('Email sent to ' + to_email);
      }
    , function (e) {
        console.error('Email could not be sent to ' + to_email);
        console.error(e);
      });
  }
};

exports.Application = Application;



