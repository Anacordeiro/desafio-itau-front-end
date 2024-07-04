import { EditarProdutoComponent } from './editar-produto.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

describe('EditarProdutoComponent', () => {
  let component: EditarProdutoComponent;
  let formBuilder: FormBuilder;
  let route: ActivatedRoute;
  let router: Router;
  let toastrService: ToastrService;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    route = { params: of({ id: '1' }) } as any;
    router = {} as any;
    toastrService = {} as any;

    component = new EditarProdutoComponent(route, {} as any, formBuilder, router, toastrService);
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });


});
