import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbAuthModule, NbDummyAuthProvider } from '@nebular/auth';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { DataModule } from './data/data.module';
import { CONFIG } from '../../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { AnalyticsService } from './utils/analytics.service';
import { AuthGuard } from './../guards/auth.guard';
import { AuthService } from './auth.service';
import { FirestoreService } from './../services/firestore.service';
import { EmitterService } from './../services/emitter.service';
import { InstantSearchService } from './../services/search.service';
import { RoleService } from './../services/role.service';
import { SessionModule } from './../session/session.module';
import { TagInputModule } from 'ngx-chips';
export const firebaseConfig: FirebaseAppConfig = CONFIG.firebaseConfig;



const NB_CORE_PROVIDERS = [
  ...DataModule.forRoot().providers,
  AnalyticsService,
];

@NgModule({
  imports: [
    // firebase
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    CommonModule,    
    TagInputModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), // ToastrModule added
  ],
  exports: [SessionModule],
  providers: [AuthService, AuthGuard, EmitterService, FirestoreService,RoleService, InstantSearchService]  
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
