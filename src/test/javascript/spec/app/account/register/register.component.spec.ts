
import {throwError as observableThrowError, of as observableOf} from 'rxjs';
import { ComponentFixture, TestBed, async, inject, tick, fakeAsync } from '@angular/core/testing';
import { ElementRef } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { ManagementPortalTestModule } from '../../../test.module';
import { LoginModalService } from '../../../../../../main/webapp/app/shared';
import { Register } from '../../../../../../main/webapp/app/account/register/register.service';
import { RegisterComponent } from '../../../../../../main/webapp/app/account/register/register.component';

describe('Component Tests', () => {
    describe('RegisterComponent', () => {
        let fixture: ComponentFixture<RegisterComponent>;
        let comp: RegisterComponent;
        const loginRef: ElementRef = {
            nativeElement: jasmine.createSpyObj('Element', ['focus'])
        };

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ManagementPortalTestModule],
                declarations: [RegisterComponent],
                providers: [
                    Register,
                    {
                        provide: LoginModalService,
                        useValue: null
                    },
                    {
                        provide: ElementRef,
                        useValue: null
                    }
                ]
            }).overrideTemplate(RegisterComponent, '').compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RegisterComponent);
            comp = fixture.componentInstance;
            comp.loginRef = loginRef;
            comp.ngOnInit();
        });

        it('should ensure the two passwords entered match', function() {
            comp.registerAccount.password = 'password';
            comp.confirmPassword = 'non-matching';

            comp.register();

            expect(comp.doNotMatch).toEqual('ERROR');
        });

        it('should update success to OK after creating an account',
            inject([Register, JhiLanguageService],
                fakeAsync((service: Register, mockTranslate: MockLanguageService) => {
                    spyOn(service, 'save').and.returnValue(observableOf({}));
                    comp.registerAccount.password = comp.confirmPassword = 'password';

                    comp.register();
                    tick();

                    expect(service.save).toHaveBeenCalledWith({
                        password: 'password',
                        langKey: 'en'
                    });
                    expect(comp.success).toEqual(true);
                    expect(comp.registerAccount.langKey).toEqual('en');
                    expect(mockTranslate.getCurrentSpy).toHaveBeenCalled();
                    expect(comp.errorUserExists).toBeNull();
                    expect(comp.errorEmailExists).toBeNull();
                    expect(comp.error).toBeNull();
                })
            )
        );

        it('should notify of user existence upon 400/login already in use',
            inject([Register, JhiLanguageService],
                fakeAsync((service: Register) => {
                    spyOn(service, 'save').and.returnValue(observableThrowError({
                        status: 400,
                        _body: 'login already in use'
                    }));
                    comp.registerAccount.password = comp.confirmPassword = 'password';

                    comp.register();
                    tick();

                    expect(comp.errorUserExists).toEqual('ERROR');
                    expect(comp.errorEmailExists).toBeNull();
                    expect(comp.error).toBeNull();
                })
            )
        );

        it('should notify of email existence upon 400/email address already in use',
            inject([Register, JhiLanguageService],
                fakeAsync((service: Register) => {
                    spyOn(service, 'save').and.returnValue(observableThrowError({
                        status: 400,
                        _body: 'email address already in use'
                    }));
                    comp.registerAccount.password = comp.confirmPassword = 'password';

                    comp.register();
                    tick();

                    expect(comp.errorEmailExists).toEqual('ERROR');
                    expect(comp.errorUserExists).toBeNull();
                    expect(comp.error).toBeNull();
                })
            )
        );

        it('should notify of generic error',
            inject([Register, JhiLanguageService],
                fakeAsync((service: Register) => {
                    spyOn(service, 'save').and.returnValue(observableThrowError({
                        status: 503
                    }));
                    comp.registerAccount.password = comp.confirmPassword = 'password';

                    comp.register();
                    tick();

                    expect(comp.errorUserExists).toBeNull();
                    expect(comp.errorEmailExists).toBeNull();
                    expect(comp.error).toEqual('ERROR');
                })
            )
        );
    });
});
