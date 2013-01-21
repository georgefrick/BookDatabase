package com.georgefrick.fun;

/**
 * Represent a book in your personal library.
 * 
 * @author George Frick (george.frick@gmail.com)
 * 
 */
public class BookEntry {

	Long id;
	String title;
	String isbn;
	String author;

	/* Add more fields! */
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}
}
