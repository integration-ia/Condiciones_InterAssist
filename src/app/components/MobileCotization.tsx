"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Trash2 } from "lucide-react";
import { calculateQuotes } from "../components/utils/calculateQuotes"; // Importa la función de cálculo
import AirlineTicket from "./AirlineTicket";
import ciudades from "../data/ciudades.json";
import { QuoteData, Quote, TravelDetails } from '../types'; // Importa los tipos necesarios
import Image from "next/image";

type FormValues = {
  email: string;
  celular: string;
  tipoAsistencia: string;
  destino: string;
  fechasViaje: [Date | undefined, Date | undefined];
  pasajeros: { edad: string }[];
};

export default function MobileCotization() {
  const [dateRange, setDateRange] = useState<[Date | undefined, Date | undefined]>([
    undefined,
    undefined,
  ]);
  const [startDate, endDate] = dateRange;
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [showQuote, setShowQuote] = useState(false); // Estado para mostrar formulario o cotización
  const [quoteData, setQuoteData] = useState<QuoteData | null>(null); // Inicialmente es `null`

  const form = useForm<FormValues>({
    defaultValues: {
      email: "",
      celular: "",
      tipoAsistencia: "",
      destino: "",
      fechasViaje: [undefined, undefined],
      pasajeros: [{ edad: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "pasajeros",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    // Filtra las ciudades según el input
    if (value.length > 0) {
      const filteredCities = ciudades.filter((city) =>
        city.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filteredCities);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city: string) => {
    setQuery(city); // Llena el input con la ciudad seleccionada
    setSuggestions([]); // Vacía las sugerencias
    form.setValue("destino", city); // Actualiza el valor en el formulario
  };

  const onSubmit = (data: FormValues) => {
    // Procesa los datos del formulario y calcula la cotización
    const passengers = data.pasajeros.length;
    const ages = data.pasajeros.map((p) => parseInt(p.edad, 10));
    const destination = data.destino;
    const duration =
      startDate && endDate
        ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
        : 0;

    const travelDetails: TravelDetails = {
      passengers,
      ages,
      destination,
      duration,
    };

    const quotes: Quote[] = calculateQuotes(travelDetails);

    setQuoteData({
      quotes,
      travelDetails,
    });

    setShowQuote(true); // Muestra el componente de cotización
  };

  return (
    <div className="ml-auto flex items-center min-h-screen bg-transparent p-4 lg:flex-row flex-col lg:justify-end lg:mr-[calc(9vw)] mt-16">
      {/* Escala el componente al 87% */}
      <div className="relative w-[375px] h-[812px] bg-white rounded-[50px] shadow-xl overflow-hidden border-8 border-gray-800 transform scale-[.87] origin-center lg:mr-4">
        {/* Barra superior estilo iPhone */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-800 rounded-b-2xl shadow-xl"></div>

        {/* Área principal de contenido */}
        <div className="p-6 overflow-y-auto custom-scrollbar h-full flex flex-col justify-between bg-white">
          {showQuote && quoteData ? (
            // Componente que muestra la cotización
            <QuoteDisplay quoteData={quoteData} />
          ) : (
            <>
              <h5 className="text-2xl font-bold mb-4 mt-6 text-center text-black">
                Cotizador de Viaje
              </h5>
              <form className="space-y-4 text-gray-600" onSubmit={form.handleSubmit(onSubmit)}>
                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Email
                  </label>
                  <input
                    {...form.register("email", { required: true })}
                    className="w-full px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:border-indigo-500"
                    placeholder="tu@email.com"
                    type="email"
                  />
                </div>

                {/* Celular */}
                <div className="space-y-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Celular
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <Image
                        src="https://flagcdn.com/w40/ar.png"
                        alt="Argentina"
                        width={40} // Define el ancho de la imagen
                        height={24} // Define la altura de la imagen, acorde con el ancho
                        className="w-6 h-4" // Aplica tus clases de Tailwind si son necesarias
                      />
                      <span className="ml-2 text-gray-500">+54</span>
                    </span>
                    <input
                      {...form.register("celular", { required: true })}
                      className="w-full pl-20 px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:border-indigo-500 placeholder:text-base"
                      placeholder="1234567890"
                      type="tel"
                    />
                  </div>
                </div>

                {/* Tipo de Asistencia */}
                <div className="space-y-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Tipo de Asistencia
                  </label>
                  <select
                    {...form.register("tipoAsistencia", { required: true })}
                    className="w-full px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:border-indigo-500"
                  >
                    <option value="Inter60">Inter 60</option>
                    <option value="Inter100">Inter 100</option>
                    <option value="Inter200">Inter 200</option>
                  </select>
                </div>

                {/* Destino con autocompletado */}
                <div className="space-y-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Destino
                  </label>
                  <div className="relative">
                    <input
                      {...form.register("destino", { required: true })}
                      value={query}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:border-indigo-500"
                      placeholder="País o ciudad de destino"
                      type="text"
                    />
                    {suggestions.length > 0 && (
                      <ul className="absolute z-10 border rounded-lg bg-white w-full shadow-sm max-h-40 overflow-y-auto">
                        {suggestions.map((city, index) => (
                          <li
                            key={index}
                            className="p-2 cursor-pointer hover:bg-gray-200"
                            onClick={() => handleSuggestionClick(city)}
                          >
                            {city}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>

                {/* Selección de fecha (rango de fechas) */}
                <div className="space-y-2">
                  <label className="block text-gray-700 text-sm font-bold mb-1">
                    Fechas de Viaje
                  </label>
                  <DatePicker
                    selected={startDate}
                    onChange={(dates) => {
                      const [start, end] = (dates as [Date | null, Date | null]) || [
                        undefined,
                        undefined,
                      ];
                      setDateRange([start ?? undefined, end ?? undefined]);
                    }}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    className="w-full px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:border-indigo-500"
                    placeholderText="Selecciona las fechas de viaje"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>

                {/* Pasajeros */}
                <div>
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-4">
                      <div className="space-y-2 flex-1">
                        <label className="block text-gray-700 text-sm font-bold mb-1">
                          Pasajero {index + 1}
                        </label>
                        <input
                          {...form.register(`pasajeros.${index}.edad`, {
                            required: true,
                          })}
                          className="w-full px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:border-indigo-500"
                          placeholder="Edad"
                          type="number"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700 mt-7"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}

                  {/* Agregar pasajero */}
                  <button
                    type="button"
                    onClick={() => append({ edad: "" })}
                    className="w-full mt-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300"
                  >
                    + Agregar Pasajero
                  </button>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-3/4 mt-6 py-2 bg-gradient-to-r from-green-500 to-white text-gray-800 font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-white focus:outline-none"
                  >
                    Cotizar
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function QuoteDisplay({ quoteData }: { quoteData: QuoteData }) {
  const { quotes, travelDetails } = quoteData;
  const [selectedPlan, setSelectedPlan] = useState<string>(''); // Estado para el plan seleccionado

  const handleSelectPlan = (plan: string) => {
    setSelectedPlan(plan);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-xl font-bold mb-5 mt-6 text-center text-black">
        Selecciona una asistencia
      </h3>
      {quotes.map((quote: Quote, index: number) => (
        <AirlineTicket
          key={index}
          plan={quote.plan}
          price={quote.price}
          destination={travelDetails.destination}
          duration={travelDetails.duration}
          passengers={travelDetails.passengers}
          onClick={() => handleSelectPlan(quote.plan)}
          isSelected={selectedPlan === quote.plan}
        />
      ))}
      {selectedPlan && (
        <div className="mt-3 text-center">
          <p className="text-m text-gray-600 mb-5">
            Has seleccionado el plan: <strong>{selectedPlan}</strong>
          </p>
          <button
            className="mt-2 py-1.5 px-4 bg-green-500 text-white rounded-lg text-sm"
            onClick={() => {
              // Aquí puedes manejar la acción después de seleccionar un plan
              alert(`Has confirmado el plan: ${selectedPlan}`);
            }}
          >
            Confirmar Selección
          </button>
        </div>
      )}
      <button
        className="mt-3 py-1.5 px-4 bg-gray-500 text-white rounded-lg text-sm"
        onClick={() => window.location.reload()} // O implementar una mejor forma de regresar
      >
        Nueva Cotización
      </button>
    </div>
  );
}
