import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CreateOrEditAddressComponent } from './create-or-edit-address/create-or-edit-address.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
})
export class AddressComponent implements OnInit {

  listAddress: any[] = [];

  constructor(
    private _modalService: BsModalService
  ) { }

  ngOnInit() {
  }

  create(): void {
    this.showCreateOrEdidModal();
  }

  edit(item: any, isView: boolean = false): void {
    this.showCreateOrEdidModal(item.id, isView);
  }

  protected delete(item: any): void {
    const index = this.listAddress.findIndex(x => x.id == item.id);

    if (index > -1)
      this.listAddress.splice(index, 1);
  }

  private showCreateOrEdidModal(id?: number, isView: boolean = false): void {
    let createOrEdit: BsModalRef;
    if (!id) {
      createOrEdit = this._modalService.show(
        CreateOrEditAddressComponent,
        {
          class: 'modal-lg',
          initialState: {
            items: this.listAddress,
          },
        }
      );
    } else {
      createOrEdit = this._modalService.show(
        CreateOrEditAddressComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
            items: this.listAddress,
            isView: isView
          },
        }
      );
    }

    createOrEdit.content.onSave.subscribe((result) => {
      this.listAddress = result;
    });
  }

  private concatField(item: any): string {
    return `${item.address} ${item.neighborhood}, ${item.number}, ${item.city} ${item.state}, ${item.cep} ${item.complement}`
  }

}
