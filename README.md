```markdown
# DesafioItauFrontEnd

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 16.1.0.

## Servidor de Desenvolvimento

Para executar um servidor de desenvolvimento, utilize o comando `ng serve`. Acesse `http://localhost:4200/` no navegador. O aplicativo será recarregado automaticamente sempre que você modificar qualquer arquivo de origem.

## Estrutura de Código

Use `ng generate component <nome-do-componente>` para gerar um novo componente. Você também pode utilizar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Compilação

Execute `ng build` para compilar o projeto. Os artefatos de compilação serão armazenados no diretório `dist/`.

## Executando Testes de Unidade

Para executar os testes de unidade, utilize `ng test` com o [Karma](https://karma-runner.github.io).

## Executando Testes de Ponta a Ponta

Execute `ng e2e` para executar os testes de ponta a ponta em uma plataforma de sua escolha.

## Ajuda Adicional

Para mais informações sobre o Angular CLI, utilize `ng help` ou consulte a [página de visão geral e referência de comandos do Angular CLI](https://angular.io/cli).

## Configuração do Ambiente Local

### Docker

**Instalação do Docker:**
- Instale o Docker através do link: [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)

### LocalStack

**Instalação do LocalStack:**
- Utilizando Homebrew:
    - `brew install localstack`
- Utilizando PIP:
    - `python3 -m pip install --upgrade localstack`
- Linux:
    - `curl -Lo localstack-cli-3.5.0-linux-amd64-onefile.tar.gz https://github.com/localstack/localstack-cli/releases/download/v3.5.0/localstack-cli-3.5.0-linux-amd64-onefile.tar.gz`

**Executando LocalStack:**
- `localstack start -d` (o comando `-d` executa em segundo plano)

### AWS CLI Local

**Instalação do AWS:**
- (MAC) `brew install awscli`
- (Linux) 
    - `curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"`
    - `unzip awscliv2.zip`
    - `sudo ./aws/install`

**Configuração Local:**
- Execute `aws configure`
- Edite o arquivo `config` em `.aws` e adicione:
    ```
    [profile localstack]
    endpoint_url=http://localhost:4566
    output = json
    region = sa-east-1
    ```
- Crie um arquivo `credentials` e adicione:
    ```
    [localstack]
    aws_access_key_id=desafioitau
    aws_secret_access_key=desafioitau
    ```

### Configuração do Container Dynamo no LocalStack

Execute um container Docker com DynamoDB, CloudWatch e S3 configurados usando o comando fornecido.

## Criação de Tabelas no DynamoDB

Execute os seguintes comandos para criar a tabela `tb_produtos` no DynamoDB:

```bash
aws dynamodb create-table \
            --table-name tb_produtos \
            --region sa-east-1 \
            --attribute-definitions \
                AttributeName=id,AttributeType=S \
            --key-schema \
                AttributeName=id,KeyType=HASH \
            --provisioned-throughput \
                ReadCapacityUnits=5,WriteCapacityUnits=5 \
            --table-class STANDARD --profile localstack
```

## Configuração CloudWatch

```bash
# Criar log group
aws logs create-log-group --log-group-name log-desafio-itau --profile localstack

# Criar stream
aws logs create-log-stream --log-group-name log-desafio-itau --log-stream-name stream-desafio-itau --profile localstack
```

Para criar um log group e logs no CloudWatch, você pode utilizar os comandos `aws logs create-log-group`, `aws logs create-log-stream` e `aws logs put-log-events`.

Lembre-se de validar no LocalStack se a tabela foi criada corretamente na região sa-east-1.