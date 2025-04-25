import { ActionPanel, Action, List, BrowserExtension, Clipboard, PopToRootType, showHUD } from "@raycast/api";
import { usePromise } from "@raycast/utils";

const githubPrUrlRegex = /^https:\/\/github\.com\/[\w\-]+\/[\w\-]+\/pull\/\d+$/;

const hudOptions = {
  clearRootSearch: true,
  popToRootType: PopToRootType.Immediate,
};

export default function Command() {
  const { isLoading, data: tabData } = usePromise(async () => {
    const tabs = await BrowserExtension.getTabs();
    const githubTabs = tabs.filter((tab) => githubPrUrlRegex.test(tab.url));

    if (githubTabs.length == 0) {
      await showHUD("No GitHub tabs found", hudOptions);
    }

    if (githubTabs.length == 1) {
      await Clipboard.copy(githubTabs[0].url);
      await showHUD(`Copied link to ${githubTabs[0].title} to clipboard`, hudOptions);
    }

    return githubTabs.map((tab) => {
      return {
        id: tab.url,
        title: tab.title?.split("·")[0],
      };
    });
  });

  return (
    <List isLoading={isLoading}>
      {tabData?.map((item) => (
        <List.Item
          key={item.id}
          title={item.title}
          actions={
            <ActionPanel>
              <Action.CopyToClipboard content={item.id} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
