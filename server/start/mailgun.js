Meteor.startup(function(){
    process.env.MAIL_URL ="smtp://postmaster%40"+ Meteor.settings.mailgun.smtpLogin+":"+encodeURIComponent(Meteor.settings.mailgun.pass)+"@smtp.mailgun.org:587";
});