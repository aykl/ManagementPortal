import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { Subscription } from 'rxjs';
import { Role } from '../../admin/user-management/role.model';

import { RoleService } from './role.service';

@Component({
    selector: 'jhi-role-detail',
    templateUrl: './role-detail.component.html',
})
export class RoleDetailComponent implements OnInit, OnDestroy {

    role: Role;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
            private eventManager: JhiEventManager,
            private roleService: RoleService,
            private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['projectName'], params['authorityName']);
        });
        this.registerChangeInRole();
    }

    load(projectName: string, authorityName: string) {
        this.roleService.find(projectName, authorityName).subscribe((role) => {
            this.role = role;
        });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRole() {
        this.eventSubscriber = this.eventManager.subscribe('roleListModification', (response) => this.load(this.role.projectName, this.role.authorityName));
    }
}
