import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControlName, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { Observable, fromEvent, merge } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

import { ProdutoBaseComponent } from '../produto-form.base.component';
import { ProdutoService } from '../../services/produtos.service';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html'
})
export class CadastrarProdutoComponent extends ProdutoBaseComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[];

  cadastroForm: FormGroup; 
  formResult: string = ''; 

  constructor(
    private fb: FormBuilder,
    private produtoService: ProdutoService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) {
    super(); 
  }

  ngOnInit() {
    this.validaFormulario();
  }


  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
      .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
    })
  }

  // Método para processar e exibir a imagem selecionada
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

  // Retorna a URL da imagem usando um objeto Blob
  getImagemUrl(imagem: File): string {
    const imagemBlob = new Blob([imagem]);
    return URL.createObjectURL(imagemBlob);
  }

  // Valida o formulário de cadastro
  validaFormulario() {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      valor: ['', Validators.required],
      estoque: ['', Validators.required],
      imagem: ['', Validators.required]
    });
  }

  // Adiciona um novo produto
  adicionarProduto() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      this.produto = Object.assign({}, this.produto, this.cadastroForm.value);
      this.produto.id = uuidv4(); // Gera um ID único
      this.produtoService.adicionarProduto(this.produto);
      this.processarSucesso(); // Processa o sucesso ao adicionar o produto
    } else {
      this.formResult = "Não submeteu!!!";
    }
  }

  // Processa e exibe a mensagem de sucesso
  processarSucesso() {
    this.cadastroForm.reset();

    let toast = this.toastr.success('Produto cadastrado com sucesso!', 'Sucesso!');
    if (toast) {
      this.cadastroForm.reset();
      toast.onHidden.subscribe(() => {
        this.router.navigate(['/produtos/lista-produtos']);
      });
    }
  }

  // Processa e exibe a mensagem de falha
  processarFalha(fail: any) {
    this.toastr.error('Ocorreu um erro!', 'Opa :(');
  }

  // Retorna para a página anterior
  goBack() {
    window.history.back();
  }
}
