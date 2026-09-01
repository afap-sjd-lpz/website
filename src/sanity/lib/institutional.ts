import 'server-only'

import {cache} from 'react'

import type {CONTACT_SETTINGS_QUERY_RESULT} from '../sanity.types'
import {
  ACTIVE_BOARD_MEMBERS_QUERY,
  BOARD_SETTINGS_QUERY,
  CONTACT_SETTINGS_QUERY,
} from '../queries'
import {client} from './client'

const SANITY_REVALIDATE_SECONDS = 900

export type ContactSettingsData = CONTACT_SETTINGS_QUERY_RESULT

export const getContactSettings = cache(() =>
  client.fetch(CONTACT_SETTINGS_QUERY, {}, {
    next: {revalidate: SANITY_REVALIDATE_SECONDS},
  }),
)

export const getActiveBoardMembers = cache(() =>
  client.fetch(ACTIVE_BOARD_MEMBERS_QUERY, {}, {
    next: {revalidate: SANITY_REVALIDATE_SECONDS},
  }),
)

export const getBoardSettings = cache(() =>
  client.fetch(BOARD_SETTINGS_QUERY, {}, {
    next: {revalidate: SANITY_REVALIDATE_SECONDS},
  }),
)

export function getPrimaryWhatsapp(settings: ContactSettingsData) {
  return (
    settings?.phones?.find(
      (phone) => phone.primaryWhatsapp && phone.whatsapp,
    ) ?? null
  )
}

export function getEmailByPurpose(
  settings: ContactSettingsData,
  purpose: 'contact' | 'privacy',
) {
  return settings?.emails?.find((email) => email.purpose === purpose) ?? null
}

export function createPhoneHref(number: string) {
  const digits = number.replace(/\D/g, '')
  const prefix = number.trim().startsWith('+') ? '+' : ''

  return digits ? `tel:${prefix}${digits}` : undefined
}

export function createWhatsappUrl(number: string) {
  const digits = number.replace(/\D/g, '')

  return digits ? `https://wa.me/${digits}` : undefined
}
