import {
    Facebook,
    Linkedin,
    MessageCircle,
    Send,
    Twitter,
} from "lucide-react"

import Image from "next/image";
import Link from "next/link"; // Asegúrate de tener el Link de Next.js

export default function Component() {
    return (
        <footer className="bg-gradient-to-br from-green-800 to-green-950 text-white">
            {/* Top section with darker background */}
            <div className="bg-black/20 py-6 sm:py-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-2">

                            <Link href="/">
                                <Image
                                    src="/images/Horizontal_blanco.png" // Asegúrate de que el logo esté en esta ruta
                                    alt="Alltools Logo"
                                    width={160} // Ajusta el ancho para que sea más pequeña
                                    height={90}  // Ajusta la altura en proporción
                                    className="w-auto h-auto" // Clases de Tailwind opcionales si necesitas más control
                                />
                            </Link>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                            <a href="#" className="hover:text-green-300 transition-colors">
                                <Twitter className="h-5 w-5 sm:h-6 sm:w-6" />
                                <span className="sr-only">Twitter</span>
                            </a>
                            <a href="#" className="hover:text-green-300 transition-colors">
                                <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
                                <span className="sr-only">Discord</span>
                            </a>
                            <a href="#" className="hover:text-green-300 transition-colors">
                                <Send className="h-5 w-5 sm:h-6 sm:w-6" />
                                <span className="sr-only">Telegram</span>
                            </a>
                            <a href="#" className="hover:text-green-300 transition-colors">
                                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <a href="#" className="hover:text-green-300 transition-colors">
                                <Facebook className="h-5 w-5 sm:h-6 sm:w-6" />
                                <span className="sr-only">Facebook</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main footer content */}
            <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
                    <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-green-300">Services</h3>
                        <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                            <li><a href="#" className="hover:text-green-300 transition-colors">Staking</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Hardware</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Monitoring</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Status</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Endpoints</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-green-300">Resources</h3>
                        <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                            <li><a href="#" className="hover:text-green-300 transition-colors">Pricing</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Listings</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Reports</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">API</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">FAQ</a></li>
                        </ul>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-green-300">Company</h3>
                        <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                            <li><a href="#" className="hover:text-green-300 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Newsroom</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">About us</a></li>
                            <li><a href="#" className="hover:text-green-300 transition-colors">Assets</a></li>
                        </ul>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-green-300">Alltools Inc.</h3>
                        <address className="not-italic space-y-2 sm:space-y-3 text-sm sm:text-base">
                            <p>12546 Hopeful St.</p>
                            <p>LA, CA 34543</p>
                            <p>+1 (345) 432 4332</p>
                        </address>
                    </div>
                </div>
            </div>
        </footer>
    )
}