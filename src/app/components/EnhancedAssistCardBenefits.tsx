"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plane, Umbrella, Hospital, Stethoscope, DollarSign, Check, X } from 'lucide-react'

const benefitsData = [
  {
    icon: Plane,
    title: "CONSULTA ODONTOLÓGICA EN ROMA",
    description: "Atención dental de emergencia durante tu viaje a Italia",
    cost: 470,
  },
  {
    icon: Umbrella,
    title: "INSOLACIÓN EN MIAMI",
    description: "Tratamiento médico por insolación severa en Florida",
    cost: 3500,
  },
  {
    icon: Hospital,
    title: "HOSPITALIZACIÓN EN RIO DE JANEIRO",
    description: "Cuidados hospitalarios tras un accidente en Brasil",
    cost: 35000,
  },
  {
    icon: Stethoscope,
    title: "10 DÍAS DE TERAPIA INTENSIVA EN CALIFORNIA",
    description: "Atención médica intensiva por complicaciones de salud en EE.UU.",
    cost: 250000,
  },
]

export default function EnhancedAssistCardBenefits() {
    const [activeIndex, setActiveIndex] = useState(0)
  
    return (
      <section className="relative py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4 max-w-[1440px]">
          <h2 className="text-4xl font-bold text-center mb-12 text-green-800">
            Descubre el Poder de viajar con Interassist
          </h2>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              {benefitsData.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div
                    className={`overflow-hidden transition-all duration-300 cursor-pointer ${
                      activeIndex === index
                        ? 'ring-2 ring-green-500 shadow-lg'
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <div className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 rounded-full bg-green-100">
                          <benefit.icon className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg mb-1 text-gray-600">
                            {benefit.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
  
            <div className="sticky top-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white shadow-xl border-2 border-green-500">
                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-4 text-green-800">
                        {benefitsData[activeIndex].title}
                      </h3>
                      <p className="text-gray-600 mb-6">
                        {benefitsData[activeIndex].description}
                      </p>
  
                      <div className="flex justify-center items-stretch mb-6 bg-green-100 p-4 rounded-lg">
                        <div className="flex flex-col items-center justify-between px-4">
                          <p className="text-sm text-green-700 mb-1 font-semibold">
                            Con InterAssist 
                          </p>
                          <p className="text-4xl font-bold text-green-600">$0</p>
                          <p className="text-xs text-green-600 mt-1">¡CUBIERTO!</p>
                        </div>
                        <DollarSign className="text-green-500 h-12 w-12 mx-4" />
                        <div className="flex flex-col items-center justify-between px-4">
                          <p className="text-sm text-red-700 mb-1 font-semibold">
                            Sin InterAssist 
                          </p>
                          <p className="text-4xl font-bold text-red-600">
                            ${benefitsData[activeIndex].cost.toLocaleString()}
                          </p>
                          <p className="text-xs text-red-600 mt-1">
                            GASTOS DE BOLSILLO
                          </p>
                        </div>
                      </div>
  
                      <div className="mt-6 space-y-4">
                        <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg">
                          <span className="font-semibold text-gray-600">Cobertura Inmediata</span>
                          <Check className="text-green-500 h-5 w-5" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg">
                          <span className="font-semibold text-gray-600">Sin Deducibles</span>
                          <Check className="text-green-500 h-5 w-5" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-100 rounded-lg">
                          <span className="font-semibold text-gray-600">Asistencia 24/7</span>
                          <Check className="text-green-500 h-5 w-5" />
                        </div>
                        <div className="flex items-center justify-between p-3 bg-red-100 rounded-lg">
                          <span className="font-semibold text-gray-600">Gastos de Bolsillo</span>
                          <X className="text-red-500 h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
  
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-green-800 text-white p-6 rounded-lg shadow-lg text-center"
          >
            <h3 className="text-xl font-bold mb-4">
              VIAJÁ MÁS TRANQUILO CON INTERASSIST 
            </h3>
            <p className="mb-4">
              Protégete contra imprevistos y disfruta de tu viaje sin preocupaciones.
            </p>
            <button className="bg-white hover:bg-green-100 text-green-800 font-bold px-8 py-2 rounded">
              Obtener InterAssist Ahora
            </button>
          </motion.div>
  
          <p className="text-sm text-gray-500 mt-8 text-center">
            Los valores expresados en dólares son estimados y pueden variar según la ubicación y la gravedad de la situación.
          </p>
        </div>
      </section>
    )
  }
