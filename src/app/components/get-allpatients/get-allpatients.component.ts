import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PatientService } from '../../services/patient-service.service';
import { Patient } from 'src/app/interfaces/patient';
import { ButtonModule } from '@coreui/angular';
import { UtilsComponent } from '../utils/utils.component';

@Component({
  selector: 'app-get-allpatients',
  standalone: true,
  imports: [DatePipe, NgFor, ButtonModule, UtilsComponent],
  templateUrl: './get-allpatients.component.html',
  styleUrl: './get-allpatients.component.scss',
})
export class GetAllpatientsComponent {
  public patients!: Patient[];
  private utils!: UtilsComponent;
  constructor(private service: PatientService) {
    service.fetchData().then((response) => {
      this.patients = response;
    });
  }
  async deletePatient(id: number) {
    this.service
      .deletePatient(id)
      .then((response: any) => {
        this.utils.refresh();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  async editPatient(id: number, patient: Partial<Patient>) {
    this.service.updatePatient(id, patient).then((res) => {
      console.log(res);
    });
  }
}
