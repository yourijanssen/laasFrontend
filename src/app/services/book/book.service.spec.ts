import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import this for HttpClient testing
import { BookService } from './book.service'; // Import your service

describe('BookService', () => {
  let service: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import HttpClientTestingModule for testing HTTP calls
      providers: [BookService] // Provide BookService to be tested
    });
    service = TestBed.inject(BookService); // Inject the BookService instance
  });

  it('should be created', () => {
    expect(service).toBeTruthy(); // Test if the service is instantiated correctly
  });
});
