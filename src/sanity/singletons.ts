export const singletonDocumentIds = {
  boardSettings: 'boardSettings',
  contactSettings: 'contactSettings',
} as const

export const singletonTypes = new Set(Object.keys(singletonDocumentIds))
