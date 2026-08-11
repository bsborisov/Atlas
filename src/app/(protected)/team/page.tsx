import { Team } from "@/features/team";
import { getTeamMembers } from "@/features/team/services/team.service";

export default async function TeamPage() {

  const teamMembers = await getTeamMembers();

  return (
    <Team members={teamMembers} />
  );
}