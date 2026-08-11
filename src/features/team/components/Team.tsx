"use client";

import { useState } from "react";
import { MembersDto } from "../types/team.dto"
import TeamHeader from "./TeamHeader";
import Divider from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { Plus, Search, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Text } from "@/components/ui/Text";
import CloseButton from "@/components/ui/CloseButton";
import { Select } from "@/components/ui/Select";

const ROLE_PERMS: Record<string, string[]> = {
  Owner: ["All permissions", "Billing management", "Delete workspace", "Manage members"],
  Admin: ["Manage workflows", "Manage connections", "View audit log", "Invite members"],
  Member: ["Create workflows", "View executions", "Manage own workflows"],
  Viewer: ["View workflows", "View executions"],
};

const AVATAR_COLORS = ["bg-app-purple/25", "bg-app-cyan/20", "bg-app-light-green/20", "bg-app-light-yellow/20", "bg-app-light-green/20"];

export const Team = ({ members }: { members: MembersDto[] }) => {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");
  const [selectedMember, setSelectedMember] = useState<MembersDto | null>(null);
  const [search, setSearch] = useState("");

  const filtered = members.filter(m => !search || m.name.toLowerCase().includes(search.toLowerCase()) || m.email.includes(search));

  const roleColor: Record<string, string> = {
    Owner: "text-app-purple",
    Admin: "text-app-cyan",
    Member: "text-app-light-green",
    Viewer: "text-main-text"
  }

  return (
    <div className="flex flex-1 flex-col h-full overflow-hidden">
      {/* Header */}
      <TeamHeader members={members} setInviteOpen={setInviteOpen} />

      <div className="flex flex-1 overflow-hidden">
        {/* Member list */}
        <div className="flex-1 py-5 px-8 overflow-y-auto">
          {/* Search + filter bar */}
          <div className="flex mb-4 gap-2">
            <div className="relative flex-1 max-w-75">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-main-text " />
              <input
                value={search} onChange={(e) => setSearch(e.target.value)}
                placeholder="Search members…"
                className={cn(
                  `w-full h-9 pr-2.5 pl-7.5 text-xs text-atlas-foreground outline-none`,
                  `border border-atlas-main-border rounded-lg`,
                  `bg-atlas-background-light box-border`
                )}
              />
            </div>
            <div className="ml-auto text-[11px] self-center text-main-text font-jet-mono">
              {filtered.length} members
            </div>
          </div>

          {/* Active members */}
          <div className="mb-6">
            <div className="mb-2.5 text-[11px] text-main-text font-jet-mono tracking-[0.06em]">
              ACTIVE MEMBERS
            </div>
            <div className="rounded-[10px] border border-atlas-main-border divide-y divide-atlas-main-border bg-atlas-background-light overflow-hidden">
              {/* Header */}
              <div className="grid team-table-grid py-2.5 px-4 gap-3 bg-atlas-background-blue">
                {["Member", "Email", "Role", "Last active", ""].map(h => (
                  <Text key={h} className="font-jet-mono tracking-[0.06em]">{h}</Text>
                ))}
              </div>
              {filtered.filter(m => m.status === "active").map((m, i) => (
                <div
                  key={m.email}
                  onClick={() => setSelectedMember(selectedMember?.email === m.email ? null : m)}
                  className={cn(
                    "grid team-table-grid py-2.5 px-4 gap-3 cursor-pointer items-center transition-colors duration-100",
                    selectedMember?.email === m.email ? "bg-app-purple/4" : "bg-transparent"
                  )}
                >
                  {/* Name + avatar */}
                  <div className="flex min-w-0 gap-2.5 items-center">
                    <div
                      className={cn(
                        "flex shrink-0 size-7.5 rounded-lg text-[11px]",
                        AVATAR_COLORS[i % AVATAR_COLORS.length],
                        "font-bold text-atlas-foreground items-center justify-center"
                      )}
                    >
                      {m.avatar}
                    </div>
                    <Text className="text-[13px] font-semibold text-atlas-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                      {m.name}
                    </Text>
                  </div>
                  <Text className="text-xs overflow-hidden text-ellipsis whitespace-nowrap">{m.email}</Text>
                  <Text
                    className={cn(
                      "text-[11px] font-semibold",
                      roleColor[m.role]
                    )}
                  >
                    {m.role}
                  </Text>
                  <Text className="text-[11px] font-jet-mono">{m.lastActive}</Text>
                  <button
                    onClick={e => { e.stopPropagation(); }}
                    className={cn(
                      "py-0.75 px-2 rounded-[5px] text-[11px] text-main-text",
                      "bg-none border border-atlas-main-border cursor-pointer"
                    )}
                  >
                    {"···"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Pending invites */}
          {filtered.filter(m => m.status === "pending").length > 0 && (
            <div>
              <div className="mb-2.5 text-[11px] text-main-text font-jet-mono tracking-[0.06em]">
                PENDING INVITES
              </div>
              <div className="rounded-[10px] border border-atlas-main-border divide-y divide-atlas-main-border bg-atlas-background-light overflow-hidden">
                {filtered.filter(m => m.status === "pending").map((m) => (
                  <div key={m.email} className="grid team-table-grid py-2.75 px-4 gap-3 items-center">
                    <div className="flex gap-2.5 items-center">
                      <div
                        className={cn(
                          "flex shrink-0 size-7.5 rounded-lg text-[11px]",
                          "font-bold border border-dashed border-atlas-main-border",
                          "text-atlas-foreground items-center justify-center"
                        )}
                      >
                        {m.avatar}
                      </div>
                      <div>
                        <div className="text-[13px] text-main-text-active">{m.name}</div>
                        <div className="text-[11px] text-main-text font-jet-mono">Invite pending</div>
                      </div>
                    </div>
                    <Text className="text-xs">{m.email}</Text>
                    <Text className="text-[11px]">{m.role}</Text>
                    <Text
                      className={cn(
                        "inline-block py-0.5 px-1.5 text-[11px] rounded-sm font-jet-mono text-app-light-yellow"
                      )}
                    >
                      Pending
                    </Text>
                    <button
                      className={cn(
                        "py-0.75 px-2 text-[11px] rounded-[5px] cursor-pointer",
                        "text-app-light-red bg-none border border-app-light-red/30"
                      )}
                    >
                      Revoke
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Member detail panel */}
        {selectedMember && (
          <div className="p-5 shrink-0 w-75 border-l border-atlas-main-border bg-atlas-background-light overflow-y-auto">
            <div className="flex justify-end mb-4">
              <CloseButton
                onClick={() => setSelectedMember(null)}
                className="size-6 text-sm rounded-[5px]"
              />
            </div>
            <div className="flex flex-col gap-3 mb-6 items-center">
              <div
                className={cn(
                  "flex size-14 rounded-[14px] text-lg font-bold text-atlas-foreground",
                  AVATAR_COLORS[members.indexOf(selectedMember) % AVATAR_COLORS.length],
                  "items-center justify-center"
                )}
              >
                {selectedMember.avatar}
              </div>
              <div className="text-center">
                <div className="mb-0.75 text-[15px] font-bold text-atlas-foreground">
                  {selectedMember.name}
                </div>
                <div className="text-xs text-main-text">
                  {selectedMember.email}
                </div>
              </div>
              <div
                className={cn(
                  "py-0.75 px-2.5 text-[11px] font-semibold rounded-[5px]",
                  "border border-app-purple/20 bg-app-purple/10",
                  roleColor[selectedMember.role]
                )}
              >
                {selectedMember.role}
              </div>
            </div>

            <Divider />

            <div className="mb-5">
              <div className="mb-3 text-[11px] text-main-text tracking-wider">
                DETAILS
              </div>
              {[
                ["Joined", selectedMember.joined],
                ["Last active", selectedMember.lastActive],
                ["Status", selectedMember.status]
              ].map(([k, v]) => (
                <div key={k} className="flex py-1.5 border-b border-atlas-main-border justify-between">
                  <Text className="text-xs">{k}</Text>
                  <Text className="text-xs font-medium capitalize text-atlas-foreground">
                    {v}
                  </Text>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <div className="mb-3 text-[11px] text-main-text font-jet-mono tracking-wider">
                PERMISSIONS
              </div>
              <div className="flex flex-col gap-1.5">
                {(ROLE_PERMS[selectedMember.role] ?? []).map(p => (
                  <div key={p} className="flex gap-2 text-xs text-main-text-active items-center">
                    <span className="text-[11px] font-bold text-app-light-green">✓</span>
                    {` ${p}`}
                  </div>
                ))}
              </div>
            </div>

            <Divider />

            <div className="flex flex-col mt-4 gap-2">
              <Select
                defaultValue={selectedMember.role}
                items={[
                  { value: "Owner", label: "Owner" },
                  { value: "Admin", label: "Admin" },
                  { value: "Member", label: "Member" },
                  { value: "Viewer", label: "Running" },
                ]}
                className="w-full text-[13px] rounded-[7px] bg-atlas-background-blue outline-none"
              />
              <Button
                variant="secondary"
                size="sm"
                className="w-full justify-center"
              >
                Save role change
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="w-full justify-center"
                icon={<Trash2 size={12} />}
              >
                Remove member
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Invite modal */}
      {inviteOpen && (
        <div className="fixed flex inset-0 bg-black/60 items-center justify-center z-200">
          <div className="relative w-105 p-7 rounded-[14px] border border-atlas-main-border bg-atlas-background-light">
            <CloseButton
              onClick={() => setInviteOpen(false)}
              className="absolute top-4 right-4 size-6 text-sm rounded-[5px]"
            />
            <h2 className="mb-1 text-base font-bold text-atlas-foreground">Invite a team member</h2>
            <p className="text-[13px] text-main-text mb-5">They will receive an email with a link to join Meridian workspace.</p>
            <div className="flex flex-col gap-3">
              <div>
                <div className="mb-1.5 text-xs text-main-text-active">Email address</div>
                <input
                  value={inviteEmail}
                  onChange={e => setInviteEmail(e.target.value)}
                  placeholder="colleague@company.com"
                  className={cn(
                    "w-full h-9.5 px-3 rounded-lg text-[13px]",
                    "border border-atlas-main-border text-atlas-foreground",
                    "bg-atlas-background-blue outline-none"
                  )} />
              </div>
              <div>
                <div className="mb-1.5 text-xs text-main-text">Role</div>
                <Select
                  value={inviteRole}
                  onChange={e => setInviteRole(e.target.value)}
                  items={[
                    { value: "Admin", label: "Admin" },
                    { value: "Member", label: "Member" },
                    { value: "Viewer", label: "Running" },
                  ]}
                  className="w-full h-9.5 px-3 text-[13px] bg-atlas-background-blue outline-none"
                />
              </div>
              <div className="p-3 rounded-lg bg-atlas-background-blue">
                <div className="mb-1.5 text-[11px] text-main-text">{inviteRole} can:</div>
                {(ROLE_PERMS[inviteRole] ?? []).map(p => (
                  <div key={p} className="flex mb-0.75 gap-1.75 text-xs text-main-text-active">
                    <span className="text-app-light-green">✓</span>
                    {` ${p}`}
                  </div>
                ))}
              </div>
              <div className="flex mt-1 gap-2">
                <Button
                  variant="primary"
                  size="sm"
                  className="flex-1 justify-center"
                  icon={<Plus size={12} />}
                  onClick={() => setInviteOpen(false)}
                >
                  Send invite
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex-1 justify-center"
                  onClick={() => setInviteOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}