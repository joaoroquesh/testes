
  $( document ).ready(function() {
    var options = {
      onKeyPress: function (cpf, ev, el, op) {
          var masks = ['000.000.000-000', '00.000.000/0000-00'];
          $('.cpfOuCnpj').mask((cpf.length > 14) ? masks[1] : masks[0], op);
      }
    }

    $('.cpfOuCnpj').length > 11 ? $('.cpfOuCnpj').mask('00.000.000/0000-00', options) : $('.cpfOuCnpj').mask('000.000.000-00#', options);
     var element = document.getElementById("alerta");
     element.classList.add("show");
  }); 
  
  
    var cpf_cnpj;
    var cod_produto;
    var prod_participante;
    var dado_sorteio;
    var status_sorteio; 
    var nome_participante; 
    var cpf_cnpj_participante; 
    var classe_ganhador; 
    
    
    function validar() {
        $('.msg_retorno').html('');
        $('#search').addClass('sem_registro');

        cpf_cnpj =  $('#text_cnpj').val();
        var valida = valida_cpf_cnpj(cpf_cnpj);

        if (valida) {
              $('.erro').html('');
              cpf_cnpj = cpf_cnpj.toString();
              cpf_cnpj_participante = cpf_cnpj;
              cpf_cnpj = cpf_cnpj.replace(/[^0-9]/g, '');
              $('#search').addClass('sem_registro');
              getCupons(1);
           }
            
      else {
            $('.erro').html('CPF/CNPJ Inválido');
        }
    }

    function verifica_cpf_cnpj(valor) {
        valor = valor.toString();
        valor = valor.replace(/[^0-9]/g, '');

        if (valor.length === 11) {
            return 'CPF';
        }
        else if (valor.length === 14) {
            return 'CNPJ';
        }
        else {
          return false;
        }
    } 
    function calc_digitos_posicoes(digitos, posicoes = 10, soma_digitos = 0) {
        digitos = digitos.toString();
        for (var i = 0; i < digitos.length; i++) {
            soma_digitos = soma_digitos + (digitos[i] * posicoes);
            posicoes--;
            if (posicoes < 2) {
                posicoes = 9;
            }
        }
        soma_digitos = soma_digitos % 11;
        if (soma_digitos < 2) {
            soma_digitos = 0;
        } else {
            soma_digitos = 11 - soma_digitos;
        }
        var cpf = digitos + soma_digitos;
        return cpf;

    } 
    function valida_cpf(valor) {
        valor = valor.toString();
        valor = valor.replace(/[^0-9]/g, '');
        var digitos = valor.substr(0, 9);
        var novo_cpf = calc_digitos_posicoes(digitos);
        var novo_cpf = calc_digitos_posicoes(novo_cpf, 11);

        if (novo_cpf === valor) {
            return true;
        } else {
            return false;
        }
    } 
    function valida_cnpj(valor) {
        valor = valor.toString();
        valor = valor.replace(/[^0-9]/g, '');

        var cnpj_original = valor;
        var primeiros_numeros_cnpj = valor.substr(0, 12);

        var primeiro_calculo = calc_digitos_posicoes(primeiros_numeros_cnpj, 5);
        var segundo_calculo = calc_digitos_posicoes(primeiro_calculo, 6);
        var cnpj = segundo_calculo;

        if (cnpj === cnpj_original) {
            return true;
        }
        return false;

    } 

    function valida_cpf_cnpj(valor) {
        var valida = verifica_cpf_cnpj(valor);
        valor = valor.toString();
        valor = valor.replace(/[^0-9]/g, '');

        if (valida === 'CPF') {
            return valida_cpf(valor);
        }

        else if (valida === 'CNPJ') {
            return valida_cnpj(valor);
        }
        else {
            return false;
        }
    } 

     function nome_produto(valor){

        if (valor == 156380 ){
            prod_participante = 'Poupança';

        }if (valor == 256380){
             prod_participante = 'RDC';
        }
        if (valor == 356380){
             prod_participante = 'LCA';
        }
        if (valor == 456380){
             prod_participante = 'LCI';
        }
        if (valor == 556380){
             prod_participante = 'Conta Capital';
        }
    
     } 

     function nome_sorteio(valor){
        if(valor >= 100){
            dado_sorteio = '2° Sorteio'
        } else {
            dado_sorteio = '1° Sorteio'
        }

     }

      function nome_status(valor){
        if (valor == true){
            status_sorteio = 'Parabéns! </br>  Número da Sorte premiado!';
            classe_ganhador = 'bg-success';

        } else {
             status_sorteio = 'Sorteio realizado. </br> Número não sorteado.';
             classe_ganhador = '';
      }
    }
  
  function getCupons(currentPage){
        var quantidade = '0';
        var cod_produto = '63699';
       

        var currentPage = currentPage ?currentPage:1;
        

            var urlPesquisa = "https://www.sicoob.com.br/web/sicoob/"+"poupanca-premiada?p_p_id=promocaopoupanca_WAR_portalsicoobinternetsp&p_p_lifecycle=2&p_p_state=normal&p_p_mode=view&p_p_resource_id=pesquisaPromocaoProduto&p_p_cacheability=cacheLevelPage";
            const bodyData = {
                "filtro": JSON.stringify({
                    "cpf_cnpj": cpf_cnpj,
                     "tipo": cod_produto
                }),
                "paginaAtual":currentPage,
                "itemsPorPagina": 10
            }
        
        $.post(urlPesquisa,bodyData,function(res){
              let line = "";
              
              var data = JSON.parse(res);
              if(data.sucesso){
                     data.objeto.listaResultado.forEach(function (item) {

                        nome_produto(item.tipo);
                        nome_sorteio(item.serie);
                        nome_status(item.status);

                        nome_participante = item.nomeCliente;
                        line += '<tr><td>'+ item.serie + '.' + item.numero + '</td><td>' + item.numCentral + '</td><td> ' + item.numCooperativa + '</td></tr>';
                           
                    });
                     
                    buildPaging(
                        currentPage,
                        data.objeto.total,
                        bodyData.itemsPorPagina,
                        'getCupons',
                        '#paginacao',
                        false);
                   quantidade = data.objeto.total; 
                   $('#search').removeClass('sem_registro');
                   

                  
              } else {
                 $('#search').addClass('sem_registro');
                 var sem_registro = '<p class="msg_retorno" style="text-align: center;">' + data.mensagem + '</p>';   
             }
              $('.numero').html(quantidade);
              $('.nomeCliente').html(nome_participante);
              $('.participante_cpf_cnpj').html(cpf_cnpj_participante);
              $('.list-results-content').html(line);
              $('.no-list-result').html(sem_registro);

          });
    
  }
function buildPaging(currentPage,total,itemPerPage,nameFunction,targetElement,showPages){
        var htmlPaging="";
        var tempTotPaginas = total/itemPerPage;
        var totalPaginas = ((tempTotPaginas)%1>0) ? (((tempTotPaginas)^0)+1) : ((tempTotPaginas)^0);
        if(total>0){
              htmlPaging+='<li class="'+(currentPage==1?"active":"")+'" ><a class="anterior btn-click" href="javascript:'+(currentPage>1?nameFunction+"("+(currentPage-1)+")":"void(0)")+'" ><i class="icon-backward"></i> Anterior </a></li>';
              if(showPages){
                    for (var i = 1; i < totalPaginas+1; i++) {
                          htmlPaging+= '<li class="'+(i==currentPage?"active":"")+'" ><a href="javascript:'+(i!=currentPage?nameFunction+"("+i+")":"void(0)")+';">'+i+'</a></li>';
                    }
              }else{
                  htmlPaging+= '<li class="active" ><a href="javascript:void(0);">'+currentPage+'/'+totalPaginas+'</a></li>';
              }
              htmlPaging+='<li class="'+(currentPage==totalPaginas?"active":"")+'" ><a class="proximo btn-click" href="javascript:'+(currentPage<totalPaginas?nameFunction+"("+(currentPage+1)+")":"void(0)")+'" > Próximo <i class="icon-forward"></i> </a></li>';
        }
        $(targetElement).html("<ul>"+ htmlPaging +"</ul>");
  }

 

