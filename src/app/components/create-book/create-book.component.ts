import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.component.html',
  styleUrls: ['./create-book.component.css'],
})
export class CreateBookComponent {
  bookForm: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService
  ) {
    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      description: ['', Validators.required],
      isbn10: [''],
      isbn13: ['', Validators.required],
      imgUrl: ['', Validators.required],
      ebookUrl: [''],
      copies: [1, [Validators.required, Validators.min(1)]]
    });
  }

  addBook(): void {
    this.submitted = true;
    if (this.bookForm.invalid) return;
  
    const formValue = this.bookForm.value;
    const numberOfCopies = formValue.copies;
  
    const bookData = {
      title: formValue.title,
      author: formValue.author,
      description: formValue.description,
      isbn10: formValue.isbn10,
      isbn13: formValue.isbn13,
      imgUrl: formValue.imgUrl,
      ebookUrl: formValue.ebookUrl
    };
  
    this.bookService.addBook(bookData).subscribe({
      next: (createdBook) => {
        const bookId = createdBook.id; // Extract the book ID from the created book object
        console.log('Book created with ID:', bookId);
  
        // Now call the addBookCopies method with the bookId and number of copies
        this.bookService.addBookCopies(bookId, numberOfCopies).subscribe({
          next: () => {
            alert('Book and copies added successfully!');
            this.bookForm.reset();
            this.submitted = false;
          },
          error: (err) => {
            console.error('Error adding book copies:', err);
            alert('Failed to add some book copies.');
          }
        });
      },
      error: (err) => {
        console.error('Error adding book:', err);
        alert('Failed to add book.');
      }
    });
  }
}