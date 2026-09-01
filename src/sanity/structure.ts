import type {StructureResolver} from 'sanity/structure'

import {singletonDocumentIds} from './singletons'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenido')
    .items([
      S.listItem()
        .title('Datos institucionales')
        .child(
          S.list()
            .title('Datos institucionales')
            .items([
              S.listItem()
                .title('Datos de contacto')
                .child(
                  S.document()
                    .schemaType('contactSettings')
                    .documentId(singletonDocumentIds.contactSettings)
                    .title('Datos de contacto'),
                ),
              S.listItem()
                .title('Configuración de la Directiva')
                .child(
                  S.document()
                    .schemaType('boardSettings')
                    .documentId(singletonDocumentIds.boardSettings)
                    .title('Configuración de la Directiva'),
                ),
              S.listItem()
                .title('Directiva')
                .child(
                  S.documentTypeList('boardMember')
                    .title('Directiva')
                    .defaultOrdering([
                      {field: 'active', direction: 'desc'},
                      {field: 'order', direction: 'asc'},
                      {field: 'name', direction: 'asc'},
                    ]),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title('Recursos')
        .child(
          S.list()
            .title('Recursos')
            .items([
              S.documentTypeListItem('article').title('Artículos'),
              S.documentTypeListItem('material').title('Materiales'),
              S.documentTypeListItem('video').title('Videos'),
              S.documentTypeListItem('topic').title('Temáticas'),
            ]),
        ),
    ])
