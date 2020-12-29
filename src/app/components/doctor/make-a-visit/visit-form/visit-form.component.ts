import {Component, Inject, OnInit} from '@angular/core';
import {MedicalVisitModel} from '../../../../model/medical-visit.model';
import {ToastrService} from 'ngx-toastr';
import {ActivatedRoute} from '@angular/router';
import {MedicalVisitService} from '../../../../services/api/medical-visit.service';
import {DateManagerService} from '../../../../services/other/date-manager.service';
import {VisitStatus, VisitStatusPolish} from '../../../../enum/visit-status.enum';
import {RecipeModel} from '../../../../model/recipe.model';
import {RecipePositionModel} from '../../../../model/recipe-position.model';
import {ClonerService} from '../../../../services/other/cloner.service';
import {ReferenceModel} from '../../../../model/reference.model';
import {ReceiptModel} from '../../../../model/receipt.model';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ReceiptPositionModel} from '../../../../model/receipt-position.model';
import {VisitWithDetailsModel} from '../../../../model/visit-with-details.model';
import {RecipeService} from '../../../../services/api/recipe.service';
import {ReferenceService} from '../../../../services/api/reference.service';
import {ReceiptService} from '../../../../services/api/receipt.service';

@Component({
  selector: 'app-visit-form',
  templateUrl: './visit-form.component.html',
  styleUrls: ['./visit-form.component.css']
})
export class VisitFormComponent implements OnInit {
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

  addNewRecipe() {
    if (this.newRecipe.positions.length > 0) {
      this.recipes.push(this.clonerService.deepClone(this.newRecipe));
      this.addNewRecipeForm();
      this.newRecipe = {
        expirationDate: new Date((new Date()).setDate((new Date()).getDate() + 30)),
        positions: []
      };
      this.toastrService.success('Poprawnie dodano recepte', 'SUKCES');
    } else {
      this.toastrService.error('Nie wypełniono wszystkich wymaganych pól', 'BŁĄD');
    }
  }

  addNewRecipeForm() {
    this.showNewRecipeForm = !this.showNewRecipeForm;
    this.showNewReferenceForm = false;
  }


  cancelNewRecipe() {
    this.newRecipe = {};
    this.newRecipe = {
      expirationDate: new Date((new Date()).setDate((new Date()).getDate() + 30)),
      positions: []
    };
    this.addNewRecipeForm();
  }

  deleteRecipe(recipe: RecipeModel) {
    this.recipes = this.recipes.filter(item => item !== recipe);
    this.toastrService.success('Usunięto receptę', 'SUKCES');
  }

  deleteReference(reference: ReferenceModel) {
    this.references = this.references.filter(item => item !== reference);
    this.toastrService.success('Usunięto skierowane', 'SUKCES');
  }

  addNewReference() {
    if (this.isReferenceValid()) {
      this.references.push(this.newReference);
      this.newReference = {};
      this.newReference = {expirationDate: new Date((new Date()).setDate((new Date()).getDate() + 30))};
      this.toastrService.success('Poprawnie dodano recepte', 'SUKCES');
    } else {
      this.toastrService.error('Nie wypełniono wszystkich wymaganych pól', 'BŁĄD');
    }
  }

  isReferenceValid() {
    if (this.newReference.referenceTo != null
      && this.newReference.details != null
      && this.newReference.expirationDate != null) {
      return true;
    }
    return false;
  }

  openReceiptDialog(): void {
    const dialogRef = this.dialog.open(AddNewPositionReceiptDialogComponent, {
      width: '30%',
      data: {receiptPosition: this.newReceiptPosition}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addNewReceiptPosition();
    });
  }

  openReferenceDialog() {
    console.log(this.newReference);
    const dialogRef = this.dialog.open(AddNewReferenceDialogComponent, {
      width: '40%',
      data: {reference: this.newReference}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addNewReference();
    });
  }

  openRecipeDialog() {
    console.log(this.newReference);
    const dialogRef = this.dialog.open(AddNewRecipeDialogComponent, {
      width: '40%',
      data: {recipe: this.newRecipe}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addNewRecipe();
    });
  }

  private addNewReceiptPosition() {
    if (this.isReceiptValid()) {
      this.newReceipt.positions.push(this.clonerService.deepClone(this.newReceiptPosition));
      this.newReceipt.positions.forEach(e => {
        this.sumOfCosts += e.value;
        }
      );
      this.newReceiptPosition = { };
      this.toastrService.success('Poprawnie dodano pozycję rachunku', 'SUKCES');
    } else {
      this.toastrService.error('Nie wypełniono wszystkich wymaganych pól', 'BŁĄD');
    }
  }

  private isReceiptValid() {
    if (this.newReceiptPosition.description != null
      && this.newReceiptPosition.value != null
      && this.newReceiptPosition.value >= 0.0) {
      return true;
    }
    return false;
  }

  saveVisit() {
    this.visitWithDetails = { medicalVisit: this.visit, receipt: this.newReceipt, recipes: this.recipes, references: this.references };
    console.log(this.visitWithDetails);
    this.medicalVisitService.saveVisitWithDetails(this.visitWithDetails).subscribe(data => {
      console.log(data);
      this.toastrService.success('Poprawnie zapisano zmiany dotyczące wizyty', 'SUKCES');
    }, error => {
      this.toastrService.error('Wystąpił błąd przy zapisywaniu zmian', 'BŁĄD');
    });
  }

  deleteReceiptPosition(receiptPos: ReceiptPositionModel) {
    this.newReceipt.positions = this.newReceipt.positions.filter(item => item !== receiptPos);
    this.toastrService.success('Usunięto pozycje z rachunku', 'SUKCES');
  }
}

export interface DialogData {
  receiptPosition: ReceiptPositionModel;
}

export interface DialogDataReference {
  reference: ReferenceModel;
}

export interface DialogDataRecipe {
  recipe: RecipeModel;
}

@Component({
  selector: 'app-add-new-position-receipt-dialog',
  templateUrl: 'add-new-position-receipt-dialog.html',
})
export class AddNewPositionReceiptDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddNewPositionReceiptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'app-add-new-reference-dialog',
  templateUrl: 'add-new-reference-dialog.html',
})
export class AddNewReferenceDialogComponent {
  today: string;

  constructor(
    public dialogRef: MatDialogRef<AddNewReferenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataReference,
    private dateManagerService: DateManagerService) {
    this.today = this.dateManagerService.transform(new Date());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


@Component({
  selector: 'app-add-new-recipe-dialog',
  templateUrl: 'add-new-recipe-dialog.html',
})
export class AddNewRecipeDialogComponent {
  today: string;
  showNewRecipePositionForm = false;
  newRecipePosition: RecipePositionModel = {};

  constructor(
    public dialogRef: MatDialogRef<AddNewRecipeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogDataRecipe,
    private dateManagerService: DateManagerService,
    private clonerService: ClonerService,
    private toastrService: ToastrService) {
    this.today = this.dateManagerService.transform(new Date());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  addNewRecipePositionForm() {
    this.showNewRecipePositionForm = !this.showNewRecipePositionForm;
    this.newRecipePosition = {};
  }

  addNewRecipePosition() {
    if (this.newRecipePosition.description != null) {
      this.data.recipe.positions.push(this.clonerService.deepClone(this.newRecipePosition));
      this.newRecipePosition = {};
      this.toastrService.success('Poprawnie dodano pozycję recepty', 'SUKCES');
      this.addNewRecipePositionForm();
    } else {
      this.toastrService.error('Nie wypełniono wszystkich wymaganych pól', 'BŁĄD');
    }
  }

}
