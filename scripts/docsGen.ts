import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import * as process from 'node:process'

interface HookDirectory {
  name: string
  path: string
  hasIndexFile: boolean
  hasDemoFile: boolean
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath)
    return true
  }
  catch {
    return false
  }
}

async function ensureDirectoryExists(dirPath: string): Promise<void> {
  try {
    await fs.mkdir(dirPath, { recursive: true })
  }
  catch (error) {
    console.error(`Failed to create directory ${dirPath}:`, error)
    throw error
  }
}

async function copyFile(src: string, dest: string): Promise<void> {
  try {
    await fs.copyFile(src, dest)
  }
  catch (error) {
    console.error(`Failed to copy ${src} to ${dest}:`, error)
    throw error
  }
}

function clearLine(): void {
  process.stdout.write('\r\x1B[K')
}

function updateProgress(message: string): void {
  clearLine()
  process.stdout.write(message)
}

async function getHookDirectories(hooksPath: string): Promise<HookDirectory[]> {
  const hookDirs: HookDirectory[] = []

  try {
    const entries = await fs.readdir(hooksPath, { withFileTypes: true })

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const hookPath = path.join(hooksPath, entry.name)
        const indexPath = path.join(hookPath, 'index.md')
        const demoPath = path.join(hookPath, 'demo.tsx')

        const hasIndexFile = await fileExists(indexPath)
        const hasDemoFile = await fileExists(demoPath)

        hookDirs.push({
          name: entry.name,
          path: hookPath,
          hasIndexFile,
          hasDemoFile,
        })
      }
    }
  }
  catch (error) {
    console.error(`Failed to read hooks directory ${hooksPath}:`, error)
    throw error
  }

  return hookDirs
}

async function organizeHookDocs(): Promise<void> {
  const sourceHooksPath = './packages/use-reacty/src/hooks'
  const docsOutputPath = './docs/hooks'

  updateProgress('🚀 Starting hook documentation organization...')

  if (!(await fileExists(sourceHooksPath))) {
    clearLine()
    throw new Error(`Source hooks directory not found: ${sourceHooksPath}`)
  }

  updateProgress('📂 Scanning for hook directories...')
  const hookDirectories = await getHookDirectories(sourceHooksPath)

  if (hookDirectories.length === 0) {
    clearLine()
    console.log('❌ No hook directories found')
    return
  }

  clearLine()
  console.log(`📋 Found ${hookDirectories.length} hook directories`)

  await ensureDirectoryExists(docsOutputPath)

  let processedCount = 0
  const totalToProcess = hookDirectories.filter(h => h.hasIndexFile || h.hasDemoFile).length

  for (const hook of hookDirectories) {
    const hookOutputDir = path.join(docsOutputPath, hook.name)

    if (!hook.hasIndexFile && !hook.hasDemoFile) {
      continue
    }

    processedCount++
    updateProgress(`📁 Processing ${hook.name} (${processedCount}/${totalToProcess})...`)

    await ensureDirectoryExists(hookOutputDir)

    if (hook.hasIndexFile) {
      const srcIndexPath = path.join(hook.path, 'index.md')
      const destIndexPath = path.join(hookOutputDir, 'index.md')
      await copyFile(srcIndexPath, destIndexPath)
    }

    if (hook.hasDemoFile) {
      const srcDemoPath = path.join(hook.path, 'demo.tsx')
      const destDemoPath = path.join(hookOutputDir, 'demo.tsx')
      await copyFile(srcDemoPath, destDemoPath)
    }
  }

  clearLine()
  console.log('✅ Hook documentation organization completed!')
  console.log(`📊 Processed ${processedCount} hooks → ${docsOutputPath}`)
}

async function main(): Promise<void> {
  try {
    await organizeHookDocs()
  }
  catch (error) {
    clearLine()
    console.error('❌ Error occurred:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

main()
