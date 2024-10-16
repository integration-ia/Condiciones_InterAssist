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
        moreinfo: `Interassist S.A. (en adelante INTERASSIST) es una empresa que presta el servicio de asistencia al viajero a la persona que lo contrate (en adelante el CONTRATANTE), para los viajes que realice.
El servicio de asistencia al viajero, en adelante el SERVICIO, consiste en el conjunto de prestaciones asistenciales, que el CONTRATANTE podrá solicitar durante los viajes que realice, de acuerdo a los presentes términos y condiciones generales (en adelante los TYCG).
Los TYCG establecen las modalidades, alcances y límites del SERVICIO. Los TYCG están incorporados y establecidos en el voucher de servicio (en adelante indistintamente el CERTIFICADO o el VOUCHER) y consecuentemente se considerarán conocidos y aceptados en su totalidad por el CONTRATANTE, desde el momento de la contratación del SERVICIO y la consecuente entrega del voucher. Los TYCG también pueden ser consultados en el sitio de internet www.interassist.travel.

1.1 Se deja expresa constancia, y así lo acepta el CONTRATANTE al contratar el SERVICIO, que el SERVICIO no constituye un seguro médico ni de cualquier otro tipo, ni una extensión o sustituto de programas de seguridad social ni de medicina prepaga. El SERVICIO tiene por finalidad asistir al CONTRATANTE en viaje en caso de enfermedades agudas y/o eventos súbitos e imprevisibles que ocurran con posterioridad al inicio del viaje e impidan la normal continuación del mismo. No están cubiertas las enfermedades preexistentes salvo que el producto así lo contemple.`,
    },
    {
        id: 2,
        title: "Procedimiento para Solicitar Asistencia",
        info: `Comunicación: Llamar a la Central de Asistencia antes de incurrir en cualquier gasto.
    Medios de Contacto: Teléfono, WhatsApp, o correo a asistencias@interassist.travel.
    Emergencias: En caso de emergencia médica, notificar dentro de las 24 horas posteriores.`,
        category: "Procedimientos",
        moreinfo: `6.1 Para solicitar los servicios, el CONTRATANTE siempre deberá tomar contacto previamente, con la Central de Asistencia INTERASSIST, tantas veces como asistencias requiera, llamando o enviando un mensaje por WhatsApp a los números telefónicos impresos en su CERTIFICADO o VOUCHER, o enviando un mail a asistencias@interassist.travel indicando su nombre, número de CERTIFICADO o VOUCHER, vigencia y validez del mismo, el lugar en que se encuentra y el motivo de la solicitud de asistencia.

6.2 En caso de emergencia médica que pone en riesgo la vida del CONTRATANTE y que imposibilite un contacto previo como se lo indica en el párrafo anterior, el CONTRATANTE deberá contactarse con la Central de Asistencia dentro de las veinticuatro (24) horas de producido el cese de la emergencia médica, a fin de que la misma pueda tomar la coordinación del caso; el incumplimiento de esta obligación por parte del CONTRATANTE, facultará a INTERASSIST a su exclusiva opción a rechazar la toma a cargo de los gastos que hubieran correspondido conforme a los TYCG si se hubiera dado participación oportuna a INTERASSIST.`,
        
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
        moreinfo:`7.1 Para que proceda un reembolso de gastos se requiere la previa autorización de la Central de Asistencia y que el hecho generador de los gastos no encuadre dentro de las exclusiones generales establecidas en la cláusula 38 de los TYCG y las exclusiones particulares establecidas para cada prestación.

7.2 En el supuesto que el CONTRATANTE, por razones de fuerza mayor, no hubiera podido cumplir con el procedimiento para solicitar asistencia establecido en la cláusula 6, deberá proporcionar a INTERASSIST todos los datos que le sean solicitados a los efectos de poder constatar la procedencia del servicio obtenido conforme a los TYCG, lo genuino de la emergencia que lo motivara y la imposibilidad de comunicación previa.

7.3 A los efectos de que el reembolso sea autorizado, los gastos cuyo reintegro se solicita, deberán tener una adecuada y razonable proporción con las tarifas que habitualmente INTERASSIST le paga a sus prestadores por los servicios de que se trate en el país en que el CONTRATANTE los haya requerido a terceros y abonado. En caso de que no guarden una razonable proporción, el reembolso se limitará consecuentemente.`,
    },
    {
        id: 4,
        title: "Obligaciones del Contratante",
        info: `Llamar antes de tomar cualquier iniciativa.
    Proveer toda la documentación necesaria (historia clínica, informes, etc.).
    Aceptar las soluciones propuestas por Interassist.`,
        category: "Obligaciones",
        moreinfo: `8.1 Realizar con carácter previo a incurrir en cualquier gasto, el llamado telefónico a la Central de Asistencia para solicitar asistencia y obtener la autorización de INTERASSIST antes de tomar cualquier iniciativa o comprometer cualquier gasto, de acuerdo al procedimiento indicado en la cláusula 6.

8.2 Aceptar las soluciones propuestas por INTERASSIST.

8.3 Autorizar a los profesionales o instituciones médicas intervinientes a revelar a INTERASSIST, o a cualquiera de sus representantes acreditados, la Historia Clínica, así como toda información que le sea necesaria para efectivizar el pago de la hospitalización y/o tratamiento, así como también examinar todos los elementos relativos a los mismos.

8.4 Toda documentación requerida al CONTRATANTE (informes de auditoría médica de INTERASSIST, Historia Clínica, estudios, etc.), no podrá ser entregada a terceros que la soliciten, salvo autorización expresa y por escrito del CONTRATANTE o requerimiento judicial.`
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
        moreinfo: `9.1 Consultas médicas: Se brindará en caso de accidente o enfermedad repentina, aguda e imprevista del CONTRATANTE que impida la normal continuación de su viaje.

9.2 Atención por especialistas: Cuando sea indicado por un prestador médico de INTERASSIST y autorizado por el Departamento Médico de INTERASSIST.

9.3 Exámenes médicos complementarios: Cualquier estudio que sea ordenado por los profesionales indicados por INTERASSIST y autorizados por la Central Asistencial.

9.4 Terapia de recuperación física: En los casos de traumatismos si el Departamento Médico de INTERASSIST lo autoriza, hasta 10 sesiones de fisioterapia, con un máximo de $150 USD por sesión.

9.5 Medicamentos recetados: INTERASSIST se hará cargo de los medicamentos recetados por la afección que diera lugar a la asistencia, hasta el límite máximo establecido en el CERTIFICADO o VOUCHER.`
    },
    {
        id: 6,
        title: "Traslado y Repatriación",
        info: `Traslado de Familiar: Cubierto cuando el beneficiario es hospitalizado por más de 5 días.
    Repatriación Sanitaria: Traslado al país de residencia si es necesario por razones médicas.
    Repatriación Funeraria: Transporte de restos en caso de fallecimiento durante el viaje.`,
        category: "Traslados",
        moreinfo:`12. Traslado de Familiar por Hospitalización del Beneficiario: En caso de que sea requerida la hospitalización del CONTRATANTE por más de 5 días, y este haya viajado solo, INTERASSIST cubrirá el costo de un pasaje aéreo en clase turista para un familiar (padre, madre, cónyuge, hijo o hermano).

15. Traslado y Repatriación Funeraria: En caso de fallecimiento del CONTRATANTE durante el viaje, INTERASSIST organizará y tomará a su cargo los gastos de traslado de restos hasta el lugar de ingreso al país de residencia o lugar de inhumación, dependiendo del plan contratado.`
    },
    {
        id: 7,
        title: "Pérdida y Compensación de Equipaje",
        info: `Pérdida de Equipaje: Se ofrece compensación complementaria a la pagada por la aerolínea.
    Tramos aéreos: Hasta $40 USD por kg perdido.
    Tramos marítimos: Hasta $40 USD por kg perdido.
    Documentación: Requiere formulario P.I.R. (Property Irregularity Report).`,
        category: "Equipaje",
        moreinfo:`23.1 Indemnización Complementaria por Pérdida de Equipaje (Tramo Aéreo):
Si al arribo de un vuelo nacional o internacional, la línea aérea no entrega al CONTRATANTE algún bulto de su equipaje registrado y este no puede ser localizado, INTERASSIST abonará una compensación complementaria a la pagada por la aerolínea, calculada a razón de:

$40 USD por kilogramo en vuelos internacionales.
$20 USD por kilogramo en vuelos nacionales.
23.4 Procedimiento en caso de pérdida de equipaje:
El CONTRATANTE deberá dirigirse a las oficinas de la compañía aérea en el aeropuerto y completar el formulario P.I.R. (Property Irregularity Report), notificando también a la Central de Asistencia INTERASSIST dentro de las primeras 24 horas.`
    },
    {
        id: 8,
        title: "Demora en la Entrega de Equipaje",
        info: `Compensación por Demora: Reembolso por gastos de artículos de primera necesidad.
    Condiciones: Solo válido para tramos aéreos internacionales.
    Exclusiones: No se cubre para vuelos de regreso al país de origen.`,
        category: "Equipaje",
        moreinfo:`24.1 Compensación por Demora en la Entrega del Equipaje (Tramos Internacionales):
Si el equipaje no es localizado al llegar al destino final en vuelos internacionales, INTERASSIST reembolsará los gastos en que incurra el CONTRATANTE para la compra de artículos de primera necesidad, hasta el monto máximo especificado en el CERTIFICADO o VOUCHER.
Condiciones:

No aplica para vuelos de regreso al país de origen.
No cubre artículos de lujo, electrónicos o valijas.`
    },
    {
        id: 9,
        title: "Asistencia Legal y Transferencia de Fondos",
        info: `Asistencia Legal: Se cubren honorarios de abogado en caso de accidentes de tránsito.
    Transferencia de Fondos: Se permite en emergencias, el contratante cubre el monto transferido.
    Fianza Penal: Transferencia de fondos para pagar fianza en caso de detención por accidente de tránsito.`,
        category: "Asistencia Legal",
        moreinfo: `27. Asistencia Legal por Accidente de Tránsito:
Si el CONTRATANTE se ve involucrado en un accidente de tránsito y se le imputa responsabilidad civil o penal, INTERASSIST se hará cargo de los honorarios del abogado hasta los límites indicados en el CERTIFICADO o VOUCHER.

25. Transferencia de Fondos:
En caso de emergencia justificada, el CONTRATANTE puede solicitar una transferencia de fondos hasta el límite establecido en el CERTIFICADO o VOUCHER. INTERASSIST solo cubrirá el costo de la transferencia; el contratante deberá proporcionar los fondos a transferir.

`
    },
    {
        id: 10,
        title: "Cancelación e Interrupción del Viaje",
        info: `Cancelación de Viaje: Cubierto cuando el viaje no puede realizarse debido a motivos graves como enfermedad o accidente.
    Interrupción del Viaje: Retorno anticipado por fallecimiento o enfermedad grave de un familiar.
    Documentación: Requiere la validación de la Central de Asistencia y justificación documentada.`,
        category: "Cancelación",
        moreinfo: `35. Reembolso por Cancelación o Interrupción de Viaje:
Si el CONTRATANTE se ve obligado a cancelar o interrumpir su viaje debido a enfermedad grave, accidente o fallecimiento de un familiar directo, INTERASSIST reembolsará los gastos no reembolsables, siempre que se notifique previamente a la Central de Asistencia y se presente la documentación justificativa.`
    },
    {
        id: 11,
        title: "Exclusiones Generales",
        info: `No se cubren: Enfermedades preexistentes, tratamientos estéticos, gastos por atención psicológica, y participación en deportes profesionales o peligrosos.
    No se cubren: Daños en equipaje por causas naturales o retenido por aduana.`,
        category: "Exclusiones",
        moreinfo: `37. Exclusiones Generales:

No están cubiertas las enfermedades preexistentes, crónicas, congénitas, o en tratamiento al inicio del viaje, así como sus consecuencias o complicaciones.
No se cubren los daños ocurridos en el contexto de participación en deportes peligrosos o profesionales.
No se cubren tratamientos estéticos, odontológicos (salvo los indicados específicamente), ni gastos por atención psicológica o psiquiátrica.
No se cubren daños en equipaje causados por desastres naturales, guerras, actos de terrorismo o retención aduanera.
No se cubre ningún gasto relacionado con la toma de riesgo profesional o industrial.`
    },
    {
        id: 12,
        title: "Gastos de Hotel por Convalecencia",
        info: `Condiciones: Hasta $50 USD por día para viajes internacionales y $25 USD para nacionales.
    Aplicación: Solo válido si el contratante es hospitalizado y requiere reposo forzoso.`,
        category: "Asistencia Médica",
        moreinfo: `13. Gastos de Hotel por Convalecencia:
Si el CONTRATANTE requiere reposo forzoso tras una hospitalización, INTERASSIST se hará cargo o reembolsará los gastos de alojamiento en hotel (sin extras), hasta un tope diario de $50 USD para viajes internacionales y $25 USD para viajes nacionales, y hasta el límite de días detallado en el CERTIFICADO o VOUCHER.`
    },
    {
        id: 13,
        title: "Práctica Deportiva Amateur",
        info: `Cobertura: Se cubren lesiones ocurridas durante la práctica de deportes amateurs con fines recreativos.
    Exclusión: No se cubren deportes de riesgo o competencias profesionales.`,
        category: "Deportes",
        moreinfo: `32. Práctica Deportiva Amateur con Fines Recreativos:
Se cubren las lesiones ocurridas durante la práctica de deportes amateurs con fines recreativos, siempre que no se trate de deportes de riesgo o profesionales. No se cubren deportes como montañismo, buceo, paracaidismo, carreras automovilísticas, etc.`
    },
    {
        id: 14,
        title: "Montos Máximos de Cobertura",
        info: `Cobertura Global Máxima: El límite de gastos por todos los servicios no podrá exceder la cantidad especificada en el certificado o voucher.
    Límite agregado por catástrofe: Máximo de $250,000 USD, con un límite por contratante de $60,000 USD.`,
        category: "Cobertura",
        moreinfo: `10. Cobertura Global Máxima:
El monto total de gastos por todos los servicios detallados en los presentes TYCG no podrá exceder la cobertura global máxima indicada en el CERTIFICADO o VOUCHER.`
    },
    {
        id: 15,
        title: "Sustitución de Ejecutivos",
        info: `Condiciones: Interassist cubrirá el pasaje de un sustituto si el contratante, en viaje de negocios, es hospitalizado.
    Plazo de Notificación: Debe solicitarse dentro de las primeras 24 horas de la hospitalización.`,
        category: "Negocios",
        moreinfo: `19. Sustitución de Ejecutivos:
En caso de internación de un CONTRATANTE en viaje de negocios por una emergencia médica grave que le impida proseguir con su cometido profesional, INTERASSIST reembolsará el pasaje en clase turista de la persona que su empresa designe como sustituto, siempre que esté especificado en el CERTIFICADO o VOUCHER.`
    },
    {
        id: 16,
        title: "Línea de Consulta",
        info: `Servicios Ofrecidos: Información sobre hoteles, clima, moneda, consulados, embajadas, medicamentos, etc.
    Disponibilidad: 24 horas, 365 días del año.`,
        category: "Consultas",
        moreinfo: `21. Línea de Consulta:
Antes o durante el viaje, el CONTRATANTE puede solicitar a INTERASSIST información sobre hoteles, clima, moneda, consulados, embajadas, medicación equivalente, etc. La central de operaciones de INTERASSIST estará disponible 24 horas al día, 365 días al año.`
    },
    {
        id: 17,
        title: "Transferencia de Fondos",
        info: `Emergencias: Se permite la transferencia de fondos en casos de emergencia, hasta el límite especificado en el certificado o voucher.
    Condición: Interassist cubre solo el costo de la transferencia; el contratante debe aportar los fondos.`,
        category: "Asistencia Legal",
        moreinfo: `25. Transferencia de Fondos:
En caso de emergencia justificada, el CONTRATANTE puede solicitar una transferencia de fondos hasta el límite establecido en el CERTIFICADO o VOUCHER. INTERASSIST solo cubrirá el costo de la transferencia; el contratante deberá aportar los fondos.

`
    },
    {
        id: 18,
        title: "Asistencia en Cruceros",
        info: `Cobertura: Asistencia médica y tratamiento por enfermedades o accidentes ocurridos a bordo.
    Exclusiones: No cubre enfermedades preexistentes o procedimientos electivos.`,
        category: "Cruceros",
        moreinfo: `33. Asistencia Médica en Cruceros:
En caso de enfermedad o accidente durante un crucero, INTERASSIST brindará asistencia médica de urgencia. Las condiciones y límites de las coberturas son las mismas que para la asistencia médica terrestre, pero con las restricciones impuestas por el entorno marítimo.`
    },
    {
        id: 19,
        title: "Asistencia a Embarazadas",
        info: `Cobertura: Se cubren emergencias médicas relacionadas con el embarazo hasta la semana 24.
    Exclusiones: No se cubren partos o complicaciones después de la semana 24 de gestación.`,
        category: "Asistencia Médica",
        moreinfo: `34. Asistencia a Embarazadas:
Se cubren emergencias relacionadas con el embarazo hasta la semana 24 de gestación. No se cubren partos o complicaciones posteriores a esta semana.`
    },
    {
        id: 20,
        title: "Seguro por Muerte Accidental en Transporte Público",
        info: `Cobertura: En caso de muerte accidental en transporte público durante el viaje, Interassist paga el monto estipulado en el certificado o voucher.`,
        category: "Seguro",
        moreinfo: `28. Seguro por Muerte Accidental en Transporte Público:
Si el CONTRATANTE fallece debido a un accidente ocurrido en transporte público durante el viaje, INTERASSIST pagará la suma estipulada en el CERTIFICADO o VOUCHER.`
    },
    {
        id: 21,
        title: "Franquicia y Deducibles",
        info: `Franquicia: Es la parte de los gastos a cargo del contratante antes de que Interassist asuma los costos.
    Franquicia Kilométrica: En algunos casos, los servicios no se prestarán dentro de un radio de 100 km del domicilio del contratante.`,
        category: "Franquicia",
        moreinfo: `36. Franquicia y Deducibles:
En algunos productos, la cobertura puede estar sujeta a una franquicia o deducible, según lo indicado en el CERTIFICADO o VOUCHER. Esta franquicia es el monto que el CONTRATANTE deberá cubrir antes de que INTERASSIST se haga cargo de los gastos.
Además, en ciertos casos, la cobertura está sujeta a una franquicia de distancia mínima, es decir, no se prestarán servicios dentro de un radio de 100 km del domicilio del CONTRATANTE.`
    },
    {
        id: 22,
        title: "Reembolso por Cancelación o Interrupción de Viaje",
        info: `Cobertura: Reembolso por gastos no reembolsables cuando el viaje debe ser cancelado o interrumpido por enfermedad grave, accidente o fallecimiento.
    Condiciones: Se requiere notificación previa a la central de asistencia y documentación justificativa.`,
        category: "Reembolsos",
        moreinfo: `35. Reembolso por Cancelación o Interrupción de Viaje:
Si el CONTRATANTE se ve obligado a cancelar o interrumpir su viaje debido a enfermedad grave, accidente o fallecimiento de un familiar directo, INTERASSIST reembolsará los gastos no reembolsables, siempre que se notifique previamente a la Central de Asistencia y se presente la documentación justificativa.`
    },
    {
        id: 23,
        title: "Gastos por Vuelo Demorado o Cancelado",
        info: `Cobertura: Reembolso por gastos adicionales en caso de vuelo demorado o cancelado, siempre que esté especificado en el certificado o voucher.
    Condiciones: Solo válido para vuelos internacionales.`,
        category: "Vuelos",
        moreinfo: `26. Compensación por Vuelo Demorado o Cancelado:
En caso de que un vuelo sea demorado o cancelado, INTERASSIST reembolsará los gastos adicionales en los que incurra el CONTRATANTE por alojamiento, comidas y transporte, hasta el límite estipulado en el CERTIFICADO o VOUCHER, siempre que la demora supere las 6 horas.
Esta compensación aplica únicamente a vuelos internacionales.`
    },
    {
        id: 24,
        title: "Subrogación",
        info: `Definición: Si Interassist cubre gastos que deberían haber sido asumidos por un tercero, adquiere el derecho de subrogarse en las acciones del contratante contra dicho tercero.`,
        category: "Asistencia Legal",
        moreinfo: `30. Subrogación:
Si INTERASSIST cubre gastos que deberían haber sido asumidos por un tercero, adquiere el derecho de subrogarse en las acciones del CONTRATANTE contra dicho tercero, hasta el monto de los gastos incurridos. El CONTRATANTE se compromete a colaborar con INTERASSIST para llevar a cabo esta subrogación.`
    },
    {
        id: 25,
        title: "Circunstancias Excepcionales",
        info: `Exclusión de responsabilidad: Interassist no será responsable por incumplimientos debido a eventos de fuerza mayor, como guerras, actos de terrorismo, pandemias, etc.`,
        category: "Exclusiones",
        moreinfo: `38. Exclusión por Circunstancias Excepcionales:
INTERASSIST no será responsable por incumplimientos o retrasos en la prestación de los servicios cuando estos se deban a eventos de fuerza mayor, tales como guerras, actos de terrorismo, pandemias, desastres naturales, huelgas, o cualquier otra circunstancia ajena al control razonable de INTERASSIST.`
    },
    {
        id: 26,
        title: "Requisitos para la Emisión de Nuevos Certificados",
        info: `Condiciones: Cualquier solicitud de emisión de nuevos certificados o vouchers deberá cumplir con los procedimientos establecidos y notificados a Interassist antes del viaje.`,
        category: "Certificados",
        moreinfo: `40. Requisitos para la Emisión de Nuevos Certificados o Vouchers:
Cualquier solicitud de emisión de nuevos certificados o vouchers deberá cumplir con los procedimientos establecidos por INTERASSIST, y deberá ser notificada antes del inicio de la vigencia del servicio. La emisión de nuevos certificados puede estar sujeta a costos administrativos adicionales.`
    },
    {
        id: 27,
        title: "Servicios No Acumulativos",
        info: `Regla: Los servicios ofrecidos por Interassist no son acumulativos, es decir, no se pueden acumular coberturas de diferentes productos o servicios contratados.`,
        category: "Servicios",
        moreinfo: `41. Servicios No Acumulativos:
Los servicios ofrecidos por INTERASSIST no son acumulativos. Si el CONTRATANTE contrata varios productos o servicios que incluyen coberturas similares, los límites de cada uno no se acumulan, aplicándose solo el límite mayor de los productos contratados.`
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
        moreinfo: `37.1: No se cubren enfermedades preexistentes, tratamientos estéticos, o cualquier gasto relacionado con la participación en deportes extremos o peligrosos.
37.2: No se cubrirán daños a equipajes causados por fenómenos naturales, acciones bélicas, o retenciones aduaneras.`
    },
    {
        id: 29,
        title: "Reembolsos y Procedimientos",
        info: `Plazo para Reembolsos: Hasta 60 días después de la recepción de la documentación completa.
    Requisitos: Presentar la documentación original y el comprobante de pago de la aerolínea o empresa de transporte.`,
        category: "Reembolsos",
        moreinfo: `42. Procedimientos para Reembolsos:
El CONTRATANTE deberá presentar todas las facturas originales, informes médicos y demás documentación que se le solicite para poder procesar el reembolso. Los gastos solo serán reembolsados si han sido previamente autorizados por la Central de Asistencia y si no violan las exclusiones generales.`
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
        moreinfo: `Módulo COVID-19:
Este módulo aplica únicamente si el producto contratado lo incluye. Cubre asistencia médica en caso de diagnóstico positivo de COVID-19 durante el viaje, siempre que se trate de una emergencia médica. Los gastos cubiertos se limitan a los detallados en el CERTIFICADO o VOUCHER, y pueden incluir la repatriación sanitaria en caso de complicaciones graves.

Exclusiones:

No cubre gastos por cuarentena preventiva, pruebas diagnósticas o aislamiento por contacto estrecho.
No se cubren tratamientos relacionados con secuelas a largo plazo del COVID-19.`
    },
    {
        id: 31,
        title: "Requisitos para Nuevos Certificados o Vouchers",
        info: `Costos: Emisión de nuevos certificados o vouchers conlleva un costo administrativo de $15 USD.
    Modificaciones y Cancelaciones: Cualquier solicitud de cancelación o modificación debe hacerse antes del inicio de la vigencia.`,
        category: "Certificados",
        moreinfo: `Emisión de Nuevos Certificados o Vouchers:
Cualquier solicitud de emisión de nuevos certificados o vouchers debe realizarse antes del inicio de la vigencia del servicio, y está sujeta a los procedimientos establecidos por INTERASSIST. La emisión de nuevos certificados puede estar sujeta a un costo administrativo adicional de $15 USD. Las solicitudes de modificación o cancelación deben ser notificadas antes del inicio del viaje, y cualquier cambio fuera de plazo puede no ser aceptado por INTERASSIST.`
    },
    {
        id: 32,
        title: "Ley Aplicable y Jurisdicción",
        info: `Jurisdicción: Los conflictos derivados del contrato se resolverán bajo la ley argentina.
    Prescripción: Los reclamos relacionados con los servicios prestados prescriben después de 1 año desde el evento.`,
        category: "Legales",
        moreinfo: `Ley Aplicable y Jurisdicción:
Todas las controversias que surjan en relación con los servicios prestados por INTERASSIST se regirán por la ley argentina, y cualquier conflicto será resuelto en los tribunales competentes de la Ciudad Autónoma de Buenos Aires, renunciando expresamente a cualquier otro fuero que pudiera corresponder.`
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
        moreinfo: `Servicios Adicionales:
Dependiendo del producto contratado, INTERASSIST puede ofrecer servicios opcionales como:

Información turística.
Transmisión de mensajes urgentes.
Localización de equipaje perdido.
Estos servicios no son acumulativos y se aplican según los límites establecidos en el CERTIFICADO o VOUCHER.`
    },
    {
        id: 34,
        title: "Reserva de Derechos",
        info: `Derechos de Interassist: La empresa se reserva el derecho de modificar los términos y condiciones del servicio en cualquier momento.
    Vigencia: Las modificaciones se aplican a los nuevos certificados emitidos tras cualquier cambio.`,
        category: "Legales",
        moreinfo: `Reserva de Derechos:
INTERASSIST se reserva el derecho de modificar los términos y condiciones del servicio en cualquier momento, con previo aviso al CONTRATANTE. Las modificaciones se aplicarán únicamente a los nuevos certificados emitidos tras cualquier cambio.`
    },
    {
        id: 35,
        title: "Constancia y Certificados",
        info: `Documentación: El certificado o voucher es el único documento válido para solicitar asistencia durante el viaje.
    Responsabilidad del Contratante: El contratante es responsable de la veracidad de la información proporcionada al adquirir el servicio.`,
        category: "Certificados",
        moreinfo: `Certificados y Constancia del Servicio:
El CERTIFICADO o VOUCHER emitido por INTERASSIST es el único documento válido para acceder a los servicios durante el viaje. El CONTRATANTE debe asegurarse de portar este documento durante todo el viaje, ya que será necesario para solicitar cualquier asistencia.

`
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
        moreinfo: `Indemnización por Pérdida de Equipaje:
INTERASSIST ofrece una indemnización complementaria a la proporcionada por la aerolínea, con un límite de $40 USD por kilogramo en vuelos internacionales y $20 USD por kilogramo en vuelos nacionales, siempre que el CONTRATANTE presente el formulario P.I.R. (Property Irregularity Report).`
    },
    {
        id: 37,
        title: "Procedimiento en Caso de Pérdida de Equipaje",
        info: `Pasos a Seguir:
    - El contratante debe dirigirse a la aerolínea o empresa de transporte en el aeropuerto o puerto y completar el formulario P.I.R.
    - Notificar a la Central de Asistencia de Interassist dentro de las primeras 24 horas.
    - Al regresar al país de origen, se debe presentar el formulario P.I.R., el certificado o voucher, y el comprobante de indemnización de la aerolínea.`,
        category: "Equipaje",
        moreinfo: `Compensación por Demora en la Entrega de Equipaje:
En caso de demora en la entrega del equipaje, INTERASSIST reembolsará los gastos incurridos en la compra de artículos de primera necesidad, con límites establecidos en el CERTIFICADO o VOUCHER. Esta compensación no es válida para vuelos de regreso al país de origen.

`
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
        moreinfo: `Subrogación:
Si INTERASSIST cubre gastos que deberían haber sido asumidos por un tercero (como una aerolínea o una aseguradora), INTERASSIST adquiere el derecho de subrogarse en las acciones del CONTRATANTE contra dicho tercero, hasta el monto cubierto. El CONTRATANTE se compromete a colaborar con INTERASSIST en cualquier procedimiento necesario para ejercer este derecho.`
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
            <div className="flex flex-col sm:flex-row justify-between items-center w-full">
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
            <div className="grid grid-cols-1 gap- sm:grid-cols-2 lg:grid-cols-3 mt-6">
                {filteredCards.length > 0 ? (
                    filteredCards.map((card) => (
                        <FlipCard key={card.id} title={card.title} info={card.info} category={card.category} moreinfo={card.moreinfo} />
                    ))
                ) : (
                    <p className="text-gray-500">No se encontraron resultados.</p>
                )}
            </div>
        </section>
    );
};

export default SearchAndCards;