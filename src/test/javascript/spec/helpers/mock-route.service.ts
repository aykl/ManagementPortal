
import {of as observableOf,  Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

export class MockActivatedRoute extends ActivatedRoute {

    constructor(parameters?: any) {
        super();
        this.queryParams = observableOf(parameters);
        this.params = observableOf(parameters);
    }
}

export class MockRouter {
    navigate = jasmine.createSpy('navigate');
}
