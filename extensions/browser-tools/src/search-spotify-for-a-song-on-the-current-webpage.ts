import { BrowserExtension, launchCommand, LaunchType } from "@raycast/api";

export default async function command() {
  const videoTitle = await BrowserExtension.getContent({
    format: "text",
    cssSelector: "title",
  });

  const cleanTitle = videoTitle.split(" - YouTube")[0].replace(/^\(\d+\)\s*/, "");

  await launchCommand({
    extensionName: "spotify-player",
    ownerOrAuthorName: "mattisssa",
    name: "search",
    type: LaunchType.UserInitiated,
    context: { query: cleanTitle },
  });
}
