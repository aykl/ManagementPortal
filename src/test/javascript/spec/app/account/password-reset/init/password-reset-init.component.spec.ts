
import {throwError as observableThrowError, of as observableOf} from 'rxjs';
import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { ManagementPortalTestModule } from '../../../../test.module';
import { PasswordResetInitComponent } from '../../../../../../../main/webapp/app/account/password-reset/init/password-reset-init.component';
import { PasswordResetInit } from '../../../../../../../main/webapp/app/account/password-reset/init/password-reset-init.service';

describe('Component Tests', () => {

    describe('PasswordResetInitComponent', function() {
        let fixture: ComponentFixture<PasswordResetInitComponent>;
        let comp: PasswordResetInitComponent;
        const emailRef: ElementRef = {
            nativeElement: jasmine.createSpyObj('Element', ['focus'])
        };

        beforeEach(() => {
            fixture = TestBed.configureTestingModule({
                imports: [ManagementPortalTestModule],
                declarations: [PasswordResetInitComponent],
                providers: [
                    PasswordResetInit,
                    {
                        provide: ElementRef,
                        useValue: new ElementRef(null)
                    }
                ]
            }).overrideTemplate(PasswordResetInitComponent, '').createComponent(PasswordResetInitComponent);
            comp = fixture.componentInstance;
            comp.emailRef = emailRef;
            comp.ngOnInit();
        });

        it('should define its initial state', function() {
            expect(comp.success).toBeUndefined();
            expect(comp.error).toBeUndefined();
            expect(comp.errorEmailNotExists).toBeUndefined();
            expect(comp.resetAccount).toEqual({});
        });

        it('sets focus after the view has been initialized',
            inject([], () => {
                const localEmailRef: ElementRef = {
                    nativeElement: jasmine.createSpyObj('Element', ['focus'])
                };
                comp.emailRef = localEmailRef;

                comp.ngAfterViewInit();

                expect(localEmailRef.nativeElement.focus).toHaveBeenCalled();
            })
        );

        it('notifies of success upon successful requestReset',
            inject([PasswordResetInit], (service: PasswordResetInit) => {
                spyOn(service, 'save').and.returnValue(observableOf({}));
                comp.resetAccount.email = 'user@domain.com';

                comp.requestReset();

                expect(service.save).toHaveBeenCalledWith('user@domain.com');
                expect(comp.success).toEqual('OK');
                expect(comp.error).toBeNull();
                expect(comp.errorEmailNotExists).toBeNull();
            })
        );

        it('notifies of unknown email upon email address not registered/400',
            inject([PasswordResetInit], (service: PasswordResetInit) => {
                spyOn(service, 'save').and.returnValue(observableThrowError({
                    status: 400,
                    data: 'email address not registered'
                }));
                comp.resetAccount.email = 'user@domain.com';

                comp.requestReset();

                expect(service.save).toHaveBeenCalledWith('user@domain.com');
                expect(comp.success).toBeNull();
                expect(comp.error).toBeNull();
                expect(comp.errorEmailNotExists).toEqual('ERROR');
            })
        );

        it('notifies of error upon error response',
            inject([PasswordResetInit], (service: PasswordResetInit) => {
                spyOn(service, 'save').and.returnValue(observableThrowError({
                    status: 503,
                    data: 'something else'
                }));
                comp.resetAccount.email = 'user@domain.com';

                comp.requestReset();

                expect(service.save).toHaveBeenCalledWith('user@domain.com');
                expect(comp.success).toBeNull();
                expect(comp.errorEmailNotExists).toBeNull();
                expect(comp.error).toEqual('ERROR');
            })
        );

    });
});
