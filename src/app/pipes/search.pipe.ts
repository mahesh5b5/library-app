import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(books: any, searchText: any): any {
    // tslint:disable-next-line:curly
    if (searchText == null) return books;
    return books.filter(function (category) {
      return category.title.toLowerCase().indexOf(searchText) > -1;
    });
  }

}
