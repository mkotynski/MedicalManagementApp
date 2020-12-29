import {Component, OnInit} from '@angular/core';
import {MedicalVisitModel} from '../../../../model/medical-visit.model';
import {VisitStatus, VisitStatusPolish} from '../../../../enum/visit-status.enum';
import {RecipeModel} from '../../../../model/recipe.model';
import {ReferenceModel} from '../../../../model/reference.model';
import {ReceiptModel} from '../../../../model/receipt.model';
import {ReceiptPositionModel} from '../../../../model/receipt-position.model';
import {VisitWithDetailsModel} from '../../../../model/visit-with-details.model';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {MedicalVisitService} from '../../../../services/api/medical-visit.service';
import {RecipeService} from '../../../../services/api/recipe.service';
import {ReferenceService} from '../../../../services/api/reference.service';
import {ReceiptService} from '../../../../services/api/receipt.service';
import {ClonerService} from '../../../../services/other/cloner.service';
import {MatDialog} from '@angular/material/dialog';
import {DateManagerService} from '../../../../services/other/date-manager.service';

@Component({
  selector: 'app-more-visit-details',
  templateUrl: './more-visit-details.component.html',
  styleUrls: ['./more-visit-details-patient.component.css']
})
export class MoreVisitDetailsPatientComponent implements OnInit {
  visit: MedicalVisitModel = {doctor: {}, patient: {}, visitType: {}, visitStatus: 1};
  visitId: number;
  visitStatusesPolish = VisitStatusPolish;
  visitStatuses = VisitStatus;
  enumKeys = [];
  date = 'date';
  recipes: RecipeModel[] = [];
  showNewRecipeForm = false;
  newRecipe: RecipeModel = {
    expirationDate: new Date((new Date()).setDate((new Date()).getDate() + 30)),
    positions: []
  };
  showNewRecipePositionForm = false;
  references: ReferenceModel[] = [];
  showNewReferenceForm = false;
  newReference: ReferenceModel = {expirationDate: new Date((new Date()).setDate((new Date()).getDate() + 30))};
  newReceipt: ReceiptModel = {
    expirationDate: new Date((new Date()).setDate((new Date()).getDate() + 30)),
    positions: [],
    receiptStatus: 1
  };
  newReceiptPosition: ReceiptPositionModel = {};
  sumOfCosts = 0.0;
  visitWithDetails: VisitWithDetailsModel = {};

  constructor(private toastrService: ToastrService,
              private route: ActivatedRoute,
              private medicalVisitService: MedicalVisitService,
              private recipeService: RecipeService,
              private referenceService: ReferenceService,
              private receiptService: ReceiptService,
              private clonerService: ClonerService,
              public dialog: MatDialog,
              private dateManagerService: DateManagerService) {
    this.enumKeys = Object.keys(VisitStatus).filter(f => !isNaN(Number(f)));
  }

  ngOnInit(): void {
    this.visitId = +this.route.snapshot.paramMap.get('id');
    this.getMedicalVisit();
    this.getRecipes();
    this.getReferences();
    this.getReceipt();
  }

  getMedicalVisit() {
    console.log(this.visitId);
    this.medicalVisitService.findMedicalVisitOfSubject(this.visitId).subscribe(data => {
      this.visit = data.body;
      this.date = this.dateManagerService.transform(new Date(this.visit.date));
    }, error => {
      this.toastrService.error('You have no permission to look up at this content', 'Access denied!');
    });
  }

  getRecipes() {
    this.recipeService.findByMedicalVisitId(this.visitId).subscribe(data => {
      this.recipes = data.body;
    }, error => {
      this.toastrService.error('You have no permission to look up at this content', 'Access denied!');
    });
  }

  getReferences() {
    this.referenceService.findByMedicalVisitId(this.visitId).subscribe(data => {
      this.references = data.body;
    }, error => {
      this.toastrService.error('You have no permission to look up at this content', 'Access denied!');
    });
  }

  getReceipt() {
    this.receiptService.findByMedicalVisitId(this.visitId).subscribe(data => {
      this.newReceipt = data.body;
      this.newReceipt.positions.forEach(e => {
        this.sumOfCosts += e.value;
      });
    }, error => {
      this.toastrService.error('You have no permission to look up at this content', 'Access denied!');
    });
  }
}
