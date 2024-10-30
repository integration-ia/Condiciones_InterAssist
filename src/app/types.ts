// src/types.ts

export type ConversationStage =
  | 'initial'
  | 'cotizar'
  | 'cotizar_confirm'
  | 'collectingData'        // Añadido para recopilar datos personales
  | 'awaitingConfirmation'
  | 'collectingData'
  | 'awaitingDataConfirmation'
  | 'completed'
  | 'modificar'
  | 'modificar_confirm'
  | 'eliminar'
  | 'duda'
  | 'reiniciar'

  ; // Añadido para futuras opciones

export interface Message {
  text: string;
  isUser: boolean;
}

export interface TravelDetails {
  passengers: number;
  ages: number[];
  destination: string;
  duration: number;
}

export interface UserData {
    firstName: string;
    lastName: string;
    age: number;
    dni: number;
    fecha_nacimiento: Date;
    // Puedes agregar más campos según tus necesidades
  }

  export interface Quote {
    plan: string;
    price: string; // Cambiar a string para soportar toFixed()
  }
  
  export interface QuoteData {
    quotes: Quote[];
    travelDetails: TravelDetails;
  }