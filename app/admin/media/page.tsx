import MediaLibraryScreen from "@blawness/admin-kit/screens/media";
import { handleDeleteMedia } from "@blawness/admin-kit/screens/media/lib";

type Props = {
  searchParams: Promise<{ error?: string; page?: string; q?: string; album?: string }>;
};

// Counts how many places reference a media URL before allowing deletion.
// Returning 0 always permits deletion; extend this to scan consumer tables
// (e.g. members.photo_url, article cover images) to guard in-use assets.
async function deleteMedia(formData: FormData) {
  "use server";
  await handleDeleteMedia(formData, async () => 0);
}

export default function Page({ searchParams }: Props) {
  return <MediaLibraryScreen searchParams={searchParams} deleteAction={deleteMedia} />;
}
