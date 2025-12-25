import { useNavigate } from 'react-router-dom'
import Snow from '../components/Snow'

const FinalePage = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
      <Snow />
      <div className="max-w-4xl mx-auto text-center animate-fade-in relative z-10">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-500 to-red-500 mb-6 animate-float">
              💕 TEBRİKLER! 💕
            </h1>
            <p className="text-2xl md:text-3xl text-gray-700 mb-4">
              Yılbaşı Aşk Takvimi'ni başarıyla tamamladın!
            </p>
          </div>

          <div className="mb-8">
            <div className="bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 rounded-2xl p-6 md:p-8 mb-6">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                 Bu yılı beraber sağlıkla ve huzurla tamamladık!<br />
              Seninle geçirdiğim her an benim için çok değerli.<br />
              Yeni yılda da birlikte daha nice güzel anılar biriktireceğimize
              inanıyorum.<br />
              Seni çok seviyorum! ❤️
            </p>
            </div>
          </div>

          <div className="mb-8">
            <div className="bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl p-6 md:p-8 inline-block">
              <div className="text-8xl mb-4 animate-float">💕</div>
              <p className="text-gray-600 text-sm md:text-base">
                Seni çok seviyorum! ❤️
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              ← Takvime Dön
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('advent-opened-days')
                window.location.reload()
              }}
              className="px-8 py-4 bg-gray-200 text-gray-800 text-lg font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              🔄 Sıfırla
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FinalePage

