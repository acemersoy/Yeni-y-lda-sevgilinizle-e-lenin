import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import DayCard from '../components/DayCard'
import RevealModal from '../components/RevealModal'
import Confetti from '../components/Confetti'
import Snow from '../components/Snow'
import { doorsData } from '../data/doors.js'

const CalendarPage = () => {
  const navigate = useNavigate()
  const [openedDays, setOpenedDays] = useState([])
  const [selectedReward, setSelectedReward] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // localStorage'dan açılan günleri yükle - ŞU AN KAPALI (tüm günler kapalı başlıyor)
    // const saved = localStorage.getItem('advent-opened-days')
    // if (saved) {
    //   setOpenedDays(JSON.parse(saved))
    // }
  }, [])

  const today = new Date()
  const currentDay = today.getDate()
  const currentMonth = today.getMonth()

  // Sadece Aralık ayında (ay 11, 0-indexed) ve bugüne kadar olan günleri aç
  // TEST MODU: Test için tüm günleri açmak için aşağıdaki satırı kullan
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
    // localStorage kaydı şu an kapalı (tüm günler kapalı başlıyor)
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

  const allDaysUnlocked = currentDay >= 24 && currentMonth === 11

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
        <header className="text-center mb-12">
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 border border-white/20 mb-6">
            <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-500 to-emerald-600 mb-4 drop-shadow-lg">
              🎄 Advent Takvimi 2025 🎄
            </h1>
            <p className="text-gray-700 text-lg md:text-xl font-medium">
              Her gün bir sürpriz seni bekliyor!
            </p>
          </div>
        </header>

        
        <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl p-6 md:p-8 border border-white/20 mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {doorsData.map((door) => (
            <DayCard
              key={door.day}
              day={door.day}
              isUnlocked={isUnlocked(door.day)}
              isOpened={isOpened(door.day)}
              onClick={() => handleDayClick(door.day)}
            />
          ))}
          </div>
        </div>

        {allDaysUnlocked && (
          <div className="text-center mt-8">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/20 inline-block">
              <button
                onClick={() => navigate('/finale')}
                className="px-10 py-4 bg-gradient-to-r from-rose-500 via-red-500 to-emerald-500 text-white text-lg md:text-xl font-bold rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-float border-2 border-white/30"
              >
                🎉 Finale'ye Git! 🎉
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

