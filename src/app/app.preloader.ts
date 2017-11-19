import { PreloadingStrategy, Route } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

export class AppPreloader implements PreloadingStrategy {
  preload(route: Route, load: Function): Observable<any> {
		console.log("Preloading things");
    return route.data && route.data.preload ? load() : of(null);
  }
}