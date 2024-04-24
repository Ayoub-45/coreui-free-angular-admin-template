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
  existedPatient: any = {};
  idPatient!: number;
  patient!: Partial<Patient>;
  applyForm = new FormGroup({
    id: new FormControl(this.existedPatient.id),
    code: new FormControl(this.existedPatient.code),
    nom: new FormControl(this.existedPatient.nom),
    prenom: new FormControl(this.existedPatient.prenom),
    sexe: new FormControl(this.existedPatient.sexe),
    gs: new FormControl(this.existedPatient.gs),
    rh: new FormControl(this.existedPatient.rh),
    race: new FormControl(this.existedPatient.race),
    poids: new FormControl(this.existedPatient.poids),
    taille: new FormControl(this.existedPatient.taille),
    statutMatrimonial: new FormControl(this.existedPatient.statutMatrimonial),
    adresse: new FormControl(this.existedPatient.adresse),
    profession: new FormControl(this.existedPatient.profession),
    date_Naissance: new FormControl(this.existedPatient.date_Naissance),
  });
  constructor(
    private patientService: PatientService,
    private router: ActivatedRoute
  ) {
    this.router.params.subscribe((params) => {
      this.idPatient = params['id'];
    });
    this.patientService
      .getPatientById(this.idPatient)
      .then((response) => {
        return response;
      })
      .then((data) => {
        this.existedPatient = data;
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(this.existedPatient);
  }
  async submitApplication() {
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
      .updatePatient(this.idPatient, this.patient)
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
