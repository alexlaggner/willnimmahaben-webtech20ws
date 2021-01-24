import { Routes } from '@angular/router';
import { DiscoverComponent } from './discover/discover.component';
import {UserComponent} from './user/user.component';
import { NewProductComponent } from './new-product/new-product.component';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { DeleteProductComponent } from './delete-product/delete-product.component';
import { UpdateProductComponent } from './update-product/update-product.component';

export const ROUTES: Routes = [
  {path: 'discover', component: DiscoverComponent, },
  {path: 'user', component:UserComponent},
  {path: 'productDetail/:id', component: ProductDetailComponent},
  {path: 'newProduct', component: NewProductComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'newUser', component: NewUserComponent},
  {path: 'deleteProduct/:id' , component: DeleteProductComponent},
  {path: 'updateProduct/:id' , component: UpdateProductComponent},
  {path: '', component:LoginComponent}
  
];
