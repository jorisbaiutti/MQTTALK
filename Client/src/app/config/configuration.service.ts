import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Config } from './config';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  private config: Config;

  constructor(private http: HttpClient) {
  }

  public getConfig(): Config {
    return this.config;
  }

  public loadConfig(): Promise<Config> {
    return this.http.get<Config>('/assets/appConfig.json')
      .pipe(tap(c => this.config = c), tap(c => console.log('Config loaded', c)))
      .toPromise();
  }
}
