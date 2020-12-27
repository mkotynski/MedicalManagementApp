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

@Component({
  selector: 'app-visit-form',
  templateUrl: './visit-form.component.html',
  styleUrls: ['./visit-form.component.css']
})
export class VisitFormComponent implements OnInit {
  visit: MedicalVisitModel = {doctor: {}, patient: {}, visitType: {}};
  visitId: number;
  visitStatuses = VisitStatusPolish;
  enumKeys = [];
  date = 'date';
  recipes: RecipeModel[] = [];
  showNewRecipeForm = false;
  newRecipe: RecipeModel = {
    expirationDate: new Date((new Date()).setDate((new Date()).getDate() + 30)),
    recipePositionSet: []
  }; // always plus 30 days at start
  newRecipePosition: RecipePositionModel = {};
  showNewRecipePositionForm = false;
  references: ReferenceModel[] = [];
  showNewReferenceForm = false;
  newReference: ReferenceModel = {expirationDate: new Date((new Date()).setDate((new Date()).getDate() + 30))};
  // receipt
  newReceipt: ReceiptModel = {
    expirationDate: new Date((new Date()).setDate((new Date()).getDate() + 30)),
    receiptPositionSet: []
  };
  newReceiptPosition: ReceiptPositionModel = {};

  constructor(private toastrService: ToastrService,
              private route: ActivatedRoute,
              private medicalVisitService: MedicalVisitService,
              private clonerService: ClonerService,
              public dialog: MatDialog,
              private dateManagerService: DateManagerService) {
    this.enumKeys = Object.keys(VisitStatus).filter(f => !isNaN(Number(f)));
  }

  ngOnInit(): void {
    this.visitId = +this.route.snapshot.paramMap.get('id');
    this.getMedicalVisit();
    console.log(this.newRecipe);
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

  addNewRecipe() {
    if (this.newRecipe.recipePositionSet.length > 0) {
      this.recipes.push(this.clonerService.deepClone(this.newRecipe));
      this.addNewRecipeForm();
      this.newRecipe = {
        expirationDate: new Date((new Date()).setDate((new Date()).getDate() + 30)),
        recipePositionSet: []
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

  addNewRecipePositionForm() {
    this.showNewRecipePositionForm = !this.showNewRecipePositionForm;
    this.newRecipePosition = {};
  }

  addNewRecipePosition() {
    if (this.newRecipePosition.description != null) {
      this.newRecipe.recipePositionSet.push(this.clonerService.deepClone(this.newRecipePosition));
      this.newRecipePosition = {};
      this.toastrService.success('Poprawnie dodano pozycję recepty', 'SUKCES');
      this.addNewRecipePositionForm();
    } else {
      this.toastrService.error('Nie wypełniono wszystkich wymaganych pól', 'BŁĄD');
    }
  }

  cancelNewRecipe() {
    this.newRecipe = {};
    this.newRecipe = {
      expirationDate: new Date((new Date()).setDate((new Date()).getDate() + 30)),
      recipePositionSet: []
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
      this.newReceiptPosition = result;
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
}

export interface DialogData {
  receiptPosition: ReceiptPositionModel;
}

export interface DialogDataReference {
  reference: ReferenceModel;
}

@Component({
  selector: 'app-add-new-position-receipt-dialog',
  templateUrl: 'add-new-position-receipt-dialog.html',
})
export class AddNewPositionReceiptDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddNewPositionReceiptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

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
