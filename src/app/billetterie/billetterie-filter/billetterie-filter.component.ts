import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-billetterie-filter',
  templateUrl: './billetterie-filter.component.html',
  styleUrls: ['./billetterie-filter.component.scss']
})
export class BilletterieFilterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }
  

  @Output() requirementsToSend = new EventEmitter();

  requirements : any = {};
  loading = false;
  requirementsForm: FormGroup;

  ecoles = [
    {value: 'Mines', viewValue: 'Mines'},
    {value: 'Ponts', viewValue: 'Ponts'},
    {value: 'ENSTA', viewValue: 'ENSTA'},
    {value: 'Ete', viewValue: 'Ete'},
    {value: 'Autre', viewValue: 'Autre'},
  ];

  typePaiements = [
    {value : "cheque", viewValue : "Chèque"},
    {value : "liquide", viewValue : "Liquide"},
    {value : "lydia", viewValue : "Lydia"},
    {value : "Autre", viewValue : "Autre"},
  ]

  promotions = [
    {value: 'P18', viewValue: 'P18'},
    {value: 'P19', viewValue: 'P19'},
    {value: 'P20', viewValue: 'P20'},
    {value: 'P21', viewValue: 'P21'},
  ]

  trimestreStatus = [
    {value: '1', viewValue: 'Cotisé'},
    {value: '0', viewValue: 'Pas cotisé'},
  ]

  ngOnInit() {
    this.emitRequirements();
    this.requirementsForm = this.formBuilder.group({
        login: [null],
        ecole: [null],
        promotion: [null],
        typePaiement: [null],
        chambre : [null],
        T1 : [null],
        T2 : [null],
        T3 : [null]
    });
  }

  emitRequirements() {
    this.requirementsToSend.emit(this.requirements);
  }

  addRequirement(field : string, value : any){
    if (value != null) {
      if (this.requirements[field] == null) {
        this.requirements[field] = [];
      }
      this.requirements[field].push(value);
    }
  }

  onChangeRequirements() {
    this.clearAllRequirements();
    Object.keys(this.requirementsForm.controls).forEach(key => {
      this.addRequirement(key, this.requirementsForm.value[key]);
    });
    this.emitRequirements();
  }

  clearAllRequirements() {
      this.requirements = {};
      this.emitRequirements();
  }
}