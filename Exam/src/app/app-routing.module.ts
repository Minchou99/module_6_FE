import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {VeXeComponent} from "./quan-li/ve-xe/ve-xe.component";
import {ThemComponent} from "./quan-li/them/them.component";
import {SuaComponent} from "./quan-li/sua/sua.component";


const routes: Routes = [
  {path: '', component: VeXeComponent},
  {path: 'them', component: ThemComponent},
  {path: 've/:id', component: SuaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
