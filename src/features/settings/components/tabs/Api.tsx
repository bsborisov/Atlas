import { Button } from "@/components/ui/Button";
import { ApiKeysDto } from "../../types/settings.dto";
import { Heading } from "@/components/ui/Heading";
import { Copy, Plus, Trash2 } from "lucide-react";
import { Text } from "@/components/ui/Text";
import { cn } from "@/lib/utils";

const ApiTab = ({ apiKeys }: { apiKeys: ApiKeysDto[] }) => {
  return (
    <div>
      <Heading
        size={4}
        className="mb-1 text-[17px] text-atlas-foreground tracking-[-0.02em]"
      >
        API & Webhooks
      </Heading>
      <p className="text-[13px] text-main-text mb-7">Manage API keys and incoming webhook endpoints</p>

      <div className="flex mb-3.5 items-center justify-between">
        <div className="text-sm font-semibold text-atlas-foreground">API Keys</div>
        <Button variant="primary" size="sm" icon={<Plus size={12} />}>Create key</Button>
      </div>

      <div className="mb-7 rounded-[10px] border border-atlas-main-border bg-atlas-background-light">
        <div className="apikeys-table-grid gap-3 py-2.5 px-4 border-b border-atlas-main-border bg-atlas-background-blue">
          {["Key name", "Token", "Scopes", "Last used", ""].map(h => (
            <Text key={h} className="font-jet-mono tracking-[0.06em]">{h}</Text>
          ))}
        </div>
        {apiKeys.map((k) => (
          <div
            key={k.name}
            className="apikeys-table-grid gap-3 py-3 px-4 divide-x divide-atlas-main-border items-center"
          >
            <div>
              <div className="mb-0.5 text-[13px] font-medium text-atlas-foreground">{k.name}</div>
              <div className="text-[11px] text-main-text">Created {k.created}</div>
            </div>
            <div className="flex gap-1.5 items-center">
              <Text className="text-[11px] text-main-text-active font-jet-mono">{k.prefix}{k.suffix}</Text>
              <button className="p-0 bg-none border-none text-main-text cursor-pointer">
                <Copy size={11} />
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              {k.scopes.map(s => (
                <Text
                  key={s}
                  className={cn(
                    "py-px px-1.25 text-[9px] font-jet-mono rounded-[3px]",
                    "border border-atlas-main-border bg-atlas-background-blue",
                  )}
                >
                  {s}
                </Text>
              ))}
            </div>
            <Text className="text-[11px] font-jet-mono">{k.lastUsed}</Text>
            <Button variant="ghost" size="sm" icon={<Trash2 size={11} />} />
          </div>
        ))}
      </div>

      <div className="mb-3.5 text-sm font-semibold text-atlas-foreground">Webhook endpoints</div>
      <div className="p-5 rounded-[10px] border border-atlas-main-border bg-atlas-background-light">
        <p className="mb-4 text-[13px] text-main-text-active">
          Atlas can send POST events to your endpoint when runs complete, fail, or retry.
        </p>
        <div className="flex gap-2 mb-3">
          <input
            placeholder="https://your-service.com/atlas-webhook"
            className={cn(
              "flex-1 h-9 px-3 text-[13px] font-jet-mono text-atlas-foreground",
              "border border-atlas-main-border rounded-[7px] bg-atlas-background-blue"
            )}
          />
          <Button variant="secondary" size="sm">Add endpoint</Button>
        </div>
        <div className="text-[11px] text-main-text font-jet-mono">
          Sign payloads with <span className="text-app-purple">HMAC-SHA256</span> — secret shown once on creation.
        </div>
      </div>
    </div>
  )
}

export default ApiTab;