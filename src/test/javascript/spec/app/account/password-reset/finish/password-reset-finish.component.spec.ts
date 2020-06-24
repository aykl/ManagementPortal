import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoginModalService } from '../../../../../../../main/webapp/app/shared';
import { ManagementPortalTestModule } from '../../../../test.module';
import { PasswordResetFinishComponent } from '../../../../../../../main/webapp/app/account/password-reset/finish/password-reset-finish.component';
import { PasswordResetFinish } from '../../../../../../../main/webapp/app/account/password-reset/finish/password-reset-finish.service';
import { MockActivatedRoute } from '../../../../helpers/mock-route.service';

describe('Component Tests', () => {

    describe('PasswordResetFinishComponent', () => {

        let fixture: ComponentFixture<PasswordResetFinishComponent>;
        let comp: PasswordResetFinishComponent;
        const passwordRef: ElementRef = {
            nativeElement: jasmine.createSpyObj('Element', ['focus'])
        };

        beforeEach(() => {
            fixture = TestBed.configureTestingModule({
                imports: [ManagementPortalTestModule],
                declarations: [PasswordResetFinishComponent],
                providers: [
                    PasswordResetFinish,
                    {
                        provide: LoginModalService,
                        useValue: null
                    },
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({'key': 'XYZPDQ'})
                    },
                    {
                        provide: ElementRef,
                        useValue: new ElementRef(null)
                    }
                ]
            }).overrideTemplate(PasswordResetFinishComponent, 'overrideTemplate')
                    .createComponent(PasswordResetFinishComponent);
            comp = fixture.componentInstance;
            comp.passwordRef = passwordRef;
        });

        it('should define its initial state', function() {
            comp.ngOnInit();

            expect(comp.keyMissing).toBeFalsy();
            expect(comp.key).toEqual('XYZPDQ');
            expect(comp.resetAccount).toEqual({});
        });

        it('sets focus after the view has been initialized',
            inject([ElementRef], (elementRef: ElementRef) => {
                const localPasswordRef = {
                    nativeElement: jasmine.createSpyObj('Element', ['focus'])
                };
                comp.passwordRef = localPasswordRef;

                comp.ngAfterViewInit();

                expect(localPasswordRef.nativeElement.focus).toHaveBeenCalled();
            })
        );

    });
});
