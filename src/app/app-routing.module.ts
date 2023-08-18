import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmotionalStatusComponent } from './components/emotional-status/emotional-status.component';
import { TextToEmotionComponent } from './components/text-to-emotion/text-to-emotion.component';

import { CurrentRouteGuard } from './core/guards/current-route.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        component: TextToEmotionComponent,
    },
    {
        path: 'emotional-status',
        component: EmotionalStatusComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
