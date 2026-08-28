export interface CommunityConfig {
  calendarEmbedUrl: string | null;
  heroImageSrc: string | null;
  joinImageSrc: string | null;
}

export const communityConfig: CommunityConfig = {
  calendarEmbedUrl: null,
  heroImageSrc: "/images/herocommunity.png",
  joinImageSrc: "/images/communityjoin.png",
};
