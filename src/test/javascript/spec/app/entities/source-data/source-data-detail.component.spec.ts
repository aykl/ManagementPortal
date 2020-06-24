
import {of as observableOf } from 'rxjs';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { JhiDateUtils, JhiDataUtils, JhiEventManager } from 'ng-jhipster';
import { ManagementPortalTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { SourceDataDetailComponent } from '../../../../../../main/webapp/app/entities/source-data/source-data-detail.component';
import { SourceDataService } from '../../../../../../main/webapp/app/entities/source-data/source-data.service';
import { SourceData } from '../../../../../../main/webapp/app/entities/source-data/source-data.model';

describe('Component Tests', () => {

    describe('SourceData Management Detail Component', () => {
        let comp: SourceDataDetailComponent;
        let fixture: ComponentFixture<SourceDataDetailComponent>;
        let service: SourceDataService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [ManagementPortalTestModule],
                declarations: [SourceDataDetailComponent],
                providers: [
                    JhiDateUtils,
                    JhiDataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({sourceDataName: 'testSourceData'})
                    },
                    SourceDataService,
                    JhiEventManager
                ]
            }).overrideTemplate(SourceDataDetailComponent, '').compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SourceDataDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SourceDataService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(observableOf(new SourceData(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith('testSourceData');
            expect(comp.sourceData).toEqual(jasmine.objectContaining({id: 10}));
            });
        });
    });

});
