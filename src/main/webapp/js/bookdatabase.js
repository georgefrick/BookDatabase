
/*
 * This is based off an example by Gauthier, but provides a restful backend in order to become a better
 * examples; as the benefits of Tomcat/Java EE 6
 */  
( function() { 
   	"use strict";
   	
   	
   	/* from Gauthier */
    var loadTemplate = function(name) {
        return Mustache.compile($('#'+name+'-template').html());
    };
      
   	/* Everything into its own scope. */
   	var BookDatabase = {};
    window.BookDatabase = BookDatabase;

    BookDatabase.BookEntry = Backbone.Model.extend({
   	  defaults: {   		
   		title : "untitled",
   		isbn : "noisbn",
   		author : "no author"
   		/* If you give something a field called "id", this won't work! */
   	  },
   	  urlRoot:  "rest/books", // nice huh :-)
      title:  function() { return this.get('title'); },
      isbn:   function() { return this.get('isbn'); },
      author: function() { return this.get('author'); }
    });
    

    BookDatabase.Books = Backbone.Collection.extend({
    	model: BookDatabase.BookEntry,
    	url:  "rest/books"
    });

    /* This can be created without giving it a model, it is a 'top-level' view. */
    BookDatabase.Shelf = Backbone.View.extend({
        initialize: function() {
          this.template = loadTemplate('shelf');
          this.books = new BookDatabase.Books();
          this.books.on('all', this.render, this);
          this.books.fetch();         
        },
        render: function() {                  
          this.$el.html(this.template(this));
          this.books.each(this.addBook, this);
          var form = new BookDatabase.Shelf.Form({collection: this.books});
          this.$el.append(form.render().el);
          return this;
        },
        addBook: function(book) {   	
          var view = new BookDatabase.Shelf.Book({model: book});
          this.$('.books').append(view.render().el);
        },
        count: function() {
          return this.books.length;
        }
      });
    
    BookDatabase.Shelf.Book = Backbone.View.extend({        
        initialize: function() {
        	this.template = loadTemplate('book');
        },
        events: {
          'click button': 'delete'
        },
        render: function() {
          this.$el.html(this.template(this));
          return this;
        },
        title: function() { return this.model.get('title'); },
        author: function() { return this.model.get('author'); },
        isbn: function() { return this.model.get('isbn'); },
        delete: function() {
          this.model.destroy();
        }
      });

    BookDatabase.Shelf.Form = Backbone.View.extend({
        tagName: 'form',
        className: 'form-horizontal',
        initialize : function() {
        	this.template = loadTemplate('form');
        },
        events: {
          'submit': 'add'
        },
        render: function() {
          this.$el.html(this.template(this));
          return this;
        },
        add: function(event) {
          event.preventDefault();
          this.collection.create({
            title: this.$('#title').val(),
            author: this.$('#author').val(),
            isbn: this.$('#isbn').val()
          });
          this.render();
        }
      });
    
    
    BookDatabase.Router = Backbone.Router.extend({
        initialize: function(options) {
          this.el = options.el;
        },
        routes: {
          "" : "shelf",
          "other" : "other"
        },
        shelf: function() {
          var shelf = new BookDatabase.Shelf();         
          this.el.empty(); // empty the page.
          this.el.append(shelf.render().el);          
        },
        other: function() {                    
            this.el.empty(); 
            this.el.append("<H4>This is the other page...</H4>");          
            this.el.append("<p><a href='#'>Go back to your bookshelf</a></p>");
          }
      });
    
    BookDatabase.startup = function(container) {
        container = $(container);
        var router = new BookDatabase.Router({el: container});
        Backbone.history.start();
      };
    
  })();