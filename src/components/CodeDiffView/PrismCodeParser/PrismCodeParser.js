const REMOVE_MARK = '-'
const ADDED_MARK = '+'

/* eslint-disable */

export const getLineNumbers = (line) => {
  const clearedLine = line.replace(/<\/?[\w\s="/.':;#-\/\?]+>/gi, '')
  const result = clearedLine.match(/\n?@@\s\-(\d+),\d+\s\+(\d+),\d+\s@@/m)
  if (result && result.length === 3) {
    const oldNumber = parseInt(result[1], 10) - 1
    const newNumber = parseInt(result[2], 10) - 1

    return { oldNumber, newNumber }
  }

  return null
}

export const isBreakLine = (line) => {
  const cleared = line.replace(/<\/?[\w\s="/.':;#-\/\?]+>/gi, '')
  return cleared.match(/^(?:\*{3}|-{3}|\+{3}|diff\s\-{2}git).*$/m)
}

const alignArrays = (newLines, oldLines) => {
  const oldLinesLength = oldLines.length
  const newLinesLength = newLines.length
  const gapLength = Math.abs(oldLinesLength - newLinesLength)
  const cond = oldLinesLength > newLinesLength
  const target = cond ? newLines : oldLines
  const emptyElement = cond ? {
    rightLine: '',
    rightOperation: '',
    rightCssClass: 'code-empty',
    rightLineNumber: '',
  } : {
    leftLine: '',
    leftOperation: '',
    leftCssClass: 'code-empty',
    leftLineNumber: '',
  }
  for (let p = 0; p < gapLength; p += 1) {
    target.push(emptyElement)
  }
}

export const getUnifiedDiff = (html) => {
  const codeLines = html.split('\n')
  const addedOperator = '<span class="token operator" >+</span>'
  const removedOperator = '<span class="token operator" >-</span>'
  const newLines = []
  let line = ''
  let oldLineNumber = -1
  let newLineNumber = -1

  const arrayLength = codeLines.length
  for (let i = 0; i < arrayLength; i += 1) {
    line = codeLines[i]

    // assume that only the fist three lines can be present as diff header
    if (i <= 2 && isBreakLine(line)) {
      continue
    }

    const data = {
      line,
      operation: '',
      isBreak: false,
    }

    if (line.startsWith(addedOperator)) {
      newLineNumber += 1
      data.line = line.slice(addedOperator.length)
      data.cssClass = 'line-added'
      data.operation = ADDED_MARK
      data.newLineNumber = newLineNumber
      data.oldLineNumber = ''
    } else if (line.startsWith(removedOperator)) {
      oldLineNumber += 1
      data.line = line.slice(removedOperator.length)
      data.cssClass = 'line-removed'
      data.operation = REMOVE_MARK
      data.oldLineNumber = oldLineNumber
      data.newLineNumber = ''
    } else if (line.match(/^(@@)/i)) {
      const { oldNumber, newNumber } = getLineNumbers(line)
      newLineNumber = newNumber
      oldLineNumber = oldNumber
      data.newLineNumber = ''
      data.oldLineNumber = ''
      data.cssClass = 'line-break'
      data.isBreak = true
    } else {
      oldLineNumber += 1
      newLineNumber += 1
      data.newLineNumber = newLineNumber
      data.oldLineNumber = oldLineNumber
      data.cssClass = 'line-common'
    }

    newLines.push(data)
  }
  return newLines
}

export const getSideBySideDiff = (html) => {
  const codeLines = html.split('\n')
  const addedOperator = '<span class="token operator" >+</span>'
  const removedOperator = '<span class="token operator" >-</span>'
  const newLines = []
  const oldLines = []
  let line = ''
  let leftLineNumber = -1
  let rightLineNumber = -1

  const arrayLength = codeLines.length
  for (let i = 0; i < arrayLength; i += 1) {
    line = codeLines[i]

    // assume that only the fist three lines can be present as diff header
    if (i <= 2 && isBreakLine(line)) {
      continue
    }

    if (line.startsWith(addedOperator)) {
      line = line.slice(addedOperator.length)
      rightLineNumber += 1
      newLines.push({
        rightLine: line,
        rightOperation: ADDED_MARK,
        rightCssClass: 'line-added',
        rightLineNumber,
        isBreak: false,
      })
    } else if (line.startsWith(removedOperator)) {
      line = line.slice(removedOperator.length)
      leftLineNumber += 1
      oldLines.push({
        leftLine: line,
        leftOperation: REMOVE_MARK,
        leftCssClass: 'line-removed',
        leftLineNumber,
        isBreak: false,
      })
    } else if (line.match(/^(@{2})/i)) {
      const { oldNumber, newNumber } = getLineNumbers(line)
      rightLineNumber = newNumber
      leftLineNumber = oldNumber
      alignArrays(newLines, oldLines)

      oldLines.push({
        leftLine: line,
        leftOperation: '',
        leftCssClass: 'line-break',
        leftLineNumber: '',
        isBreak: true,
      })
      newLines.push({
        rightLine: line,
        rightOperation: '',
        rightCssClass: 'line-break',
        rightLineNumber: '',
      })
    } else {
      leftLineNumber += 1
      rightLineNumber += 1
      alignArrays(newLines, oldLines)

      oldLines.push({
        leftLine: line,
        leftOperation: '',
        leftCssClass: 'line-common',
        isBreak: false,
        leftLineNumber,
      })
      newLines.push({
        rightLine: line,
        rightOperation: '',
        rightCssClass: 'line-common',
        rightLineNumber,
      })
    }
  }

  const result = []
  for (let k = 0; k < oldLines.length; k += 1) {
    result.push({ ...oldLines[k], ...newLines[k] })
  }

  return result
}
