"use client";

import React, { useState } from "react";
import FlipCard from "./FlipCard";

// Información que mostrará cada tarjeta, incluyendo las categorías asignadas
const cardData = [
  {
    id: 1,
    title: "Generalidades del Servicio",
    info: `Proveedor: Interassist S.A.
    Tipo de Servicio: Asistencia al viajero.
    Alcance: Para enfermedades agudas y eventos súbitos durante el viaje.
    Exclusión de Cobertura: Enfermedades preexistentes (salvo excepciones).
    No es un seguro: El servicio no reemplaza seguros médicos o sociales.`,
    category: "Asistencia General",
  },
  {
    id: 2,
    title: "Procedimiento para Solicitar Asistencia",
    info: `Comunicación: Llamar a la Central de Asistencia antes de incurrir en cualquier gasto.
    Medios de Contacto: Teléfono, WhatsApp, o correo a asistencias@interassist.travel.
    Emergencias: En caso de emergencia médica, notificar dentro de las 24 horas posteriores.`,
    category: "Procedimientos",
  },
  {
    id: 3,
    title: "Reembolsos",
    info: `Condiciones: Solo para gastos previamente autorizados.
    Documentación requerida:
    - Facturas originales.
    - Historia clínica y diagnóstico.
    - Pasaporte con sellos de migración.
    Tiempo para solicitar: Presentar dentro de los 30 días posteriores al fin del viaje.`,
    category: "Reembolsos",
  },
  {
    id: 4,
    title: "Obligaciones del Contratante",
    info: `Llamar antes de tomar cualquier iniciativa.
    Proveer toda la documentación necesaria (historia clínica, informes, etc.).
    Aceptar las soluciones propuestas por Interassist.`,
    category: "Obligaciones",
  },
  {
    id: 5,
    title: "Asistencia Médica",
    info: `Cobertura:
    - Consultas y atención médica de urgencia.
    - Exámenes complementarios autorizados.
    - Medicamentos recetados en caso de urgencia.
    - Odontología de urgencia (dolor y extracción limitada).
    Limitaciones: No cubre enfermedades preexistentes ni tratamientos continuos.`,
    category: "Asistencia Médica",
  },
  {
    id: 6,
    title: "Traslado y Repatriación",
    info: `Traslado de Familiar: Cubierto cuando el beneficiario es hospitalizado por más de 5 días.
    Repatriación Sanitaria: Traslado al país de residencia si es necesario por razones médicas.
    Repatriación Funeraria: Transporte de restos en caso de fallecimiento durante el viaje.`,
    category: "Traslados",
  },
  {
    id: 7,
    title: "Pérdida y Compensación de Equipaje",
    info: `Pérdida de Equipaje: Se ofrece compensación complementaria a la pagada por la aerolínea.
    Tramos aéreos: Hasta $40 USD por kg perdido.
    Tramos marítimos: Hasta $40 USD por kg perdido.
    Documentación: Requiere formulario P.I.R. (Property Irregularity Report).`,
    category: "Equipaje",
  },
  {
    id: 8,
    title: "Demora en la Entrega de Equipaje",
    info: `Compensación por Demora: Reembolso por gastos de artículos de primera necesidad.
    Condiciones: Solo válido para tramos aéreos internacionales.
    Exclusiones: No se cubre para vuelos de regreso al país de origen.`,
    category: "Equipaje",
  },
  {
    id: 9,
    title: "Asistencia Legal y Transferencia de Fondos",
    info: `Asistencia Legal: Se cubren honorarios de abogado en caso de accidentes de tránsito.
    Transferencia de Fondos: Se permite en emergencias, el contratante cubre el monto transferido.
    Fianza Penal: Transferencia de fondos para pagar fianza en caso de detención por accidente de tránsito.`,
    category: "Asistencia Legal",
  },
  {
    id: 10,
    title: "Cancelación e Interrupción del Viaje",
    info: `Cancelación de Viaje: Cubierto cuando el viaje no puede realizarse debido a motivos graves como enfermedad o accidente.
    Interrupción del Viaje: Retorno anticipado por fallecimiento o enfermedad grave de un familiar.
    Documentación: Requiere la validación de la Central de Asistencia y justificación documentada.`,
    category: "Cancelación",
  },
  {
    id: 11,
    title: "Exclusiones Generales",
    info: `No se cubren: Enfermedades preexistentes, tratamientos estéticos, gastos por atención psicológica, y participación en deportes profesionales o peligrosos.
    No se cubren: Daños en equipaje por causas naturales o retenido por aduana.`,
    category: "Exclusiones",
  },
  {
    id: 12,
    title: "Gastos de Hotel por Convalecencia",
    info: `Condiciones: Hasta $50 USD por día para viajes internacionales y $25 USD para nacionales.
    Aplicación: Solo válido si el contratante es hospitalizado y requiere reposo forzoso.`,
    category: "Asistencia Médica",
  },
  {
    id: 13,
    title: "Práctica Deportiva Amateur",
    info: `Cobertura: Se cubren lesiones ocurridas durante la práctica de deportes amateurs con fines recreativos.
    Exclusión: No se cubren deportes de riesgo o competencias profesionales.`,
    category: "Deportes",
  },
  {
    id: 14,
    title: "Montos Máximos de Cobertura",
    info: `Cobertura Global Máxima: El límite de gastos por todos los servicios no podrá exceder la cantidad especificada en el certificado o voucher.
    Límite agregado por catástrofe: Máximo de $250,000 USD, con un límite por contratante de $60,000 USD.`,
    category: "Cobertura",
  },
  {
    id: 15,
    title: "Sustitución de Ejecutivos",
    info: `Condiciones: Interassist cubrirá el pasaje de un sustituto si el contratante, en viaje de negocios, es hospitalizado.
    Plazo de Notificación: Debe solicitarse dentro de las primeras 24 horas de la hospitalización.`,
    category: "Negocios",
  },
  {
    id: 16,
    title: "Línea de Consulta",
    info: `Servicios Ofrecidos: Información sobre hoteles, clima, moneda, consulados, embajadas, medicamentos, etc.
    Disponibilidad: 24 horas, 365 días del año.`,
    category: "Consultas",
  },
  {
    id: 17,
    title: "Transferencia de Fondos",
    info: `Emergencias: Se permite la transferencia de fondos en casos de emergencia, hasta el límite especificado en el certificado o voucher.
    Condición: Interassist cubre solo el costo de la transferencia; el contratante debe aportar los fondos.`,
    category: "Asistencia Legal",
  },
  {
    id: 18,
    title: "Asistencia en Cruceros",
    info: `Cobertura: Asistencia médica y tratamiento por enfermedades o accidentes ocurridos a bordo.
    Exclusiones: No cubre enfermedades preexistentes o procedimientos electivos.`,
    category: "Cruceros",
  },
  {
    id: 19,
    title: "Asistencia a Embarazadas",
    info: `Cobertura: Se cubren emergencias médicas relacionadas con el embarazo hasta la semana 24.
    Exclusiones: No se cubren partos o complicaciones después de la semana 24 de gestación.`,
    category: "Asistencia Médica",
  },
  {
    id: 20,
    title: "Seguro por Muerte Accidental en Transporte Público",
    info: `Cobertura: En caso de muerte accidental en transporte público durante el viaje, Interassist paga el monto estipulado en el certificado o voucher.`,
    category: "Seguro",
  },
  {
    id: 21,
    title: "Franquicia y Deducibles",
    info: `Franquicia: Es la parte de los gastos a cargo del contratante antes de que Interassist asuma los costos.
    Franquicia Kilométrica: En algunos casos, los servicios no se prestarán dentro de un radio de 100 km del domicilio del contratante.`,
    category: "Franquicia",
  },
  {
    id: 22,
    title: "Reembolso por Cancelación o Interrupción de Viaje",
    info: `Cobertura: Reembolso por gastos no reembolsables cuando el viaje debe ser cancelado o interrumpido por enfermedad grave, accidente o fallecimiento.
    Condiciones: Se requiere notificación previa a la central de asistencia y documentación justificativa.`,
    category: "Reembolsos",
  },
  {
    id: 23,
    title: "Gastos por Vuelo Demorado o Cancelado",
    info: `Cobertura: Reembolso por gastos adicionales en caso de vuelo demorado o cancelado, siempre que esté especificado en el certificado o voucher.
    Condiciones: Solo válido para vuelos internacionales.`,
    category: "Vuelos",
  },
  {
    id: 24,
    title: "Subrogación",
    info: `Definición: Si Interassist cubre gastos que deberían haber sido asumidos por un tercero, adquiere el derecho de subrogarse en las acciones del contratante contra dicho tercero.`,
    category: "Asistencia Legal",
  },
  {
    id: 25,
    title: "Circunstancias Excepcionales",
    info: `Exclusión de responsabilidad: Interassist no será responsable por incumplimientos debido a eventos de fuerza mayor, como guerras, actos de terrorismo, pandemias, etc.`,
    category: "Exclusiones",
  },
  {
    id: 26,
    title: "Requisitos para la Emisión de Nuevos Certificados",
    info: `Condiciones: Cualquier solicitud de emisión de nuevos certificados o vouchers deberá cumplir con los procedimientos establecidos y notificados a Interassist antes del viaje.`,
    category: "Certificados",
  },
  {
    id: 27,
    title: "Servicios No Acumulativos",
    info: `Regla: Los servicios ofrecidos por Interassist no son acumulativos, es decir, no se pueden acumular coberturas de diferentes productos o servicios contratados.`,
    category: "Servicios",
  },
  {
    id: 28,
    title: "Exclusiones Generales",
    info: `No cubre: 
    - Enfermedades preexistentes.
    - Participación en deportes peligrosos.
    - Tratamientos estéticos.
    - Daños causados por guerra, terrorismo, o desastres naturales.`,
    category: "Exclusiones",
  },
  {
    id: 29,
    title: "Reembolsos y Procedimientos",
    info: `Plazo para Reembolsos: Hasta 60 días después de la recepción de la documentación completa.
    Requisitos: Presentar la documentación original y el comprobante de pago de la aerolínea o empresa de transporte.`,
    category: "Reembolsos",
  },
  {
    id: 30,
    title: "Módulo COVID-19",
    info: `Condiciones Especiales: Aplica únicamente si el producto contratado incluye este módulo.
    Cobertura:
    - Asistencia médica en caso de diagnóstico positivo durante el viaje.
    - Traslado y repatriación sanitaria en caso de complicaciones graves.
    Exclusiones:
    - No cubre gastos por cuarentena preventiva ni pruebas diagnósticas.
    - No cubre tratamientos relacionados con secuelas a largo plazo del COVID-19.`,
    category: "Asistencia Médica",
  },
  {
    id: 31,
    title: "Requisitos para Nuevos Certificados o Vouchers",
    info: `Costos: Emisión de nuevos certificados o vouchers conlleva un costo administrativo de $15 USD.
    Modificaciones y Cancelaciones: Cualquier solicitud de cancelación o modificación debe hacerse antes del inicio de la vigencia.`,
    category: "Certificados",
  },
  {
    id: 32,
    title: "Ley Aplicable y Jurisdicción",
    info: `Jurisdicción: Los conflictos derivados del contrato se resolverán bajo la ley argentina.
    Prescripción: Los reclamos relacionados con los servicios prestados prescriben después de 1 año desde el evento.`,
    category: "Legales",
  },
  {
    id: 33,
    title: "Servicios Adicionales",
    info: `Servicios Opcionales: Algunos planes incluyen servicios adicionales como:
    - Información turística.
    - Transmisión de mensajes urgentes.
    - Localización de equipaje perdido.
    No acumulativos: Los servicios adicionales no se acumulan entre diferentes certificados o vouchers.`,
    category: "Servicios",
  },
  {
    id: 34,
    title: "Reserva de Derechos",
    info: `Derechos de Interassist: La empresa se reserva el derecho de modificar los términos y condiciones del servicio en cualquier momento.
    Vigencia: Las modificaciones se aplican a los nuevos certificados emitidos tras cualquier cambio.`,
    category: "Legales",
  },
  {
    id: 35,
    title: "Constancia y Certificados",
    info: `Documentación: El certificado o voucher es el único documento válido para solicitar asistencia durante el viaje.
    Responsabilidad del Contratante: El contratante es responsable de la veracidad de la información proporcionada al adquirir el servicio.`,
    category: "Certificados",
  },
  {
    id: 36,
    title: "Pérdida de Equipaje",
    info: `Indemnización Complementaria (Tramo Aéreo):
    - Si un bulto registrado no es entregado al final del vuelo, Interassist abona una indemnización complementaria a la de la aerolínea.
    - Montos:
    - $40 USD por kilogramo en vuelos internacionales.
    - $20 USD por kilogramo en vuelos nacionales.
    - Condiciones:
    - La compensación no excederá el valor declarado en la denuncia presentada a la aerolínea.
    - Se requiere presentar el formulario P.I.R. (Property Irregularity Report) de la aerolínea.
    Indemnización Complementaria (Tramo Marítimo):
    - En cruceros, se indemniza por bulto perdido hasta $40 USD por kilogramo, similar al tramo aéreo.
    Exclusiones:
    - No cubre faltantes parciales o daños en el contenido del equipaje.
    - No aplica a vuelos domésticos o si el equipaje es retenido por aduanas.`,
    category: "Equipaje",
  },
  {
    id: 37,
    title: "Procedimiento en Caso de Pérdida de Equipaje",
    info: `Pasos a Seguir:
    - El contratante debe dirigirse a la aerolínea o empresa de transporte en el aeropuerto o puerto y completar el formulario P.I.R.
    - Notificar a la Central de Asistencia de Interassist dentro de las primeras 24 horas.
    - Al regresar al país de origen, se debe presentar el formulario P.I.R., el certificado o voucher, y el comprobante de indemnización de la aerolínea.`,
    category: "Equipaje",
  },
  {
    id: 38,
    title: "Demora en la Entrega del Equipaje",
    info: `Compensación por Demora:
    - Si el equipaje no es localizado al llegar al destino final en vuelos internacionales, Interassist reembolsa gastos por la compra de artículos de primera necesidad.
    - Montos: Los límites varían según el certificado o voucher contratado.
    Condiciones:
    - La compra debe realizarse entre el momento de la denuncia y la entrega del equipaje.
    - No cubre artículos de lujo, electrónicos o valijas.
    - No aplica para tramos de regreso al país de origen.
    Procedimiento:
    - El contratante debe hacer la denuncia en el aeropuerto completando el formulario P.I.R.
    - Notificar a la Central de Asistencia de Interassist dentro de las 24 horas.
    - Presentar la constancia del día y hora en que la aerolínea entrega el equipaje para hacer efectivo el reembolso.`,
    category: "Equipaje",
  },
];

const SearchAndCards: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Estado para la categoría seleccionada

  // Filtrar tarjetas según el término de búsqueda y categoría seleccionada
  const filteredCards = cardData.filter((card) => {
    const matchesSearchTerm = card.info.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? card.category === selectedCategory : true;
    return matchesSearchTerm && matchesCategory;
  });

  return (
    <section className="p-8 container">
      {/* Contenedor de la barra de búsqueda y el filtro */}
      <div className="flex justify-between items-center w-full">
        {/* Barra de búsqueda */}
        <div className="relative w-2/3 ml-3">
          <input
            type="text"
            placeholder="Buscar información..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-teal-300 focus:border-teal-500 transition-colors duration-300 bg-white text-teal-800 placeholder-teal-400"
          />
          {/* Ícono de lupa */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-teal-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m1.91-5.76a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
            />
          </svg>
        </div>

        {/* Filtro de categorías */}
        <div className="w-1/2 flex justify-end mr-5">
          <select
            className="pl-8 pr-10 py-3 rounded-full border-2 border-teal-300 focus:border-teal-500 transition-colors duration-300 bg-white text-teal-800"
            onChange={(e) => setSelectedCategory(e.target.value)} // Manejar el cambio de categoría
          >
            <option value="">Filtrar por Categoría</option>
            <option value="Asistencia General">Asistencia General</option>
            <option value="Procedimientos">Procedimientos</option>
            <option value="Reembolsos">Reembolsos</option>
            <option value="Obligaciones">Obligaciones</option>
            <option value="Asistencia Médica">Asistencia Médica</option>
            <option value="Traslados">Traslados</option>
            <option value="Equipaje">Equipaje</option>
            <option value="Asistencia Legal">Asistencia Legal</option>
            <option value="Cancelación">Cancelación</option>
            <option value="Exclusiones">Exclusiones</option>
            <option value="Cobertura">Cobertura</option>
            <option value="Negocios">Negocios</option>
            <option value="Consultas">Consultas</option>
            <option value="Cruceros">Cruceros</option>
            <option value="Seguro">Seguro</option>
            <option value="Franquicia">Franquicia</option>
            <option value="Vuelos">Vuelos</option>
            <option value="Certificados">Certificados</option>
            <option value="Servicios">Servicios</option>
          </select>
        </div>
      </div>

      {/* Renderizar tarjetas filtradas */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mt-6">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => (
            <FlipCard key={card.id} title={card.title} info={card.info} category={card.category} />
          ))
        ) : (
          <p className="text-gray-500">No se encontraron resultados.</p>
        )}
      </div>
    </section>
  );
};

export default SearchAndCards;
