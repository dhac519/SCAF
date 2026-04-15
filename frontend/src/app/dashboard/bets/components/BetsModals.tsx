import { Coins } from 'lucide-react';

export function BetsModals({
  showAddForm, setShowAddForm, handleSubmit, event, setEvent, stake, setStake, odds, setOdds,
  walletId, setWalletId, wallets, cashoutModalOpen, setCashoutModalOpen, cashoutStake,
  cashoutAmount, setCashoutAmount, confirmCashout, resolvingId, cashoutBetId,
  transferModalOpen, setTransferModalOpen, bettingWallet, handleTransfer, transferAmount, 
  setTransferAmount, transferTargetId, setTransferTargetId, generalWallets
}: any) {
  return (
    <>
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 animate-in slide-in-from-bottom-4 zoom-in-95">
            <h3 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">Registrar Apuesta</h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Evento / Partido</label>
                  <input type="text" required value={event} onChange={(e) => setEvent(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" placeholder="Ej: Real Madrid vs Barcelona" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Stake (Monto)</label>
                  <input type="number" step="0.01" required value={stake} onChange={(e) => setStake(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" placeholder="0.00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Cuota (Odds)</label>
                  <input type="number" step="0.01" required value={odds} onChange={(e) => setOdds(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" placeholder="1.85" />
                </div>
                <div className="lg:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Billetera de Descuento (Opcional)</label>
                  <select value={walletId} onChange={(e) => setWalletId(e.target.value)} className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none transition-all">
                    <option value="">No descontar (Solo registro)</option>
                    {wallets.map((w: any) => (
                      <option key={w.id} value={w.id}>{w.name} (S/ {w.balance})</option>
                    ))}
                  </select>
                </div>
                <div className="col-span-full flex justify-end gap-3 mt-4">
                  <button type="button" onClick={() => setShowAddForm(false)} className="px-6 py-3 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancelar</button>
                  <button type="submit" className="px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 shadow-md shadow-purple-600/20 transition-all">Guardar</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {cashoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 animate-in slide-in-from-bottom-4 zoom-in-95">
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Procesar Cashout</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              ¿Cuánto dinero OBTIENES en total al hacer Cashout?<br />
              Tu stake inicial fue de <b>S/ {Number(cashoutStake).toFixed(2)}</b>.
            </p>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Monto de Retiro</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">S/</span>
                <input
                  type="number"
                  step="0.01"
                  value={cashoutAmount}
                  onChange={(e) => setCashoutAmount(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="0.00"
                  autoFocus
                />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={() => setCashoutModalOpen(false)} className="px-5 py-2.5 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancelar</button>
              <button
                disabled={resolvingId === cashoutBetId}
                onClick={confirmCashout}
                className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all flex items-center gap-2"
              >
                <Coins className="w-4 h-4" />
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {transferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 animate-in slide-in-from-bottom-4 zoom-in-95">
            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">Transferir a Cartera</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              Mueve fondos desde tu cuenta de apuestas hacia tus carteras.<br />
              Disponible: <b>S/ {Number(bettingWallet?.balance || 0).toFixed(2)}</b>
            </p>
            <form onSubmit={handleTransfer}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Monto a Transferir</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-medium">S/</span>
                  <input
                    type="number"
                    step="0.01"
                    max={Number(bettingWallet?.balance || 0)}
                    required
                    value={transferAmount}
                    onChange={(e) => setTransferAmount(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    placeholder="0.00"
                    autoFocus
                  />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Cartera Destino</label>
                <select 
                  required
                  value={transferTargetId} 
                  onChange={(e) => setTransferTargetId(e.target.value)} 
                  className="w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                >
                  <option value="">Selecciona una cartera</option>
                  {generalWallets.map((w: any) => (
                    <option key={w.id} value={w.id}>{w.name} (S/ {w.balance})</option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setTransferModalOpen(false)} className="px-5 py-2.5 font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">Cancelar</button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-md shadow-blue-600/20 transition-all flex items-center gap-2"
                >
                  Transferir
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
