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
    console.log(`✓ Copied ${src} → ${dest}`)
  }
  catch (error) {
    console.error(`Failed to copy ${src} to ${dest}:`, error)
    throw error
  }
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

  console.log('🚀 Starting hook documentation organization...\n')

  // Check if source directory exists
  if (!(await fileExists(sourceHooksPath))) {
    throw new Error(`Source hooks directory not found: ${sourceHooksPath}`)
  }

  // Get all hook directories
  console.log(`📂 Scanning ${sourceHooksPath} for hook directories...`)
  const hookDirectories = await getHookDirectories(sourceHooksPath)

  if (hookDirectories.length === 0) {
    console.log('❌ No hook directories found')
    return
  }

  console.log(`📋 Found ${hookDirectories.length} hook directories:\n`)

  // Display summary of what was found
  hookDirectories.forEach((hook) => {
    const files = []
    if (hook.hasIndexFile)
      files.push('index.md')
    if (hook.hasDemoFile)
      files.push('demo.tsx')

    console.log(`  • ${hook.name} ${files.length > 0 ? `(${files.join(', ')})` : '(no index/demo files)'}`)
  })

  console.log('\n📁 Creating documentation structure...\n')

  // Ensure main docs/hooks directory exists
  await ensureDirectoryExists(docsOutputPath)

  // Process each hook directory
  for (const hook of hookDirectories) {
    const hookOutputDir = path.join(docsOutputPath, hook.name)

    // Skip if no files to copy
    if (!hook.hasIndexFile && !hook.hasDemoFile) {
      console.log(`⚠️  Skipping ${hook.name} - no index.md or demo.tsx found`)
      continue
    }

    // Create hook-specific directory
    await ensureDirectoryExists(hookOutputDir)
    console.log(`📁 Created directory: ${hookOutputDir}`)

    // Copy index.md if it exists
    if (hook.hasIndexFile) {
      const srcIndexPath = path.join(hook.path, 'index.md')
      const destIndexPath = path.join(hookOutputDir, 'index.md')
      await copyFile(srcIndexPath, destIndexPath)
    }

    // Copy demo.tsx if it exists
    if (hook.hasDemoFile) {
      const srcDemoPath = path.join(hook.path, 'demo.tsx')
      const destDemoPath = path.join(hookOutputDir, 'demo.tsx')
      await copyFile(srcDemoPath, destDemoPath)
    }

    console.log('') // Empty line for readability
  }

  console.log('✅ Hook documentation organization completed!\n')

  // Summary
  const processedHooks = hookDirectories.filter(h => h.hasIndexFile || h.hasDemoFile)
  console.log(`📊 Summary:`)
  console.log(`   • Total hooks found: ${hookDirectories.length}`)
  console.log(`   • Hooks processed: ${processedHooks.length}`)
  console.log(`   • Output directory: ${docsOutputPath}`)
}

// Main execution
async function main(): Promise<void> {
  try {
    await organizeHookDocs()
  }
  catch (error) {
    console.error('\n❌ Error occurred:', error instanceof Error ? error.message : error)
    process.exit(1)
  }
}

// Run the script
main()
