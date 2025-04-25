import { BrowserExtension, Clipboard, showHUD } from "@raycast/api";

export default async function command() {
  const prTitle = await BrowserExtension.getContent({
    format: "text",
    cssSelector: ".js-issue-title",
  });

  if (!prTitle) {
    await showHUD("Couldn't find GitHub title");
    return;
  }

  const tabs = await BrowserExtension.getTabs();
  const currentTab = tabs.find((tab) => tab.active === true);
  if (!currentTab) {
    await showHUD("Couldn't active tab");
    return;
  }

  const prURL = currentTab.url;
  const prLink = `[${prTitle}](${prURL})`;

  await Clipboard.copy(prLink);
  await showHUD("Copied PR link to clipboard");
}
