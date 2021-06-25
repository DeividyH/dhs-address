import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { throwError } from "rxjs";
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class CepService {
    itemAddress: any;

    constructor(
        private http: HttpClient
    ) {
    }

    private isNumber(n): boolean {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    private viaCep(cep) {
        var cep = cep;
        cep = cep.replace('-', '');

        if (!this.isNumber(cep))
            return false;

        cep = cep.substring(0, 5) + '-' + cep.substring(5, 8);

        this.http.get<any>('/api/' + cep + '/json/')
            .pipe(
                retry(2),
                catchError(this.handleError)
            )
            .subscribe((x) => {
                if (x.erro == undefined) {
                    this.itemAddress = {
                        cep: x.cep,
                        address: x.logradouro,
                        neighborhood: x.bairro,
                        number: 0,
                        city: x.localidade,
                        state: x.uf,
                        complement: ''
                    };
                }
                else {
                    // return false;
                }
            });
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            //client
            errorMessage = error.error.message;
        } else {
            //servidor
            errorMessage = `id: ${error.status}, ` + `menssage: ${error.message}`;
        }

        console.log(errorMessage);
        return throwError(errorMessage);
    };

    getAddress(cep: string): boolean {
        if ((cep.length == 8 && cep[5] != '-') || cep.length == 9) {
            this.viaCep(cep);
        }
        else {
            if (cep.length > 9)
                return false;
        }

        return true;
    }
}