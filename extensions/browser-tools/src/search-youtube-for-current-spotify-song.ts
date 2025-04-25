import { open } from "@raycast/api";
import { runAppleScript } from "@raycast/utils";

export default async function main() {
  const searchQuery = await runAppleScript(
    `
tell application "Spotify"
  set currentTrack to name of current track
  set currentArtist to artist of current track
end tell
set query to currentArtist & " " & currentTrack
return query
`,
  );

  await open(`https://www.youtube.com/results?search_query=${searchQuery}`, "com.google.Chrome");
}
