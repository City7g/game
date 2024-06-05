const removeExtraCharacters = (value: string): string[] => {
  let newList = value
  newList = newList.replaceAll('NaN', ' ')

  newList = newList.replaceAll(/\{\*\*\/\d+\}/g, ' ')
  newList = newList.replaceAll('\n', ' ')
  newList = newList.replaceAll(/\s+/g, ' ')
  newList = newList.trim()

  return newList.split(' ')
}

export { removeExtraCharacters }
