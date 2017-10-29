import { LibraryService } from '../services/library.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  book: any;

  constructor(private route: ActivatedRoute, private libraryService: LibraryService) { }

  ngOnInit() {
    console.log(this.route.snapshot.params['id']);
    this.libraryService.getBookById(this.route.snapshot.params['id']).subscribe(data => {
      console.log(data);
      this.book = data;
    });
  }
}
