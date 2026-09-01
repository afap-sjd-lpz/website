import { type SchemaTypeDefinition } from "sanity";
import { topicType } from "./topic";
import { articleType } from "./article";
import { blockContentType } from "./blockContent";
import { accessibleImageType } from "./accessibleImage";
import { seoType } from "./seo";
import { materialType } from "./material";
import { videoType } from "./video";
import { boardMemberType } from "./boardMember";
import { boardSettingsType } from "./boardSettings";
import { contactEmailType } from "./contactEmail";
import { contactPhoneType } from "./contactPhone";
import { contactSettingsType } from "./contactSettings";
import { socialLinkType } from "./socialLink";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    accessibleImageType,
    blockContentType,
    contactEmailType,
    contactPhoneType,
    seoType,
    socialLinkType,
    topicType,
    articleType,
    materialType,
    videoType,
    boardMemberType,
    boardSettingsType,
    contactSettingsType,
  ],
};
