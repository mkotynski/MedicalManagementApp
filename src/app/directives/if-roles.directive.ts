import { Input, OnInit, Directive, ViewContainerRef, TemplateRef, OnDestroy } from "@angular/core";
import { Subject, Subscription } from "rxjs";
import { takeUntil } from "rxjs/operators";
import {RolesService} from '../services/auth/roles.service';


@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[ifRoles]'
})
export class IfRolesDirective implements OnInit, OnDestroy {
  private subscription: Subscription[] = [];
  // the role the user must have
  @Input() public ifRoles: Array<string>;

  /**
   * @param {ViewContainerRef} viewContainerRef
   * 	-- the location where we need to render the templateRef
   * @param {TemplateRef<any>} templateRef
   *   -- the templateRef to be potentially rendered
   * @param {RolesService} rolesService
   *   -- will give us access to the roles a user has
   */
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private rolesService: RolesService
  ) {}

  public ngOnInit() {
        console.log(this.rolesService.roles());
        const roles = this.rolesService.roles();
        if (!roles) {
          this.viewContainerRef.clear();
        }
        const idx = roles.findIndex((element) => this.ifRoles.indexOf(element) !== -1);
        if (idx < 0) {
          this.viewContainerRef.clear();
        } else {
          this.viewContainerRef.createEmbeddedView(this.templateRef);
        }

  }

  public ngOnDestroy(): void {
    this.subscription.forEach((subscription: Subscription) => subscription.unsubscribe());
  }
}
