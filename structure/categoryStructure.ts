import { StructureBuilder } from 'sanity/structure'
import { apiVersion } from '../lib/api'
import { CiBookmarkPlus } from 'react-icons/ci'

export const categoryStructure = (S: StructureBuilder) =>
  S.listItem()
    .id('categoryStructure')
    .title('Categories (parent-child)')
    .icon(CiBookmarkPlus)
    .child(
      S.documentTypeList('category')
        .title('Parents')
        .id('categoryStructure-parents')
        .filter('_type == "category" && !defined(parent._ref)')
        .apiVersion(apiVersion)
        .canHandleIntent((intentName, params) => intentName === 'edit' && params.type === 'category')
        .child((parentId) =>
          S.documentTypeList('category')
            .id(`categoryStructure-children-${parentId}`)
            .title('Children')
            .filter('_type == "category" && parent._ref == $parentId')
            .apiVersion(apiVersion)
            .params({ parentId })
            .initialValueTemplates([
              S.initialValueTemplateItem('parentCategoryTemplate', {
                parentId,
              }),
            ]),
        ),
    )
