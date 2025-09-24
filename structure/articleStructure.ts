import { StructureBuilder } from 'sanity/structure'

import { CiFileOn, CiFilter, CiGlobe, CiStar } from 'react-icons/ci'
import { languages } from '../languages'

export const articleStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('articleStructure')
    .title('Articles')
    .icon(CiFileOn)
    .child(
      S.list().title('Articles').items([
        S.listItem()
          .title('Articles')
          .icon(CiFileOn)
          .child(
            S.list().title('Articles').items([
              S.listItem()
          .title('All languages')
          .icon(CiGlobe)
          .child(
            S.documentTypeList('article')
              .schemaType('article')
              .title('All articles')
              .id(`all-articles`)
              .filter('_type == "article"')

          ),
              S.divider(),
              ...languages.map((language) =>
                S.listItem()
                  .title(language.title)
                  .icon(() => language.icon)
                  .child(
                    S.documentList()
                      .schemaType('article')
                      .title(language.icon + ' ' + language.title)
                      .filter(`_type == "article" && language == $language`)
                      .id(`${language.id}-articles`)
                      .params({ language: language.id })
                      .initialValueTemplates([
                        S.initialValueTemplateItem('articleLanguageTemplate', {
                          language: language.id,
                        }),
                      ])
                      .canHandleIntent((intentName, params) => {
                        if (intentName === 'edit') {
                          return false
                        }

                        if (!params.template) {
                          return true
                        }

                        const languageValue = params?.template?.split(`-`).pop()
                        return languageValue === language.id
                      }),
                  )
              )
            ])
          ),

        S.divider(),
        S.listItem()
          .title('Featured Articles')
          .icon(CiStar)
          .child(
            S.documentList()
              .schemaType('article')
              .title('Featured Articles')
              .id(`featured-articles`)
              .filter('_type == "article" && featured == true')
              .canHandleIntent(() => false)
          ),
        S.listItem()
          .title('Articles by Category')
          .icon(CiFilter)
          .child(
            S.documentTypeList('category')
              .schemaType('category')
              .title('Categories')
              .child((categoryId) =>
                S.documentList()
                  .title('Articles')
                  .filter('_type == "article" && $categoryId in categories[]._ref')
                  .params({ categoryId })
              )
          ),
        S.listItem()
          .title('Articles by Author')
          .icon(CiFilter)
          .child(
            S.documentTypeList('author')
              .schemaType('author')
              .title('Authors')
              .child((authorId) =>
                S.documentList()
                  .title('Articles')
                  .filter('_type == "article" && author._ref == $authorId')
                  .params({ authorId })
              )
          ),

      ]))
