import Image from 'next/image'

import {Container} from '@/components/ui/container'
import {PeopleIcon} from '@/components/ui/icons'
import {Section} from '@/components/ui/section'
import {urlFor} from '@/sanity/lib/image'
import type {
  ACTIVE_BOARD_MEMBERS_QUERY_RESULT,
  BOARD_SETTINGS_QUERY_RESULT,
} from '@/sanity/sanity.types'

interface AboutBoardProps {
  members: ACTIVE_BOARD_MEMBERS_QUERY_RESULT
  settings: BOARD_SETTINGS_QUERY_RESULT
}

const roleLabels: Record<
  ACTIVE_BOARD_MEMBERS_QUERY_RESULT[number]['role'],
  string
> = {
  presidency: 'Presidencia',
  vicePresidency: 'Vicepresidencia',
  minutesSecretary: 'Secretaría de Actas',
  financeSecretary: 'Secretaría de Hacienda',
  boardMember: 'Vocal',
}

function getInitials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function AboutBoard({members, settings}: AboutBoardProps) {
  if (members.length === 0) return null

  return (
    <Section
      aria-labelledby="about-board-title"
      className="bg-surface pt-6 pb-8 sm:pt-8 sm:pb-8 lg:pt-8 lg:pb-8"
    >
      <Container>
        <div className="rounded-3xl border border-border bg-primary/5 px-6 py-8 sm:px-8 lg:px-10">
          <div className="max-w-3xl">
            <h2
              id="about-board-title"
              className="text-3xl font-bold text-foreground sm:text-4xl"
            >
              Nuestra directiva
            </h2>
            <div
              aria-hidden="true"
              className="mt-4 h-1 w-14 rounded-full bg-secondary"
            />

            {settings?.termLabel ? (
              <p className="mt-3 font-bold text-secondary">
                {settings.termLabel}
              </p>
            ) : null}

            <p className="mt-3 leading-7 text-muted">
              La Directiva de AFAP está conformada por miembros de la
              asociación que, desde distintas experiencias y ámbitos,
              coordinan y representan el trabajo institucional de la
              organización.
            </p>
          </div>

          <ul className="mt-8 grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-y-0">
            {members.map((member, index) => {
              const hasPhoto = Boolean(member.photo?.image.asset)

              return (
                <li
                  key={member._id}
                  className={`flex min-w-0 flex-col items-center px-4 text-center ${
                    index > 0 ? 'lg:border-l lg:border-border' : ''
                  }`}
                >
                  <div className="flex min-h-12 items-start justify-center gap-2 text-foreground">
                    <span
                      aria-hidden="true"
                      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary"
                    >
                      <PeopleIcon className="size-5" />
                    </span>
                    <h3 className="pt-1.5 text-sm font-bold leading-5">
                      {roleLabels[member.role]}
                    </h3>
                  </div>

                  <div className="relative mt-4 flex size-24 items-center justify-center overflow-hidden rounded-full border-4 border-surface bg-secondary/15 text-xl font-bold text-secondary shadow-sm">
                    {hasPhoto && member.photo ? (
                      <Image
                        src={urlFor(member.photo.image)
                          .width(240)
                          .height(240)
                          .fit('crop')
                          .url()}
                        alt={member.photo.alt}
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    ) : (
                      <span aria-label={`Sin fotografía: ${member.name}`}>
                        {getInitials(member.name)}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 font-semibold leading-6 text-foreground">
                    {member.name}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
