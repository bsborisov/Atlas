import { Connections } from "@/features/connections";
import { getConnections } from "@/features/connections/services/connections.service";

export default async function ConnectionsPage() {

  const connections = await getConnections();

  return (
    <Connections connections={connections} />
  );
}