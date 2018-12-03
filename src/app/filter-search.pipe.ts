import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch'
})

export class FilterSearchPipe implements PipeTransform {
  transform(posts: any[], search: string): any[] {
    // Om sökrutan är tom, hämta alla inlägg + kommentarer
    if (search === undefined || search == "") return null;

    // Hämtar alla poster som matchar med söksträngen
    return posts.filter(posts => posts.title.toLowerCase().includes(search.toLowerCase()));
  }
}
