import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ReferenceService} from '../../../services/api/reference.service';
import {ReferenceModel} from '../../../model/reference.model';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  styleUrls: ['./references.component.scss']
})
export class ReferencesComponent implements OnInit {
  @ViewChild('paginator', {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['CODE', 'DATA', 'EXPIRATION_DATE', 'DOCTOR',
    'REFERENCE_TO', 'DETAILS', 'VISIT_ID'];
  references: MatTableDataSource<ReferenceModel> = new MatTableDataSource<ReferenceModel>();

  constructor(private referenceService: ReferenceService) {
  }

  ngOnInit(): void {
    this.referenceService.findAllOfSubject().subscribe(data => {
      this.references = new MatTableDataSource<ReferenceModel>(data.body);
    });
  }

}


