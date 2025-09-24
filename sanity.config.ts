import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'
import { languages } from './languages'
import { documentInternationalization } from '@sanity/document-internationalization'
import { assist } from '@sanity/assist'
import { templates } from './templates'
import { customStructure } from './structure/structure'
import { dataset, projectId } from './lib/api'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

export default defineConfig({
  name: 'default',
  title: 'Articles demo',
  projectId,
  dataset,
  plugins: [
    assist({
      translate: {
        field: {
          documentTypes: ['author', 'category', 'article', 'articleCollection'],
          languages: languages,

        },
        document: {
          languageField: 'language',
          documentTypes: ['article', 'articleCollection'],
        },
      },
    }),
    unsplashImageAsset(),
    structureTool({ structure: customStructure }),
    visionTool(),
    documentInternationalization({
      supportedLanguages: languages,
      schemaTypes: ['article', 'articleCollection'],
    }),
    internationalizedArray({
      languages: languages,
      defaultLanguages: languages.filter((language) => language.isDefault).map((language) => language.id),
      fieldTypes: ['string', 'text'],
    }),
  ],


  schema: {
    types: schemaTypes,
    templates: templates,
  },

})
