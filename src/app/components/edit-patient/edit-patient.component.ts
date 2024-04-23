import { Component } from '@angular/core';
import { PatientService } from 'src/app/services/patient-service.service';
import { Patient } from 'src/app/interfaces/patient';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective } from '@coreui/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-edit-patient',
  standalone: true,
  imports: [ButtonDirective, ReactiveFormsModule],
  templateUrl: './edit-patient.component.html',
  styleUrl: './edit-patient.component.scss',
})
export class EditPatientComponent {
  existedPatient!: Patient;
  idPatient!: number;
  fields!: [];
  patient!: Partial<Patient>;
  applyForm = new FormGroup({
    id: new FormControl(0),
    code: new FormControl(''),
    nom: new FormControl(''),
    prenom: new FormControl(''),
    sexe: new FormControl(''),
    gs: new FormControl(''),
    rh: new FormControl(0),
    race: new FormControl(''),
    poids: new FormControl(0),
    taille: new FormControl(0),
    statutMatrimonial: new FormControl(''),
    adresse: new FormControl(''),
    profession: new FormControl(''),
    date_Naissance: new FormControl(''),
  });
  constructor(
    private patientService: PatientService,
    private router: ActivatedRoute
  ) {
    this.router.params.subscribe((params) => {
      this.idPatient = params['id'];
    });
    this.patientService.getPatientById(this.idPatient).then((response) => {
      console.log(response as Patient);
      this.existedPatient = response as Patient;
    });
    console.log(this.existedPatient);
  }
  async editPatient(patient: Partial<Patient>) {
    console.log(this.idPatient);
    this.patient = {
      id: this.applyForm.value.id ?? this.existedPatient.id,
      code: this.applyForm.value.code ?? this.existedPatient.code,
      nom: this.applyForm.value.nom ?? this.existedPatient.nom,
      prenom: this.applyForm.value.prenom ?? this.existedPatient.prenom,
      sexe: this.applyForm.value.sexe ?? this.existedPatient.sexe,
      adresse: this.applyForm.value.adresse ?? this.existedPatient.adresse,
      profession:
        this.applyForm.value.profession ?? this.existedPatient.profession,
      gs: this.applyForm.value.gs ?? this.existedPatient.gs,
      rh: this.applyForm.value.rh ?? this.existedPatient.rh,
      race: this.applyForm.value.race ?? this.existedPatient.race,
      poids: this.applyForm.value.poids ?? this.existedPatient.poids,
      taille: this.applyForm.value.taille ?? this.existedPatient.taille,
      statutMatrimonial:
        this.applyForm.value.statutMatrimonial ??
        this.existedPatient.statutMatrimonial,
    };
    this.patientService
      .updatePatient(this.idPatient, patient)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  clearForm() {
    this.applyForm = new FormGroup({
      id: new FormControl(0),
      code: new FormControl(''),
      nom: new FormControl(''),
      prenom: new FormControl(''),
      sexe: new FormControl(''),
      gs: new FormControl(''),
      rh: new FormControl(0),
      race: new FormControl(''),
      poids: new FormControl(0),
      taille: new FormControl(0),
      statutMatrimonial: new FormControl(''),
      adresse: new FormControl(''),
      profession: new FormControl(''),
      date_Naissance: new FormControl(''),
    });
  }
}
