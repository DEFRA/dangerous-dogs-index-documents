const valueOrNotRecorded = (val) => {
  return val && val !== '' ? val.trim() : 'Not recorded'
}

const getAddressLabel = (rows) => {
  return rows.length === 0 ? 'Address:' : ' '
}

const shuffleAddress = (address) => {
  const rows = []
  if (address.line1) {
    rows.push([getAddressLabel(rows), address.line1])
  }
  if (address.line2) {
    rows.push([getAddressLabel(rows), address.line2])
  }
  if (address.line3) {
    rows.push([getAddressLabel(rows), address.line3])
  }
  if (address.postcode) {
    rows.push([getAddressLabel(rows), address.postcode])
  }

  if (rows.length < 4) {
    const maxRows = 4 - rows.length
    for (let blankRow = 0; blankRow < maxRows; blankRow++) {
      rows.push([' ', ' '])
    }
  }

  return rows
}

const createBullets = (rows) => {
  if (rows?.length > 0) {
    const amendedRows = rows.map(r => {
      if (r?.length > 1) {
        const upperFirst = r.substr(0, 1).toUpperCase()
        const restOfLine = r.substr(1)
        return `- ${upperFirst}${restOfLine}`
      } else {
        return `- ${r}`
      }
    })
    return amendedRows.join('\n')
  } else {
    return ''
  }
}

module.exports = {
  shuffleAddress,
  getAddressLabel,
  valueOrNotRecorded,
  createBullets
}
