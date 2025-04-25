import { BrowserExtension, launchCommand, LaunchType, showHUD } from "@raycast/api";

export default async function command() {
  const videoTitle = await BrowserExtension.getContent({
    format: "text",
    cssSelector: "title",
  });

  if (!videoTitle.includes(" - YouTube")) {
    await showHUD("Couldn't find YouTube video title");
    return;
  }

  const cleanTitle = videoTitle.split(" - YouTube")[0].replace(/^\(\d+\)\s*/, "");

  await launchCommand({
    ownerOrAuthorName: "mattisssa",
    extensionName: "spotify-player",
    name: "search",
    type: LaunchType.UserInitiated,
    context: { query: cleanTitle },
  });
}
