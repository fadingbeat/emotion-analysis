import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
