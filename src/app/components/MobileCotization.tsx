"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon, Trash2 } from "lucide-react";

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

  return (
    <div className="ml-auto flex items-center min-h-screen bg-transparent p-4 mr-60 m: mr-24">
      {/* iPhone-like container */}
      <div className="relative w-[375px] h-[812px] bg-white rounded-[50px] shadow-xl overflow-hidden border-8 border-gray-800">
        {/* iPhone-like top bar */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-800 rounded-b-2xl shadow-xl"></div>

        {/* Main content area */}
        <div className="p-6 overflow-y-auto custom-scrollbar h-full flex flex-col justify-between bg-white">
          <h5 className="text-2xl font-bold mb-4 mt-6 text-center text-black">
            Cotizador de Viaje
          </h5>
          <form className="space-y-4">
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
              <input
                {...form.register("celular", { required: true })}
                className="w-full px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:border-indigo-500"
                placeholder="+1234567890"
                type="tel"
              />
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
                <option value="basica">Básica</option>
                <option value="estandar">Estándar</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            {/* Destino con autocompletado */}
            <div className="space-y-2">
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Destino
              </label>
              <input
                {...form.register("destino", { required: true })}
                className="w-full px-4 py-2 border rounded-lg text-sm shadow-sm focus:outline-none focus:border-indigo-500"
                placeholder="País o ciudad de destino"
                type="text"
                list="ciudades"
              />
              <datalist id="ciudades">
                <option value="Buenos Aires" />
                <option value="Madrid" />
                <option value="París" />
                <option value="Nueva York" />
              </datalist>
            </div>

            {/* Selección de fecha (rango de fechas) */}
            <div className="space-y-2">
              <label className="block text-gray-700 text-sm font-bold mb-1">
                Fechas de Viaje
              </label>
              <DatePicker
                selected={startDate}
                onChange={(dates) => {
                  const [start, end] = (dates as [Date | null, Date | null]) || [undefined, undefined];
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
          </form>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-3/4 mt-6 py-2 bg-gradient-to-r from-green-500 to-white text-gray-800 font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-white focus:outline-none"
            >
              Cotizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
