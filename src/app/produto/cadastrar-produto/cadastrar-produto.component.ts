import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {v4 as uuidv4} from 'uuid';
import { Observable, fromEvent, merge } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { DisplayMessage, GenericValidator, ValidationMessages } from 'src/app/utils/generic-form-validation';
import { Produto } from 'src/app/produto/models/produtos.model';
import { ProdutoService } from 'src/app/services/produtos.service';
import {ProdutoBaseComponent} from '../produto-form.base.component';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html'
})
export class CadastrarProdutoComponent extends ProdutoBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, {read: ElementRef }) formInputElements: ElementRef[];

  cadastroForm: FormGroup;
  formResult: string = '';

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private toastr: ToastrService, 
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) { super() }

  ngOnInit(){
    this.validaFormulario();
  }

  ngAfterViewInit(): void {
  let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    })
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.produto.imagemBase64 = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  getImagemUrl(imagem: File): string {
    const imagemBlob = new Blob([imagem]);
    return URL.createObjectURL(imagemBlob);
  }


  validaFormulario(){
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      valor: ['', Validators.required],
      estoque: ['', Validators.required],
      imagem: ['', Validators.required]
    });
  }

  adicionarProduto(){
    if(this.cadastroForm.dirty && this.cadastroForm.valid){
      this.produto = Object.assign({}, this.produto, this.cadastroForm.value);
      this.produto.id =  uuidv4();
      this.produtoService.adicionarProduto(this.produto);



      // this.formResult = JSON.stringify(this.cadastroForm.value);

      // this.produtoService.novoProduto(this.produto)
      //   .subscribe({
      //     next: (sucesso: any) => { this.processarSucesso(sucesso) },
      //     error: (falha: any) => { this.processarFalha(falha) }
      //   });

    }
    else {
    this.formResult = "Não submeteu!!!"
    }
  }

 processarSucesso(response: any) {
    this.cadastroForm.reset();

    let toast = this.toastr.success('Produto cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      this.cadastroForm.reset();
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/lista-produtos']);
      });
    }
  }

  processarFalha(fail: any) {
   
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

 
}
