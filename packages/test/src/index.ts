import { LyricParser } from 'music-lyric-kit'

const LOCAL_HISTORY_KEY_PREFIX = 'last-parse'

const parser = new LyricParser()

let current = 'lrc'

document.addEventListener('DOMContentLoaded', () => {
  const parseBtn = document.getElementById('parse-btn')
  const loadBtn = document.getElementById('load-btn')
  const parserBtns = document.querySelectorAll('.parser-btn')

  const resultContainer = document.getElementById('result-container')
  const resultElement = document.getElementById('result')

  const lrcInputs = document.getElementById('lrc-inputs')
  const ttmlInputs = document.getElementById('ttml-inputs')

  if (!resultContainer || !resultElement) return

  const handleParseLyric = (content: any) => {
    let result

    switch (current) {
      case 'lrc': {
        result = parser.lrc.parse(content)
        break
      }
      case 'ttml': {
        result = parser.ttml.parse(content)
        break
      }
    }

    console.log('Parse Result: ', result)

    resultElement.textContent = JSON.stringify(result, null, 2)
    resultContainer.style.display = 'block'

    resultContainer.scrollIntoView({ behavior: 'smooth' })
  }

  const handleParse = () => {
    let result

    switch (current) {
      case 'lrc': {
        const originalElement = document.getElementById('lrc-original') as HTMLTextAreaElement
        const dynamicElement = document.getElementById('lrc-dynamic') as HTMLTextAreaElement
        const translateElement = document.getElementById('lrc-translate') as HTMLTextAreaElement
        const romanElement = document.getElementById('lrc-roman') as HTMLTextAreaElement

        const original = originalElement.value.trim()
        const dynamic = dynamicElement.value.trim() || ''
        const translate = translateElement.value.trim() || ''
        const roman = romanElement.value.trim() || ''

        if (!original) {
          break
        }

        result = {
          original,
          dynamic,
          translate,
          roman,
        }
        handleParseLyric(result)

        break
      }
      case 'ttml': {
        const element = document.getElementById('ttml-content') as HTMLTextAreaElement
        const content = element.value.trim()

        if (!content) return

        result = {
          content,
        }
        handleParseLyric(result)

        break
      }
    }

    if (!result) {
      return
    }

    const key = `${LOCAL_HISTORY_KEY_PREFIX}-${current}`
    const content = JSON.stringify(result)
    localStorage.setItem(key, content)
  }

  parseBtn?.addEventListener('click', handleParse)

  loadBtn?.addEventListener('click', () => {
    const key = `${LOCAL_HISTORY_KEY_PREFIX}-${current}`

    const content = localStorage.getItem(key)
    if (!content) {
      return
    }

    let result
    try {
      result = JSON.parse(content)
    } catch (e) {
      console.error('Error loading history:', e)
      return
    }

    switch (current) {
      case 'lrc': {
        const originalElement = document.getElementById('lrc-original') as HTMLTextAreaElement
        const dynamicElement = document.getElementById('lrc-dynamic') as HTMLTextAreaElement
        const translateElement = document.getElementById('lrc-translate') as HTMLTextAreaElement
        const romanElement = document.getElementById('lrc-roman') as HTMLTextAreaElement

        originalElement.value = result.original
        dynamicElement.value = result.dynamic
        translateElement.value = result.translate
        romanElement.value = result.roman

        handleParse()
        break
      }
      case 'ttml': {
        const element = document.getElementById('ttml-content') as HTMLTextAreaElement

        element.value = result.content

        handleParse()
        break
      }
    }
  })

  parserBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const parserType = btn.getAttribute('data-parser')

      if (!parserType) return

      parserBtns.forEach((b) => b.classList.remove('active'))
      btn.classList.add('active')

      current = parserType

      switch (current) {
        case 'lrc': {
          lrcInputs!.style.display = 'grid'
          ttmlInputs!.style.display = 'none'
          break
        }
        case 'ttml': {
          lrcInputs!.style.display = 'none'
          ttmlInputs!.style.display = 'flex'
          break
        }
      }
    })
  })
})
