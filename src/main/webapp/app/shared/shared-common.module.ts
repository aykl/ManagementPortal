import { NgModule, Sanitizer } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { JhiAlertService, JhiConfigService } from 'ng-jhipster';
import {
    FindLanguageFromKeyPipe,
    JhiAlertComponent,
    JhiAlertErrorComponent,
    JhiLanguageHelper,
    ManagementPortalSharedLibsModule,
} from './';
import { TranslateService } from '@ngx-translate/core';

export function alertServiceProvider(
        sanitizer: Sanitizer,
        configService: JhiConfigService,
        translateService: TranslateService) {
    // set below to true to make alerts look like toast
    return new JhiAlertService(sanitizer, configService, translateService);
}

@NgModule({
    imports: [
        ManagementPortalSharedLibsModule,
    ],
    declarations: [
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent,
    ],
    providers: [
        JhiLanguageHelper,
        {
            provide: JhiAlertService,
            useFactory: alertServiceProvider,
            deps: [Sanitizer, JhiConfigService, TranslateService],
        },
        Title,
    ],
    exports: [
        ManagementPortalSharedLibsModule,
        FindLanguageFromKeyPipe,
        JhiAlertComponent,
        JhiAlertErrorComponent,
    ],
})
export class ManagementPortalSharedCommonModule {
}
