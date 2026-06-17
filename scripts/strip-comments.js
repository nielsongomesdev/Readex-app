#!/usr/bin/env node
const fs = require('fs')
const path = require('path')

const root = path.resolve(__dirname, '..')

const exts = ['.ts', '.js', '.vue', '.tsx', '.jsx']

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const ent of entries) {
    const full = path.join(dir, ent.name)
    if (ent.isDirectory()) {
      if (['node_modules', '.git', 'dist', 'build'].includes(ent.name)) continue
      walk(full)
    } else if (ent.isFile()) {
      const ext = path.extname(ent.name)
      if (exts.includes(ext)) {
        try {
          let src = fs.readFileSync(full, 'utf8')
          const original = src
          
          src = src.replace(/\/\*[\s\S]*?\*\//g, '')
          
          src = src.replace(/(^|[^:\\])\/\/.*$/gm, '$1')
          
          if (ext === '.vue') {
            src = src.replace(/<!--([\s\S]*?)-->/g, '')
          }
          
          src = src.replace(/\n{3,}/g, '\n\n')
          if (src !== original) {
            fs.writeFileSync(full, src, 'utf8')
            console.log('Stripped comments:', path.relative(root, full))
          }
        } catch (err) {
          console.error('Error processing', full, err.message)
        }
      }
    }
  }
}

walk(path.join(root))
console.log('Comment removal complete.')
