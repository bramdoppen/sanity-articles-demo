import { StructureBuilder, StructureResolverContext } from "sanity/structure"
import { categoryStructure } from "./categoryStructure"
import { articleStructure } from "./articleStructure"
import { CiBookmarkPlus, CiUser } from "react-icons/ci"

export const customStructure = async (S: StructureBuilder, context: StructureResolverContext) => {
    return S.list()
      .title('Content')
      .items([
        articleStructure(S),
        S.divider(),
        categoryStructure(S),
        S.documentTypeListItem('category').icon(CiBookmarkPlus).title('All categories'),
        S.documentTypeListItem('author').icon(CiUser).title('Authors'),
      ])
  }
  