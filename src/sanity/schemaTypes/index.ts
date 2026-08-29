import { type SchemaTypeDefinition } from "sanity";
import { topicType } from "./topic";
import { articleType } from "./article";
import { blockContentType } from "./blockContent";
import { accessibleImageType } from "./accessibleImage";
import { seoType } from "./seo";
import { materialType } from "./material";
import { videoType } from "./video";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    accessibleImageType,
    blockContentType,
    seoType,
    topicType,
    articleType,
    materialType,
    videoType,
  ],
};
