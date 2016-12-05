import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public Server: string = "http://test.weberantoine.fr/";
    public ApiUrl: string = "coiffure/API/php-crud-api/api.php/";
    public ServerWithApiUrl = this.Server + this.ApiUrl;
}
