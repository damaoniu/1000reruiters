Meteor.startup(function(){
    Stripe.setPublishableKey("pk_test_q77EeIZ9gTdFBHeoCKdyI6WO");
    //GoogleMaps.load({
    //    key: 'AIzaSyDB7Vt5dnLgsHHDA_QzbUzKHyUiuUzgTNw',
    //    libraries: 'places'  // also accepts an array if you need more than one
    //});
    //set language
    TAPi18n.setLanguage('en');

    // declare the global submanages variables
    subsManger = new SubsManager({
        // maximum number of cache subscriptions
        cacheLimit: 10,
        // any subscription will be expire after 5 minute, if it's not subscribed again
        expireIn: 5
    });
});