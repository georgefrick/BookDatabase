module( "BookDatabase.basicTests", {  
  setup: function() {  
    this.db = new BookDatabase.Books();  
    this.db.add(new BookDatabase.BookEntry({ 'title' : "Book1",    'isbn' : "B000", 'author' : "George"  }));  
    this.db.add(new BookDatabase.BookEntry({ 'title' : "Book Two", 'isbn' : "B001", 'author' : "Robert"  }));  
    this.db.add(new BookDatabase.BookEntry({ 'title' : "Book 3",   'isbn' : "B002", 'author' : "Nikki"  }));  
  },  
  teardown: function() {  
    window.errors = null;  
  }  
});  

test("Just showing use of pluck.", function() {  
  expect( 1 );  
  var expected = ["George", "Robert", "Nikki"];  
  var actual = this.db.pluck("author");  
  deepEqual( actual, expected, "Pull out all of the authors." );  
});  