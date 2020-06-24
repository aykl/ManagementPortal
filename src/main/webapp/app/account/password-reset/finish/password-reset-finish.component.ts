import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalService } from '../../../shared';

import { PasswordResetFinish } from './password-reset-finish.service';

@Component({
    selector: 'jhi-password-reset-finish',
    templateUrl: './password-reset-finish.component.html',
})
export class PasswordResetFinishComponent implements OnInit, AfterViewInit {
    confirmPassword: string;
    doNotMatch: string;
    error: string;
    keyMissing: boolean;
    resetAccount: any;
    success: string;
    modalRef: NgbModalRef;
    key: string;
    @ViewChild('passwordRef', {read: ElementRef}) passwordRef: ElementRef;

    constructor(
            private passwordResetFinish: PasswordResetFinish,
            private loginModalService: LoginModalService,
            private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.route.queryParams.subscribe((params) => {
            this.key = params['key'];
        });
        this.resetAccount = {};
        this.keyMissing = !this.key;
    }

    ngAfterViewInit() {
        this.passwordRef.nativeElement.focus();
    }

    finishReset() {
        this.doNotMatch = null;
        this.error = null;
        if (this.resetAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.passwordResetFinish.save({
                key: this.key,
                newPassword: this.resetAccount.password,
            }).subscribe(() => {
                this.success = 'OK';
            }, () => {
                this.success = null;
                this.error = 'ERROR';
            });
        }
    }

    login() {
        this.modalRef = this.loginModalService.open();
    }
}
