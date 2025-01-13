import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReportTypeService } from '../../services/report-type.service';
import { CreateReportReq, ReportType } from '../../model/Report.model';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ReportService } from '../../services/report.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-report',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatDatepickerModule,
    MatTimepickerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './create-report.component.html',
  styleUrl: './create-report.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateReportComponent implements OnInit {
  createReportForm: FormGroup;
  reportTypes = signal<ReportType[]>([]);

  constructor(
    private reportTypeService: ReportTypeService,
    private reportService: ReportService,
    private toast: ToastrService,
  ) {
    this.createReportForm = new FormGroup({
      summary: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      hour: new FormControl(null, [Validators.required]),
      address: new FormControl('', [Validators.required]),
      reportType: new FormControl<ReportType | null>(null, [Validators.required]),
      latitude: new FormControl('', [Validators.required, Validators.pattern(/^[-+]?\d+(\.\d+)?$/)]),
      longitude: new FormControl('', [Validators.required, Validators.pattern(/^[-+]?\d+(\.\d+)?$/)]),
    });
  }
  ngOnInit(): void {
    this
      .reportTypeService
      .getReportTypes()
      .subscribe(value => this.reportTypes.set(value))
  }

  onSubmit() {
    const mergedDate = new Date(this.createReportForm.value.date);
    const hours = new Date(this.createReportForm.value.hour);

    mergedDate.setHours(hours.getHours());
    mergedDate.setMinutes(hours.getMinutes());
    mergedDate.setSeconds(hours.getSeconds());

    const transformed: CreateReportReq = {
      summary: this.createReportForm.value.summary,
      description: this.createReportForm.value.description,
      timestamp: mergedDate.toLocaleString(),
      address: this.createReportForm.value.address,
      latitude: parseFloat(this.createReportForm.value.latitude),
      longitude: parseFloat(this.createReportForm.value.longitude),
      reportTypeId: this.createReportForm.value.reportType
    };

    this
      .reportService
      .createReport(transformed)
      .subscribe({
        complete: () => this.toast.success("Ocorrência registrada com sucesso!", "Sucesso")
      });
  }

}
