import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentComponent } from './recent/recent.component';
import { SingleResumeComponent } from './single-resume/single-resume.component';
import { ResumeResolverService } from './resume-resolver.service';
import { ResumeService } from './resume.service';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [RecentComponent, SingleResumeComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [ResumeResolverService, ResumeService],
  exports: [RecentComponent, SingleResumeComponent]
})
export class ResumeModule { }
