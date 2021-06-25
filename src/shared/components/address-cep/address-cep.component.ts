import { Component, Input, OnChanges } from '@angular/core';
import { CepService } from 'src/shared/services/cep.service';

@Component({
  selector: 'app-address-cep',
  templateUrl: './address-cep.component.html',
  styleUrls: ['./address-cep.component.css'],
  providers: [
    CepService
  ]
})
export class AddressCepComponent implements OnChanges {

  @Input() item: any = null;
  @Input() required: boolean = false;
  @Input() disabled: boolean = false;

  constructor(
    private _cepService: CepService
  ) { }

  ngOnChanges(changes: any): void {
    if (this.item == null) {
      this.item = {
        cep: '',
        address: '',
        neighborhood: '',
        number: 0,
        city: '',
        state: '',
        complement: ''
      };
    }
  }

  loadCep(): void {
    if (!this._cepService.getAddress(this.item.cep)) {
      //
    }
    else {
      setTimeout(() => {
        this.item.cep = this._cepService.itemAddress.cep;
        this.item.address = this._cepService.itemAddress.address;
        this.item.neighborhood = this._cepService.itemAddress.neighborhood;
        this.item.number = this._cepService.itemAddress.number;
        this.item.city = this._cepService.itemAddress.city;
        this.item.state = this._cepService.itemAddress.state;
        this.item.complement = this._cepService.itemAddress.complement;
      }, 500);
    }
  }

  validate(): boolean {
    if (!this.required) {
      return true;
    }

    return (
      this.item.cep != null && this.item.cep != "" &&
      this.item.address != null && this.item.address != ""
    );
  }

}
