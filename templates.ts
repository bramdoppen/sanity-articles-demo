import { Template, TemplateResolver } from 'sanity'

const parentCategoryTemplate: Template = {
  id: 'parentCategoryTemplate',
  title: 'Parent Category Template',
  schemaType: 'category',
  parameters: [
    {
      name: 'parentId',
      type: 'string',
    },
  ],
  value: (params: { parentId: string }) => ({
    parent: {
      _type: 'reference',
      _ref: params.parentId,
    },
  }),
}

const articleLanguageTemplate: Template = {
  id: 'articleLanguageTemplate',
  title: 'Article Language Template',
  schemaType: 'article',
  parameters: [
    {
      name: 'language',
      type: 'string',
    },
  ],
  value: (params: { language: string }) => ({
    language: params.language,
  }),
}

export const templates: TemplateResolver = (prev) => {  
    return [
      ...prev,
      parentCategoryTemplate,
      articleLanguageTemplate,
    ]
  }
  