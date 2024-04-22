import { DatePipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PatientService } from '../../services/patient-service.service';
import { Patient } from 'src/app/interfaces/patient';
import { ButtonModule } from '@coreui/angular';

@Component({
  selector: 'app-get-allpatients',
  standalone: true,
  imports: [DatePipe, NgFor, ButtonModule],
  templateUrl: './get-allpatients.component.html',
  styleUrl: './get-allpatients.component.scss',
})
export class GetAllpatientsComponent {
  public patients!: Patient[];
  constructor(private service: PatientService) {
    service.fetchData().then((response) => {
      this.patients = response;
    });
  }
  async deletePatient(id: number) {
    this.service.deletePatient(id);
    alert('patient deleted successfully');
  }
}
