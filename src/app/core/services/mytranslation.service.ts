import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class MytranslationService {

  _translate = inject(TranslateService);
  _pid = inject(PLATFORM_ID);

  constructor() {
    this.changeLangAndDirection('en');
  }

  changeLangAndDirection(lang:any){
    this._translate.setDefaultLang(lang);
    this._translate.use(lang);
    

  }
}
