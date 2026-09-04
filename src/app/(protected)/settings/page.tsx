import { Settings } from "@/features/settings";
import { getActionsHistory, getApiKeys, getPlans, getUsageInfo } from "@/features/settings/services/settings.service";

export default async function SettingsPage() {

  const plans = await getPlans();
  const apiKeys = await getApiKeys();
  const actionsHistory = await getActionsHistory();
  const usageInfo = await getUsageInfo();

  return (
    <Settings plans={plans} apiKeys={apiKeys} actionsHistory={actionsHistory} usageInfo={usageInfo} />
  );
}