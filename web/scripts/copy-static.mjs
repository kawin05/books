// Copy the existing static HTML decks into the Vite build output.
// These don't need a build step — they're standalone HTML files that live
// in the books repo for direct linking from the landing page.
import { copyFileSync, mkdirSync, cpSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
// scripts/ lives at web/scripts/ — go up two levels to reach the books repo root
const root = resolve(__dirname, '..', '..')
const outDir = resolve(root, 'build')

mkdirSync(outDir, { recursive: true })

const staticAssets = [
  { src: 'Deepwork', isDir: true },
  { src: 'ultralearning-deck.html', isDir: false },
  { src: 'ultralearning-deck-thai.html', isDir: false },
]

let copied = 0
for (const asset of staticAssets) {
  const srcPath = resolve(root, asset.src)
  const destPath = resolve(outDir, asset.src)

  if (!existsSync(srcPath)) {
    console.warn(`[copy-static] skip (not found): ${asset.src}`)
    continue
  }

  if (asset.isDir) {
    cpSync(srcPath, destPath, { recursive: true })
  } else {
    mkdirSync(dirname(destPath), { recursive: true })
    copyFileSync(srcPath, destPath)
  }
  copied++
  console.log(`[copy-static] ${asset.src}`)
}

console.log(`[copy-static] done — ${copied} asset(s) copied to build/`)
