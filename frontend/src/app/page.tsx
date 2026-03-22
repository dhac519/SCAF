import Link from 'next/link';
import { Wallet, PieChart, ReceiptText, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Header */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white px-2 py-1 rounded-lg font-bold text-xl leading-none shadow-sm">
              SCAF
            </div>
            <span className="text-slate-900 font-semibold text-lg hidden sm:block ml-1">
              Control Financiero
            </span>
          </div>
          
          <nav className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-slate-600 hover:text-blue-600 font-medium transition-colors"
            >
              Ingresar
            </Link>
            <Link 
              href="/register" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm"
            >
              Registrarse
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">
              <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
              Gestión Financiera Exclusiva
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Control Financiero <span className="text-blue-600">Inteligente</span> para tu Institución
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0">
              SCAF simplifica la gestión de cobros, monitoreo de morosidad, facturación y reportes contables en un solo lugar seguro, moderno y accesible en tiempo real.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Link 
                href="/login" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:-translate-y-0.5"
              >
                Acceder al Sistema
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="#caracteristicas" 
                className="w-full sm:w-auto flex items-center justify-center px-8 py-4 rounded-xl font-medium text-slate-700 hover:bg-slate-100 transition-colors"
              >
                Conocer más
              </Link>
            </div>
          </div>
          
          {/* Hero Visual placeholder / mock up */}
          <div className="flex-1 w-full relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-3xl transform rotate-3 scale-105 -z-10"></div>
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-[400px]">
              <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="flex-1 p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="h-6 w-32 bg-slate-100 rounded-md"></div>
                  <div className="h-8 w-8 bg-blue-50 rounded-full"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-24 bg-slate-50 rounded-xl border border-slate-100 p-4">
                    <div className="h-4 w-16 bg-slate-200 rounded mb-2"></div>
                    <div className="h-8 w-24 bg-slate-300 rounded"></div>
                  </div>
                  <div className="h-24 bg-slate-50 rounded-xl border border-slate-100 p-4">
                    <div className="h-4 w-16 bg-slate-200 rounded mb-2"></div>
                    <div className="h-8 w-24 bg-blue-200 rounded"></div>
                  </div>
                </div>
                <div className="flex-1 bg-slate-50 rounded-xl border border-slate-100 mt-2 p-4">
                  <div className="h-full w-full border-b-2 border-dashed border-slate-200 flex items-end justify-between px-4 pb-4">
                    <div className="w-8 bg-blue-200 h-1/3 rounded-t-sm"></div>
                    <div className="w-8 bg-blue-300 h-1/2 rounded-t-sm"></div>
                    <div className="w-8 bg-blue-400 h-3/4 rounded-t-sm"></div>
                    <div className="w-8 bg-blue-500 h-full rounded-t-sm"></div>
                    <div className="w-8 bg-blue-600 h-5/6 rounded-t-sm"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="caracteristicas" className="w-full bg-white py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Herramientas enfocadas en tus finanzas</h2>
              <p className="text-lg text-slate-600">
                Todo lo que necesitas para que la contabilidad e ingresos de tu institución estén siempre bajo control, automatizados y libres de errores.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
                  <Wallet className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Control de Pagos</h3>
                <p className="text-slate-600 leading-relaxed">
                  Seguimiento automatizado de los cobros y pensiones. Identifica rápidamente retrasos y reduce la morosidad con alertas automáticas.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow text-slate-900">
                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 text-indigo-600">
                  <PieChart className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Reportes en Tiempo Real</h3>
                <p className="text-slate-600 leading-relaxed">
                  Genera balances, estados de cuenta y proyecciones de ingresos al instante. Exporta la información estructurada con un solo clic.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                  <ReceiptText className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Facturación Integrada</h3>
                <p className="text-slate-600 leading-relaxed">
                  Emite y registra comprobantes electrónicos válidos de manera rápida y segura por cada transacción procesada en el sistema.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} SCAF - Sistema de Control Académico y Financiero. Todos los derechos reservados.
        </div>
      </footer>
    </div>
  );
}
