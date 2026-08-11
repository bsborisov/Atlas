import { MembersDto } from "../types/team.dto";

export async function getTeamMembers(): Promise<MembersDto[]> {

  await new Promise((resolve) => setTimeout(resolve, 70));

  return [
    { name: "Layla Moreno", email: "layla@meridian.io", role: "Owner", avatar: "LM", status: "active", joined: "Jan 2024", lastActive: "now" },
    { name: "Ravi Krishnamurthy", email: "ravi@meridian.io", role: "Admin", avatar: "RK", status: "active", joined: "Feb 2024", lastActive: "3m ago" },
    { name: "Chen Wei", email: "cwei@meridian.io", role: "Member", avatar: "CW", status: "active", joined: "Mar 2024", lastActive: "1h ago" },
    { name: "Nour Al-Hassan", email: "nour@meridian.io", role: "Admin", avatar: "NA", status: "active", joined: "Apr 2024", lastActive: "2h ago" },
    { name: "Priya Desai", email: "priya@meridian.io", role: "Member", avatar: "PD", status: "active", joined: "May 2024", lastActive: "yesterday" },
    { name: "James Okafor", email: "james@meridian.io", role: "Member", avatar: "JO", status: "active", joined: "Jun 2024", lastActive: "2d ago" },
    { name: "Sofia Andersen", email: "sofia@meridian.io", role: "Viewer", avatar: "SA", status: "pending", joined: "invited", lastActive: "—" },
    { name: "Marcus Bell", email: "marcus@meridian.io", role: "Member", avatar: "MB", status: "pending", joined: "invited", lastActive: "—" },
  ]

}