import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MedicalVisitModel} from '../../../model/medical-visit.model';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MedicalVisitService} from '../../../services/api/medical-visit.service';

@Component({
  selector: 'app-visits-history',
  templateUrl: './visits-history-patient.component.html',
  styleUrls: ['./visits-history-patient.component.css']
})
export class VisitsHistoryPatientComponent implements OnInit {
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['ID', 'DATA', 'PATIENT', 'DESCRIPTION', 'MORE_DETAILS'];
  visitsHistory: MatTableDataSource<MedicalVisitModel> = new MatTableDataSource<MedicalVisitModel>();

  constructor(private medicalVisitService: MedicalVisitService) {
  }

  ngOnInit(): void {
    this.medicalVisitService.findVisitsHistoryOfSubject().subscribe(data => {
      this.visitsHistory = new MatTableDataSource<MedicalVisitModel>(data.body);
    });
  }

}
