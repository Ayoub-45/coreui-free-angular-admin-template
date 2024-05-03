import { Component, Input, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from 'src/app/services/exam/exam.service';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-exam',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './add-exam.component.html',
  styleUrl: './add-exam.component.scss',
})
export class AddExamComponent {
  examForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private examService: ExamService,
    private location: Location
  ) {
    this.examForm = this.formBuilder.group({
      idPatient: ['', Validators.required],
      idPathologie: ['', Validators.required],
      idMedecin: ['', Validators.required],
      date_Examen: [new Date(), Validators.required],
    });
  }
  onSubmit() {
    if (this.examForm.valid) {
      this.examService.addData(this.examForm.value);
    }
  }
  goback(): void {
    this.location.back();
  }
}
