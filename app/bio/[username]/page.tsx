import { Metadata } from "next";
import { notFound } from "next/navigation";
import { BioService } from "@/backend/modules/bio/bio.service";
import { PublicBioPage } from "@/frontend/modules/bio/PublicBioPage";
import { BRAND_CONFIG } from "@/frontend/shared/config/brand";

interface Props {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  try {
    const bio = await BioService.getPublicBio(username);
    const title = `${bio.displayName} (@${bio.username}) | ${BRAND_CONFIG.name}`;
    const description = bio.bio || `Official links and social profiles of ${bio.displayName}.`;
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: bio.avatarUrl ? [bio.avatarUrl] : ["/og-preview.png"],
      },
    };
  } catch {
    return {
      title: `Creator Bio Not Found | ${BRAND_CONFIG.name}`,
    };
  }
}

export default async function BioRoutePage({ params }: Props) {
  const { username } = await params;
  try {
    const bio = await BioService.getPublicBio(username);
    return <PublicBioPage bio={bio} />;
  } catch {
    notFound();
  }
}
