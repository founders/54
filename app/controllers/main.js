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

var MailChimpAPI = require('mailchimp').MailChimpAPI
  , _ = require('lodash')
  , Main;

Main = function () {
  this.index = function (req, resp, params) {
    this.respond({params: params}, {
      format: 'html'
    , template: 'app/views/main/index'
    });
  };

  this.signup = function (req, resp, params) {
    var self = this
    , apiKey = process.env.MAILCHIMP_API_KEY
    , email = params.netid+'@illinois.edu';

    try {
      var api = new MailChimpAPI(apiKey, { version :'2.0'});
    }
    catch(error){
      console.log(error.message);
    }

    api.call('lists'
    , 'subscribe'
      , {id:'738042e901', email: {email: email}, double_optin: false}
      , function(error,data){
          var title, content;

          if (!error){
            title = _.template('{{email}} has just subscribed to 54')({email: email})
            content = 'Hope you\'re having a good day, team!<br /><br />Much love,<br />The 54 Bot';

            self.email(geddy.config.event.teamEmail, geddy.config.event.teamName, title, content);
          }
          else{
            content = _.template('There was an error subscribing {{email}}: {{msg}}')({email: email, msg: error.message});

            console.log(error.message);

            self.email(geddy.config.event.teamEmail, geddy.config.event.teamName, 'Subscription Error', content);
          }
        });

    this.respond({params: params}, {
    format: 'html'
    , template: 'app/views/main/index'
    });
  };
};

exports.Main = Main;


