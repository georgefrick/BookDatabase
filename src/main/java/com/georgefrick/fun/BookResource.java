package com.georgefrick.fun;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.Consumes;
import javax.ws.rs.core.MediaType;

/**
 * BookResource a restful CRUD interface. This resource when found by an
 * implementation of JAX-RS (tested with RestEasy); will allow for modification
 * of a non-persistent book database.
 * 
 * @author George Frick (george.frick@gmail.com)
 * 
 */
@Path("/books")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class BookResource {

	/**
	 * For the sake of the example; this is our database! Not production
	 * ready...
	 */
	private static Map<Long, BookEntry> books = new HashMap<Long, BookEntry>();
	private static long key = 1;

	/**
	 * When getting /books return all the books.
	 * 
	 * @return all books.
	 */
	@GET
	public Collection<BookEntry> getBooks() {
		return books.values();
	}

	/**
	 * When calling POST with no id, create a new book.
	 * 
	 * @param entry
	 *            The book, converted from json
	 * @return BookEntry The book, id added.
	 */
	@POST
	public BookEntry createBook(BookEntry entry) {
		entry.setId(key);
		books.put(key++, entry);
		return entry;
	}

	/**
	 * When calling /books/# return that book.
	 * 
	 * @param id
	 *            Id of book to return.
	 * @return BookEntry The book with corresponding ID. (or a new book because
	 *         of our simple database)
	 */
	@GET
	@Path("/{id}")
	public BookEntry getBook(@PathParam("id") Long id) {
		return books.get(id);
	}

	/**
	 * When a put is called on /books/# then that id number will be 'updated'.
	 * 
	 * @param id
	 *            Which book to update.
	 * @param entry
	 *            New book data.
	 * @return BookEntry The same book passed in, in case something "couldn't"
	 *         be updated.
	 */
	@PUT
	@Path("/{id}")
	public BookEntry updateBook(@PathParam("id") Long id, BookEntry entry) {
		books.put(key++, entry);
		return entry;
	}

	/**
	 * When a delete is called on /books/# then the book with that id is
	 * discarded.
	 * 
	 * @param id
	 *            Which book to delete.
	 * @return OK status.
	 */
	@DELETE
	@Path("/{id}")
	public String deleteBook(@PathParam("id") Long id) {
		books.remove(id);
		return "OK";
	}

}
