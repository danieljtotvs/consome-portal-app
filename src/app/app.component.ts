import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  token: string = '';
  elegibilityToken: string = '';
  title = 'consome-portal-app';

  // urlbase: string = 'http://52.20.6.162:8080';
  //urlbase: string = 'https://portal.totvs.com.br:4443';
  // urlbase: string = 'http://es-datasul.sp01.local:8880';
  // urlbase: string = 'https://engjv.datasul.cloudtotvs.com.br:48880'; //Squad
  // urlbase: string = 'https://portalprestador.totvs.com.br:4443';
  urlbase: string = 'https://portal.totvs.com.br:4443'; //localhost
  // urlbase: string = 'https://engjv.datasul.cloudtotvs.com.br:48280'; //sistemico externo
  // urlbase: string = 'http://engjv-tsdock01:8280'; //sistemico interno
  // urlbase: string = 'http://localhost:8280' 

  auth = false;

  async ngOnInit() {
    let token = await this.autenticate();

    //token = '123';

    if (token) {
      this.token = token;
      // this.loadPage(token);      
      // this.renderIframe(token);      
    }

    this.initializeEventListeners();

  }

  removeExistentsScripts(){
    let existingScript = document.getElementById("port-prest-external-integration");

    if (existingScript) {
      existingScript.remove(); // Remove o script caso já exista
    }
  }

  protected consultationRegister() {
    this.removeExistentsScripts();
    let scriptToken = document.createElement("script");
    scriptToken.setAttribute("src", `${this.urlbase}/totvs-hgp-portal-prestador/external-integration/consultation-register.js`);
    scriptToken.setAttribute("type", "text/javascript");
    scriptToken.setAttribute("id", "port-prest-external-integration");
    scriptToken.setAttribute("token", `${this.token}`);
    scriptToken.setAttribute("target", "#divIframe");
    document.getElementsByTagName('body')[0]?.appendChild(scriptToken);
  }

  protected examRequest() {
    this.removeExistentsScripts();
    let scriptToken = document.createElement("script");
    scriptToken.setAttribute("src", `${this.urlbase}/totvs-hgp-portal-prestador/external-integration/exam-request.js`);
    scriptToken.setAttribute("type", "text/javascript");
    scriptToken.setAttribute("id", "port-prest-external-integration");
    scriptToken.setAttribute("token", `${this.token}`);
    scriptToken.setAttribute("target", "#divIframe");
    document.getElementsByTagName('body')[0]?.appendChild(scriptToken);
  }

  protected newInternment() {

    let existingIframe = document.getElementById("port-prest-iframe");
    if (existingIframe) {
        existingIframe.remove(); // Remove o iframe antigo
    }

    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", `${this.urlbase}/totvs-hgp-portal-prestador/#/consultation-register?token=${this.token}`);
    iframe.setAttribute("id", 'port-prest-iframe');
    iframe.setAttribute("frameborder", "0");
    iframe.style.width = "100%";
    iframe.style.height = "95vh";        
    document.querySelector('#divIframe')?.appendChild(iframe);

  }

//   renderIframe(token:string) {
//     let iframe = document.createElement("iframe");
//     iframe.setAttribute("src", `${this.urlbase}/totvs-hgp-portal-prestador/#/checkin?token=${token}`);
//     iframe.setAttribute("frameborder", "0");
//     iframe.setAttribute("allow", "camera *;");
//     iframe.style.width = "100vw";
//     iframe.style.height = "95vh";
//     document.getElementById('divIframe')?.appendChild(iframe);
// }

  private async autenticate() {
    const bodyRequest = JSON.stringify({

      //sistemico
      // "user": "jessica",
      // "password": "6657a66f2419358f2267c7788a6dabb8",
      // "clinic": 10026,
      // "cnpjClinic": "",
      // "provider": 31921,
      // "beneficiaryCard": "01201000643000017"

        //  "user": "31921",
        //  "password": "6657a66f2419358f2267c7788a6dabb8",
        //  "cnpjClinic": "03.151.186/0001-78",
        //  "clinic": 10026,
        //  "provider": "31921",
        //  "beneficiaryCard": "01200108959000048"

        //Squad
        "user": "daniel.jose",
        "password": "261c3b26b737ffc731837e1e35d17b9c",
        "clinic": 10026,
        "cnpjClinic": "03.151.186/0001-78",
        "provider": 31921,
        "beneficiaryCard": "01200001000000084"

        //  "user": "31921",
        //  "password": "6657a66f2419358f2267c7788a6dabb8",
        //  "cnpjClinic": "03.151.186/0001-78",
        //  "clinic": 10026,
        //  "provider": "31921",
        //  "beneficiaryCard": "01200108959000048"

        // "user": "secretariateste",
        // "password": "261c3b26b737ffc731837e1e35d17b9c",
        // "clinic": 10026,
        // "cnpjClinic": "03.151.186/0001-78",
        // "provider": 31921,
        // "beneficiaryCard": "01200108959000048"

        
        // "user": "31923",
        // "password": "6657a66f2419358f2267c7788a6dabb8",
        // "clinic": 10026,
        // "cnpjClinic": "03.151.186/0001-78",
        // "provider": 31923,
        // "beneficiaryCard": "01200108959000048"        

        // "user": "daniel.jose",
        // "password": "261c3b26b737ffc731837e1e35d17b9c",
        // "clinic": 10026,
        // "cnpjClinic": "03.151.186/0001-78",
        // "provider": 110005,
        // "beneficiaryCard": "01200108959000048"
        
        // "user": "31921",
        // "password": "1e0a55d2ab93ff0fec2dc379284f05b3",
        // "cnpjClinic": "03.151.186/0001-78",
        // "clinic": 10026,
        // "provider": 31921,
        // "beneficiaryCard": "01200108959000048"
    });

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: bodyRequest
    };

    // fetch('${this.urlbase}/totvs-hgp-haw-auth/api/external-authentication', options)
    // .then(response => console.log('response', response.json()))
    // .catch(error => console.error('Error:', error))

    // return '';


    const result = await fetch(`${this.urlbase}/totvs-hgp-haw-auth/api/external-authentication`, options) ?? ""; 
    const { externalToken, token } = await result.json();
    this.elegibilityToken = token;

    if(token) {
      this.auth = true;
    }

    return externalToken;
  }
  
  private initializeEventListeners(){
    window.addEventListener("message", (event) => {
      // Verifique a origem da mensagem para evitar problemas de segurança
      // if (event.origin !== "${this.urlbase}") return;
  
      if (event.data.event === "savedConsultationRegister") {
          console.log("Registro de consulta: ", event.data);
          alert("O Registro de consulta foi salvo com sucesso!");
      }

      if (event.data.event === "examRequestFinish") {
          console.log("Solicitação de exame: ", event.data);
          alert("O Solicitação de exame foi salvo com sucesso!");
      }

      if (event.data.event === "checkinCompleted") {
          console.log("checkin: ", event.data);
          alert("O checkin foi salvo com sucesso!");
      }

      if(event.data.event === "savedExamRegistry") {
          console.log("Registro de exame: ", event.data);
          alert("O Registro de exame foi salvo com sucesso!");
      }
    });
  }

async checkElegibility() {

  const bodyRequest = JSON.stringify({
    "provider": 31921,
    "healthInsurerProvider": 120,
    "completeCardNumber": "01200108959000048"
  });

  const options = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${this.elegibilityToken}`,
          'x-totvs-hgp-portal-prestador-clinic': '10026'
      },
      body: bodyRequest
  };


  const result = await fetch(`${this.urlbase}/dts/datasul-rest/resources/prg/portprest/v1/elegibility`, options) ?? ""; 
  let res = await result.json()
  
}

  testeDireto(){
    let existingIframe = document.getElementById("port-prest-iframe");
    if (existingIframe) {
        existingIframe.remove(); // Remove o iframe antigo
    }


    let iframe = document.createElement("iframe");
    iframe.setAttribute("src", `${this.urlbase}/totvs-hgp-portal-prestador/#/exam-registry?token=${this.token}`);
    iframe.setAttribute("id", 'port-prest-iframe');
    iframe.setAttribute("frameborder", "0");
    iframe.style.width = "100%";
    iframe.style.height = "95vh";        
    
    document.querySelector('#divIframe')?.appendChild(iframe);
  }

  novoCheckin(){
    this.renderIframe('checkin.js', 'divIframe');
  }

  novoRegExame() {
    this.renderIframe('exam-registry.js', 'divIframe');
  }

  novoRegistroConsulta(){
    this.renderIframe('consultation-register.js', 'divIframe');
  }

  novaSolcitacaoExames(){
    this.renderIframe('exam-request.js');
  }

  novaSolcitacaoInternacao(){
    this.renderIframe('hospitalization-request.js');
  }

  novaPerfilMedico(){
    this.renderIframe('medical-profile.js');
  }

  novaPerfilMedicoApelidos(){
    this.renderIframe('medical-profile-nickname.js');
  }

  novaPerfilMedicoPacote() {
    this.renderIframe('medical-profile-package.js');
  }

  novaPerfilMedicoProd() {
    this.renderIframe('medical-profile-medical-production.js');
  }

  novaPerfilMedicoUsosBenef() {
    this.renderIframe('medical-profile-beneficiary-use.js');
  }

  novaPerfilMedicoFavoritos() {
    this.renderIframe('medical-profile-favorites.js');
  }

  guiasDoBeneficiario() {
    this.renderIframe('beneficiary-guides.js');
  }

  titulosDoPrestador() {
    this.renderIframe('provider-payment-titles.js');
  }

  mensageria() {
    this.renderIframe('messaging.js');
  }

  demonstrativoInss() {
    this.renderIframe('demonstrative-inss.js');
  }

  solicitacoesTissPrestador() {
    this.renderIframe('provider-tiss-guides.js');
  }

  historicoAtendimentos() {
    this.renderIframe('attendance-history.js');
  }

  justificativaReconsulta() {
    this.renderIframe('justification-reconsultation.js');
  }

  reimpressaoDocumentos() {
    this.renderIframe('reprinting-documents.js');
  }

  outrasDespesas() {
    this.renderIframe('other-expenses.js');
  }

  cancelamento() {
    this.renderIframe('cancellation.js');
  }

  prorrogacaoInternacao() {
    this.renderIframe('internment-extension.js');
  }

  renderIframe(program:string, divName:string = 'divIframe') {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
        },
    };

    fetch(`${this.urlbase}/totvs-hgp-haw-auth/external-integration/${program}`, options)
    .then(response => {      
      if (!response.ok) {
        throw new Error("Erro ao buscar módulo embedado");
      }
      return response.text(); 
    })
    .then(html => {      
      const divIframe = document.getElementById(divName);
      if (divIframe) {
        //html = html.replace('token=','token=abc');
        divIframe.innerHTML = html;
      } else {
        console.error("Elemento 'divIframe' não encontrado.");
      }
    })
    .catch(error => {
      console.error("Erro ao carregar módulo embedado:", error);
    });
  }

}
