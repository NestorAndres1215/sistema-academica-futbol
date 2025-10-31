import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  MostrarSpinner() {
    throw new Error('Method not implemented.');
  }
  private spinnerElement: HTMLElement;
  private spinnerTextElement: HTMLElement;
  private blockerElement: HTMLElement;
  public spinnerText: string = 'Cargando...';
  private active: boolean = false;

  constructor() {
    this.spinnerElement = document.createElement('div');
    this.spinnerTextElement = document.createElement('div');
    this.spinnerTextElement.setAttribute('id', 'spinner-text');
    this.spinnerTextElement.innerText = this.spinnerText;
    this.spinnerTextElement.style.fontWeight = 'bold';

    const img = document.createElement('img');
    img.setAttribute('src', 'https://i.imgur.com/rzmEMNh.png');
    img.style.width = '70px';


    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes rotation {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      .rotate {
        animation: rotation 1.5s infinite linear;
      }
    `;
    document.head.appendChild(styleSheet);
    this.spinnerElement.appendChild(img);
    img.classList.add('rotate');

    this.spinnerElement.style.display = 'none';
    this.spinnerElement.style.position = 'fixed';
    this.spinnerElement.style.width = '50px';
    this.spinnerElement.style.top = '50%';
    this.spinnerElement.style.left = '50%';
    this.spinnerElement.style.transform = 'translate(-50%, -50%)';
    this.spinnerElement.style.zIndex = '9999';
    this.spinnerElement.style.display = 'flex';
    this.spinnerElement.style.flexDirection = 'column';
    this.spinnerElement.style.justifyContent = 'center';
    this.spinnerElement.style.alignItems = 'center';

    this.blockerElement = document.createElement('div');
    this.blockerElement.style.position = 'absolute';
    this.blockerElement.style.top = '0';
    this.blockerElement.style.left = '0';
    this.blockerElement.style.right = '0';
    this.blockerElement.style.bottom = '0';
    this.blockerElement.style.margin = 'auto';
    this.blockerElement.style.zIndex = '9998';
    this.blockerElement.style.width = '100%';
    this.blockerElement.style.height = '100%';
    this.blockerElement.style.backgroundColor = 'rgba(0,0,0, 0.2)';

    this.spinnerElement.appendChild(this.spinnerTextElement);
  }


  setSpinnerText(text: string) {
    this.spinnerText = text;
    if (this.spinnerTextElement) {
      this.spinnerTextElement.innerText = text;
    }
  }

  SpinnerCargando(mostrarTexto: boolean = true) {
    if (this.active) {
      return; // si ya hay un spinner activo, no hagas nada
    }
    this.active = true; // marcar como spinner activo
    document.body.appendChild(this.blockerElement);
    document.body.appendChild(this.spinnerElement);
    this.spinnerElement.style.display = 'flex';
    this.spinnerTextElement.style.display = mostrarTexto ? 'block' : 'none';
    this.spinnerTextElement.style.whiteSpace = mostrarTexto ? 'nowrap' : 'nowrap';
    this.blockerElement.style.display = 'block';
    // this.blockerElement.style.cursor = 'wait'; // [Jhanns] Disculpa Kirby :,v
    document.addEventListener('click', this.bloquearClick, true); // bloquear clicks
    document.addEventListener('keydown', this.bloquearTeclado, true); // bloquear teclas
  }

  reset() {
    this.active = false; // marcar como spinner inactivo
    this.spinnerTextElement.style.display = 'block';
    this.spinnerTextElement.innerText = 'Cargando...';
    this.spinnerElement.style.display = 'none';
    this.blockerElement.style.display = 'none';
    this.blockerElement.style.cursor = 'auto';
    document.removeEventListener('click', this.bloquearClick, true); // remover bloqueo de clicks
    document.removeEventListener('keydown', this.bloquearTeclado, true); // remover bloqueo de teclas
  }

  OcultarSpinner(mostrarTexto: boolean = true) {
    if (!this.spinnerElement || !this.spinnerElement.parentNode) {
      // el spinner no está en el DOM
      return;
    }
    // remover el bloqueo de eventos de clic y teclado
    document.removeEventListener('click', this.bloquearClick, true);
    document.removeEventListener('keydown', this.bloquearTeclado, true);

    // remover el elemento div con la imagen del spinner del body
    if (this.spinnerElement.parentNode) {
      this.spinnerElement.parentNode.removeChild(this.spinnerElement);
    }
    if (this.blockerElement.parentNode) {
      this.blockerElement.parentNode.removeChild(this.blockerElement);
    }
    // cambiar la propiedad display del spinner y del bloqueador para ocultarlos
    this.spinnerElement.style.display = 'none';
    this.blockerElement.style.display = 'none';
    this.blockerElement.style.cursor = 'auto';

    // establecer la propiedad display del elemento de texto del spinner
    this.spinnerTextElement.style.display = mostrarTexto ? 'block' : 'none';
  }

  bloquearClick = (event: MouseEvent) => {
    event.preventDefault();
  }

  bloquearTeclado = (event: KeyboardEvent) => {
    event.preventDefault();
  }
  
}
