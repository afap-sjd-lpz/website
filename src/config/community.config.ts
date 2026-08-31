export interface CommunityConfig {
  calendarEmbedUrl: string | null;
  heroImageSrc: string | null;
  joinImageSrc: string | null;
}

export const communityConfig: CommunityConfig = {
  calendarEmbedUrl:
    "https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FLa_Paz&showPrint=0&mode=AGENDA&src=YWZhcGJvbGl2aWFAZ21haWwuY29t&color=%23039be5",
  heroImageSrc: "/images/herocommunity.png",
  joinImageSrc: "/images/communityjoin.png",
};
