import { useState } from 'react'

const DayCard = ({ day, isUnlocked, isOpened, onClick }) => {
  const [isFlipping, setIsFlipping] = useState(false)

  const handleClick = () => {
    if (!isUnlocked || isOpened) return
    
    setIsFlipping(true)
    setTimeout(() => {
      setIsFlipping(false)
      onClick()
    }, 300)
  }

  return (
    <div
      className={`relative w-full aspect-square cursor-pointer ${
        isUnlocked && !isOpened ? 'hover:scale-105 hover:-translate-y-2' : ''
      } transition-all duration-300`}
      onClick={handleClick}
      style={{ perspective: '1000px' }}
    >
      {/* 3D Kutu Efekti için Container */}
      <div
        className={`relative w-full h-full rounded-2xl transition-all duration-300 ${
          isFlipping ? 'animate-flip' : ''
        } ${
          isUnlocked && !isOpened
            ? 'shadow-2xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
            : isOpened
            ? 'shadow-xl'
            : 'shadow-md opacity-70'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Ana Kutu */}
        <div
          className={`relative w-full h-full rounded-2xl border-2 transition-all duration-300 ${
            isUnlocked
              ? isOpened
                ? 'bg-gradient-to-br from-emerald-500 via-green-500 to-emerald-600 border-emerald-400'
                : 'bg-gradient-to-br from-rose-500 via-red-500 to-rose-600 border-rose-400 hover:border-rose-300'
              : 'bg-gradient-to-br from-slate-300 via-gray-400 to-slate-500 border-slate-400 cursor-not-allowed'
          }`}
        >
          {/* Işıltı efekti */}
          {isUnlocked && !isOpened && (
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>
          )}

          {/* İçerik */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
            {isUnlocked ? (
              <>
                <div className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-2">
                  {day}
                </div>
                {isOpened ? (
                  <div className="flex items-center gap-2 text-white">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-semibold">Açıldı</span>
                  </div>
                ) : (
                  <div className="text-xs md:text-sm font-medium text-white/90 drop-shadow">
                    Tıkla
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="text-5xl md:text-6xl font-extrabold text-slate-600 mb-2">
                  {day}
                </div>
                <div className="flex items-center gap-1 text-slate-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-xs font-medium">Kilitli</span>
                </div>
              </>
            )}
          </div>

          {/* Kilitli overlay */}
          {!isUnlocked && (
            <div className="absolute inset-0 bg-black/30 rounded-2xl backdrop-blur-sm"></div>
          )}
        </div>

        {/* 3D derinlik efekti için alt gölge */}
        <div
          className={`absolute -bottom-2 left-2 right-2 h-2 rounded-2xl blur-md transition-all duration-300 ${
            isUnlocked
              ? isOpened
                ? 'bg-emerald-600/50'
                : 'bg-rose-600/50'
              : 'bg-slate-600/30'
          }`}
          style={{ transform: 'translateZ(-20px)' }}
        ></div>
      </div>
    </div>
  )
}

export default DayCard

