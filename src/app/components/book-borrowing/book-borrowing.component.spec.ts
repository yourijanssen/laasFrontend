import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookBorrowingComponent } from './book-borrowing.component';

describe('BookBorrowingComponent', () => {
  let component: BookBorrowingComponent;
  let fixture: ComponentFixture<BookBorrowingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookBorrowingComponent]
    });
    fixture = TestBed.createComponent(BookBorrowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
