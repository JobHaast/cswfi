import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TopRatedCardComponent } from '../pages/dashboard/top-rated-card/top-rated-card.component';
import { PersonCardComponent } from '../pages/people/people-list/person-card/person-card.component';

@NgModule({
  declarations: [TopRatedCardComponent, PersonCardComponent],
  imports: [RouterModule, FontAwesomeModule],
  exports: [TopRatedCardComponent, PersonCardComponent],
})
export class SharedModule {}
