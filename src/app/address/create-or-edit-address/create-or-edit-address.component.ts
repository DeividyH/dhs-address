import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-or-edit-address',
  templateUrl: './create-or-edit-address.component.html',
  styleUrls: ['./create-or-edit-address.component.css']
})
export class CreateOrEditAddressComponent implements OnInit {

  id: number = 0;
  items: any[] = [];
  isView: boolean = false;
  saving: boolean = false;

  itemAddress: any = {
    id: undefined,
    cep: '',
    address: '',
    neighborhood: '',
    number: 0,
    city: '',
    state: '',
    complement: ''
  };

  @Output() onSave = new EventEmitter<any>();

  constructor(
    public bsModalRef: BsModalRef
  ) {
  }
  ngOnInit(): void {
    if (this.id > 0)
      this.get();
  }

  get(): void {
    const index = this.items.findIndex(x => x.id == this.id);

    if (index > -1) {
      this.itemAddress.id = this.items[index].id;
      this.itemAddress.cep = this.items[index].cep;
      this.itemAddress.address = this.items[index].address;
      this.itemAddress.neighborhood = this.items[index].neighborhood;
      this.itemAddress.number = this.items[index].number;
      this.itemAddress.city = this.items[index].city;
      this.itemAddress.state = this.items[index].state;
      this.itemAddress.complement = this.items[index].complement;
    }
  }

  save(): void {
    this.saving = true;

    if (this.id == 0)
      this.create();
    else
      this.update();

    setTimeout(() => {
    }, 3000);

    this.saving = false;

    this.bsModalRef.hide();
    this.onSave.emit(this.items);
  }

  create(): void {
    let lastId = this.items.length;

    this.itemAddress.id = lastId + 1;
    this.items.push(this.itemAddress);
  }

  update(): void {
    const index = this.items.findIndex(x => x.id == this.id);

    if (index > -1) {
      this.items[index].id = this.id;
      this.items[index].cep = this.itemAddress.cep;
      this.items[index].address = this.itemAddress.address;
      this.items[index].neighborhood = this.itemAddress.neighborhood;
      this.items[index].number = this.itemAddress.number;
      this.items[index].city = this.itemAddress.city;
      this.items[index].state = this.itemAddress.state;
      this.items[index].complement = this.itemAddress.complement;
    }
  }

  validate(): boolean {
    return (
      this.itemAddress.cep != null && this.itemAddress.cep != "" &&
      this.itemAddress.address != null && this.itemAddress.address != "" &&
      this.itemAddress.neighborhood != null && this.itemAddress.neighborhood != "" &&
      this.itemAddress.city != null && this.itemAddress.city != "" &&
      this.itemAddress.state != null && this.itemAddress.state != ""
    );
  }
}
