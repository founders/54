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

var Main = function () {
  this.index = function (req, resp, params) {
    this.respond({params: params}, {
      format: 'html'
    , template: 'app/views/main/index'
    });
  };

  this.signup = function (req, resp, params) {
    var self = this;

    var MailChimpAPI = require('mailchimp').MailChimpAPI;

    var apiKey = process.env.MAILCHIMP_API_KEY;

    try {
    	var api = new MailChimpAPI(apiKey, { version :'2.0'});
	}
	catch(error){
		console.log(error.message);
	}

	api.call('lists', 'subscribe', {id:'738042e901', email: {email: params.NetID+"@illinois.edu"}}, function(error,data){
		if (!error){
			var content = "There's a new subscriber!"
			self.email(geddy.config.event.teamEmail, geddy.config.event.teamName, params.NetID + ' subscribed to the email list', content);
		}
		else{
			console.log(error.message);
			var content = "There was an error: " + error.message;
			self.email(geddy.config.event.teamEmail, geddy.config.event.teamName, 'There was an error', content);
		}
	});
    
    this.respond({params: params}, {
      format: 'html'
    , template: 'app/views/main/index'
    });
  };
};

exports.Main = Main;


