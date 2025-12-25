import { readFileSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const distPath = join(__dirname, '..', 'dist')
const indexPath = join(distPath, 'index.html')
const notFoundPath = join(distPath, '404.html')

try {
  const indexContent = readFileSync(indexPath, 'utf8')
  writeFileSync(notFoundPath, indexContent)
  console.log('✅ 404.html oluşturuldu!')
} catch (error) {
  console.error('❌ 404.html oluşturulamadı:', error)
  process.exit(1)
}

