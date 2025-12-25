import { useEffect } from 'react'

const RevealModal = ({ isOpen, onClose, reward }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !reward) return null

  const renderContent = () => {
    switch (reward.type) {
      case 'text':
        return (
          <div className="text-center py-4">
            <div className="bg-gradient-to-br from-rose-50 to-emerald-50 rounded-2xl p-8 border-2 border-rose-100 shadow-inner">
              <p className="text-xl md:text-2xl font-bold text-gray-800 leading-relaxed">
                {reward.content}
              </p>
            </div>
          </div>
        )
      case 'image':
        return (
          <div className="text-center py-4">
            <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200 shadow-inner">
              <img
                src={reward.content}
                alt="Ödül"
                className="max-w-full max-h-96 mx-auto rounded-xl shadow-lg"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%236b7280" font-family="sans-serif" font-size="20" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EResim bulunamadı%3C/text%3E%3C/svg%3E'
                }}
              />
            </div>
          </div>
        )
      case 'terminal':
        return (
          <div className="text-center py-4">
            <div className="bg-gray-900 rounded-2xl p-6 font-mono text-left max-w-lg mx-auto shadow-2xl border-2 border-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400 font-bold">$</span>
                <span className="text-green-400 text-sm md:text-base">{reward.content}</span>
              </div>
              <div className="mt-2 text-gray-500 text-xs">
                Terminal komutunu çalıştırmak için terminalinizi açın
              </div>
            </div>
          </div>
        )
      case 'game':
        return (
          <div className="text-center py-4">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200 shadow-inner">
              <div className="text-4xl mb-4">🎮</div>
              <p className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                Mini Oyun: {reward.content}
              </p>
              <p className="text-gray-600 text-base">
                Oyun yeri tutucu - {reward.content} burada uygulanacak!
              </p>
            </div>
          </div>
        )
      default:
        return (
          <div className="text-center py-4">
            <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
              <p className="text-xl text-gray-800">{reward.content}</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden animate-fade-in border-2 border-white/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 p-5 md:p-6 rounded-t-3xl flex justify-between items-center shadow-lg z-10 border-b-2 border-white/20">
          <h2 className="text-xl md:text-2xl font-extrabold text-white drop-shadow-lg">
            {reward.day}. Gün Sürprizi! 💕
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 hover:bg-white/20 transition-all duration-200 rounded-full w-8 h-8 flex items-center justify-center text-2xl font-bold"
          >
            ×
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 md:p-8 max-h-[calc(90vh-180px)] overflow-y-auto">
          {renderContent()}
        </div>
        
        {/* Footer */}
        <div className="p-5 md:p-6 border-t-2 border-gray-200/50 bg-gray-50/50 flex justify-end rounded-b-3xl">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white rounded-xl hover:shadow-xl hover:scale-105 transition-all duration-300 font-semibold text-base border-2 border-white/30"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  )
}

export default RevealModal

