// server code
Mandrill.config({
    username: Meteor.settings.mandrill.user,  // the email address you log into Mandrill with. Only used to set MAIL_URL.
    key:Meteor.settings.mandrill.api_key  // get your Mandrill key from https://mandrillapp.com/settings/index
    // port: 587,  // defaults to 465 for SMTP over TLS
    // host: 'smtp.mandrillapp.com',  // the SMTP host
    // baseUrl: 'https://mandrillapp.com/api/1.0/'  // update this in case Mandrill changes its API endpoint URL or version
});
