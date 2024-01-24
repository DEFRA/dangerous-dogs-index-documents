const { blobServiceClient } = require('../get-blob-client')
const { storageConfig } = require('../../../config')

const definition = {}
let logo
let signature

const getCertificateTemplate = async (exemptionOrder) => {
  if (!(definition[exemptionOrder] && logo && signature)) {
    definition[exemptionOrder] = await getTemplateFile(exemptionOrder)
    logo = await getStaticFile('logo.png')
    signature = await getStaticFile('signature.png')
  }

  return {
    definition: JSON.parse(definition[exemptionOrder]),
    logo,
    signature
  }
}

const getTemplateFile = async (exemptionOrder) => {
  console.log(`getTemplateFile() starting. Container ${storageConfig.certificateTemplateContainer}`)

  const container = blobServiceClient.getContainerClient(storageConfig.certificateTemplateContainer)

  await container.createIfNotExists()

  console.log('getTemplateFile() got container')

  const filename = `${exemptionOrder}.template.json`

  const blobClient = container.getBlockBlobClient(filename)

  console.log('getTemplateFile() got client')

  const exists = await blobClient.exists()

  console.log('getTemplateFile() exists', exists)

  if (!exists) {
    throw new Error(`Template (${filename}) does not exist`)
  }

  const buffer = await blobClient.downloadToBuffer()

  console.log('getTemplateFile() got buffer')

  return buffer.toString()
}

const getStaticFile = async (fileName) => {
  const container = blobServiceClient.getContainerClient(storageConfig.certificateTemplateContainer)

  await container.createIfNotExists()

  const blobClient = container.getBlockBlobClient(fileName)

  const exists = await blobClient.exists()

  if (!exists) {
    throw new Error(`File (${fileName}) does not exist`)
  }

  return blobClient.downloadToBuffer()
}

module.exports = {
  getCertificateTemplate
}
