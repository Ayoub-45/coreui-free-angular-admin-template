import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Patient } from 'src/app/interfaces/patient';
import { PatientService } from 'src/app/services/patient-service.service';
@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './patient-dashboard.component.html',
  styleUrl: './patient-dashboard.component.scss',
})
export class PatientDashboardComponent implements OnInit {
  patient!: Patient;
  id!: number;
  constructor(private route: ActivatedRoute, private service: PatientService) {
    this.getPatientById(this.id).then((response: any) => {
      const p = response;
      this.patient = p[0];
    });
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id']; // Access the 'id' parameter from the URL
      console.log('Test ID:', this.id);
    });
  }
  async getPatientById(id: number) {
    const patients = await this.service.fetchData();
    return patients.filter((p) => p.id !== id);
  }
}
