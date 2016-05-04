// app/routes/application.js
import Ember from 'ember';

export default Ember.Route.extend({
  errorMessage: 'nil',

  beforeModel: function() { 
    return this.get("session").fetch().then(function() {
      console.log("fetched");
      this.transitionTo('projects');
    }.bind(this), function(error) {
      console.log("not fetched" + error);
    });
  },

  model: function() {
    return {
      users:this.store.findAll('user'),
      errorMessage: ''
    };
  },

  actions: {
    openModal: function(){
      $('#login').openModal();
    },
    openProjectModel: function(){
      $('#projectCreation').openModal();
    },
    signIn: function(provider) {      
      this.get("session").open("firebase", provider).then(function(data) {
        if(provider.provider === "google" || provider.provider === "facebook") {
          this.store.query('user', {
            orderBy: 'email', 
            equalTo: data.currentUser.cachedUserProfile.id
          }).then(function(success){
            if(success.get('content').get('length') > 0) {
              console.log("found in here");
            } else {
              console.log("not in here");
              var user = this.store.createRecord('user', {
                firstName: data.currentUser.cachedUserProfile.given_name,
                lastName: data.currentUser.cachedUserProfile.family_name,
                email: data.currentUser.cachedUserProfile.id,
                picUrl: data.currentUser.profileImageURL,
                joined: new Date()  
              });
              if(provider.provider === "facebook") {
                user.set('firstName', data.currentUser.cachedUserProfile.first_name);
                user.set('lastName', data.currentUser.cachedUserProfile.last_name);
              }
              user.save();
            }
            this.transitionTo('/projects');
          }.bind(this), function(error){
            console.log(error);
          });
        } else {
            console.log("User exists");
            this.transitionTo('/projects');
        }
        Ember.set(this.modelFor(this.routeName),'errorMessage','');
        $('#login').closeModal();
      }.bind(this), function(error) {
        console.log("Could not log in: " + error.message);
        Ember.set(this.modelFor(this.routeName),'errorMessage',"Incorrect e-mail or password.");
      }.bind(this));
    },
    closeTeamCreation: function() {
      console.log('why am i here');
    },
    // openTeamCreation: function(project){
    //   //create the project record
    //   var newProject = this.store.createRecord('project', {
    //     name: project.name,
    //     goal: project.goal,
    //     created: project.created,
    //     deadline: project.deadline,
    //     users: project.users
    //   });

    //   //add the project to each of the users in the project
    //   newProject.get('users').forEach(function(user){
    //     user.get('projects').pushObject(newProject);
    //     user.save();
    //   });

    //   project.currentUser.set('lastProjectOpen', newProject);
    //   project.currentUser.save();

    //   newProject.save().then(function(value){ 
    //     console.log(value);
    //   });
    //   this.modelFor(this.routeName).rollback(); 

    //   $('#teamCreation').prop('currentProject', newProject);
    //   $('#teamCreation').openModal();
    // },
    signOut: function() {   
      this.get("session").close();
      this.transitionTo('/');
    },

    submit: function(data) 
      {
      var __this__ = this;
      var ref = new Firebase("https://planly.firebaseio.com");
      ref.createUser({
        email    : data.email,
        password : data.password
      }, function(error, userData) {
        if (error) {
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          __this__.session.open("firebase", {
            provider: "password",
            email: data.email,
            password: data.password
          }).then(function(data2) {
            console.log(data2.uid);
          
            __this__.store.createRecord('user', {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              picUrl: data2.currentUser.profileImageURL,
              joined: new Date()
           }).save(); 
          });
          $('#login').closeModal();
        }
      });
    }
  }   
});