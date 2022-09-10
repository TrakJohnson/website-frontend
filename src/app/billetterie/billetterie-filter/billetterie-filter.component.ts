import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Pole} from 'src/app/models/pole.model';
import {PoleService} from 'src/app/services/poles.service';

@Component({
  selector: 'app-billetterie-filter',
  templateUrl: './billetterie-filter.component.html',
  styleUrls: ['./billetterie-filter.component.scss']
})
export class BilletterieFilterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private poleService: PoleService) {
  }


  @Output() requirementsToSend = new EventEmitter();

  requirements: any = {"on_sale": [1]};
  loading = false;
  requirementsForm: FormGroup;
  polesChoicesSub: Subscription;
  polesChoices: any;

  async ngOnInit() {
    this.emitRequirements();
    this.requirementsForm = this.formBuilder.group({
      pole_id: [null],
      title: [null],
      on_sale: [1],
    });

    this.polesChoicesSub = this.poleService.poles$.subscribe(
      (poleData: any) => {
        this.polesChoices = Object.keys(poleData)
          .filter((pole: string) => poleData[pole].hasBilletterie)
          .map((pole: string) => {
            return {value: poleData[pole].pole_id, viewValue: poleData[pole].name}
          });
      }
    )

    await this.poleService.getPoles();

    this.requirementsForm.valueChanges.subscribe(this.onChangeRequirements);
  }

  emitRequirements() {
    this.requirementsToSend.emit(this.requirements);
  }

  addRequirement(field: string, value: any) {
    if (value != null) {
      if (this.requirements[field] == null) {
        this.requirements[field] = [];
      }
      this.requirements[field].push(value);
    }
  }

  onChangeRequirements() {
    this.clearAllRequirements();
    console.log({ctrl: this.requirementsForm.controls});
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
