import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import DayCard from '../components/DayCard'
import RevealModal from '../components/RevealModal'
import Confetti from '../components/Confetti'
import Snow from '../components/Snow'
import { doorsData } from '../data/doors.js'

// Puzzle için örnek görsel (Yılbaşı temalı)
const PUZZLE_IMAGE_URL = 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2000&auto=format&fit=crop'

const CalendarPage = () => {
  const navigate = useNavigate()
  const [openedDays, setOpenedDays] = useState([])
  const [selectedReward, setSelectedReward] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Puzzle State
  const [puzzleImage, setPuzzleImage] = useState('')
  const [dayToPieceMap, setDayToPieceMap] = useState({}) // day -> pieceIndex (0-23)
  const [isSolved, setIsSolved] = useState(false)
  const [orderedDoors, setOrderedDoors] = useState(doorsData)

  // FLIP Animation Refs
  const prevRects = useRef({})

  useEffect(() => {
    // 1. Klasördeki görselleri otomatik bul (GitHub Pages için güvenli)
    let selectedImage = ''
    try {
      const modules = import.meta.glob('../assets/puzzle-photos/*.{png,jpg,jpeg,svg,webp}', { eager: true })
      const images = Object.values(modules).map(mod => mod.default)

      if (images.length > 0) {
        selectedImage = images[Math.floor(Math.random() * images.length)]
      } else {
        // Yedek (Eğer klasör boşsa)
        selectedImage = 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2000&auto=format&fit=crop'
      }
    } catch (error) {
      // GitHub Pages'te import.meta.glob çalışmazsa yedek görsel kullan
      console.warn('Puzzle görselleri yüklenemedi, yedek görsel kullanılıyor:', error)
      selectedImage = 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2000&auto=format&fit=crop'
    }
    setPuzzleImage(selectedImage)

    // localStorage'dan açılan günleri yükle - ŞU AN KAPALI
    // const saved = localStorage.getItem('advent-opened-days')
    // if (saved) {
    //   setOpenedDays(JSON.parse(saved))
    // }

    // Puzzle parçalarını rastgele dağıt
    // 0-23 arası sayıları karıştır
    const pieces = Array.from({ length: 24 }, (_, i) => i)
    for (let i = pieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }

    // Her güne bir parça ata
    const map = {}
    doorsData.forEach((door, index) => {
      map[door.day] = pieces[index]
    })
    setDayToPieceMap(map)
  }, [])

  // FLIP Animation Logic
  useLayoutEffect(() => {
    if (Object.keys(prevRects.current).length === 0) return

    // Last positions
    const currentRects = {}
    orderedDoors.forEach(door => {
      const el = document.getElementById(`day-card-${door.day}`)
      if (el) currentRects[door.day] = el.getBoundingClientRect()
    })

    // Invert & Play
    orderedDoors.forEach(door => {
      const el = document.getElementById(`day-card-${door.day}`)
      const prev = prevRects.current[door.day]
      const current = currentRects[door.day]

      if (el && prev && current) {
        const dx = prev.left - current.left
        const dy = prev.top - current.top

        // Invert: Elementi eski pozisyonuna taşı
        el.style.transform = `translate(${dx}px, ${dy}px)`
        el.style.transition = 'none'

        // Play: Transform'u kaldırarak animasyonu başlat
        requestAnimationFrame(() => {
          el.style.transform = ''
          el.style.transition = 'transform 0.8s cubic-bezier(0.2, 0, 0.2, 1)' // Yavaş ve akıcı bir geçiş
        })
      }
    })

    // Reset refs (animasyon bittikten sonra temizlemek daha iyi ama şimdilik burada)
    // prevRects.current = {} 

  }, [orderedDoors, isSolved])

  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth()

  // Sadece Aralık ayında (ay 11, 0-indexed) ve bugüne kadar olan günleri aç
  const isUnlocked = (day) => {
    // Test için tüm günleri aç (production'da kaldırılacak)
    return true

    // Production kodu (Aralık ayında aktif olacak):
    // if (currentMonth !== 11) return false // Aralık ayı 11'dir
    // return day <= currentDay
  }

  const isOpened = (day) => {
    return openedDays.includes(day)
  }

  const handleDayClick = (day) => {
    if (!isUnlocked(day) || isOpened(day)) return

    const reward = doorsData.find((d) => d.day === day)
    if (!reward) return

    // Açıldı olarak işaretle
    const newOpenedDays = [...openedDays, day]
    setOpenedDays(newOpenedDays)
    // localStorage.setItem('advent-opened-days', JSON.stringify(newOpenedDays))

    // Konfeti göster
    setShowConfetti(true)

    // Modal göster
    setSelectedReward(reward)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setTimeout(() => {
      setSelectedReward(null)
    }, 300)
  }

  const handleConfettiComplete = () => {
    setShowConfetti(false)
  }

  const handleSolvePuzzle = () => {
    if (isSolved) return

    // 1. Capture current positions (First)
    const rects = {}
    orderedDoors.forEach(door => {
      const el = document.getElementById(`day-card-${door.day}`)
      if (el) rects[door.day] = el.getBoundingClientRect()
    })
    prevRects.current = rects

    // 2. Change state (Last)
    setIsSolved(true)

    // Sort doors by piece index (0 to 23)
    // dayToPieceMap[day] gives the piece index. We want Piece 0 first.
    const sorted = [...doorsData].sort((a, b) => {
      return dayToPieceMap[a.day] - dayToPieceMap[b.day]
    })
    setOrderedDoors(sorted)
  }

  // Tüm günler açıldı mı?
  // const allDaysOpened = doorsData.every(d => isOpened(d.day)) 
  // Test için allDaysUnlocked yeterli mi? Kullanıcı tüm kartları açtıktan sonra birleşsin dedi.
  // "en sonunda tüm kartlar öyle açıldığında" -> all cards opened.
  const allDaysOpened = doorsData.every(d => isOpened(d.day))

  // Hata ayıklama: doorsData'nın yüklenip yüklenmediğini kontrol et
  if (!doorsData || !Array.isArray(doorsData)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl">Hata: Kapı verileri yüklenemedi</p>
          <p className="text-gray-600 mt-2">Detaylar için konsolu kontrol edin</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 relative">
      <Snow />
      <Confetti active={showConfetti} onComplete={handleConfettiComplete} />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className={`text-center mb-12 transition-all duration-500 ${isSolved ? 'opacity-0 h-0 overflow-hidden mb-0' : ''}`}>
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 mb-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 to-red-500 mb-4 drop-shadow-lg">
              💕 DOĞAMM SENİ ÇOK SEVİYORUM 💕
            </h1>
            <p className="text-gray-700 text-lg md:text-xl font-medium">
              TEKRAR TEKRAR AÇ HARİKA İÇERİKLER VAR ._.! ❤️
            </p>
          </div>
        </header>


        <div className={`transition-all duration-1000 ${isSolved
          ? 'p-0 w-full max-w-4xl mx-auto aspect-[6/4] bg-transparent shadow-2xl scale-105'
          : 'bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20 mb-8'
          }`}>
          <div className={`grid transition-all duration-500 ${isSolved
            ? 'grid-cols-6 gap-0 w-full h-full'
            : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6'
            }`}>
            {orderedDoors.map((door) => (
              <DayCard
                key={door.day}
                day={door.day}
                isUnlocked={isUnlocked(door.day)}
                isOpened={isOpened(door.day)}
                onClick={() => handleDayClick(door.day)}
                puzzleUrl={puzzleImage}
                pieceIndex={dayToPieceMap[door.day]}
                isSolved={isSolved}
              />
            ))}
          </div>
        </div>

        {allDaysOpened && !isSolved && (
          <div className="text-center mt-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 inline-block">
              <button
                onClick={handleSolvePuzzle}
                className="px-10 py-4 bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 text-white text-lg md:text-xl font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-float border-2 border-white/30"
              >
                🧩 Yapbozu Çöz, Sürprizi Gör! 🧩
              </button>
            </div>
          </div>
        )}

        {isSolved && (
          <div className="text-center mt-12 animate-fade-in">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 inline-block">
              <button
                onClick={() => navigate('/finale')}
                className="px-10 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white text-lg md:text-xl font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-float border-2 border-white/30"
              >
                💕 Finale'ye Git! 💕
              </button>
            </div>
          </div>
        )}

        <RevealModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          reward={selectedReward}
        />
      </div>
    </div>
  )
}

export default CalendarPage

