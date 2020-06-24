
import {of as observableOf} from 'rxjs';
import { ComponentFixture, TestBed, async} from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ManagementPortalTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { ProjectDetailComponent } from '../../../../../../main/webapp/app/entities/project/project-detail.component';
import { Project, ProjectService } from '../../../../../../main/webapp/app/shared/project';

describe('Component Tests', () => {

    describe('Project Management Detail Component', () => {
        let comp: ProjectDetailComponent;
        let fixture: ComponentFixture<ProjectDetailComponent>;
        let service: ProjectService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ManagementPortalTestModule],
                declarations: [ProjectDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({projectName: 'testProject'})
                    },
                    ProjectService,
                    JhiEventManager
                ]
            }).overrideTemplate(ProjectDetailComponent, '').compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ProjectDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ProjectService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(observableOf(new Project(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith('testProject');
            expect(comp.project).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
